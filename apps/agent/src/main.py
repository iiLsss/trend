"""AI Trend Agent - Entry point for the daily analysis pipeline."""

import logging
import sys
from apscheduler.schedulers.blocking import BlockingScheduler

from src.db import get_db
from src.sources.rss import fetch_rss
from src.sources.github_trending import fetch_github_trending
from src.sources.producthunt import fetch_producthunt
from src.pipeline.denoise import denoise_batch
from src.pipeline.unbundle import unbundle_batch
from src.pipeline.rebundle import (
    analyze_rebundling,
    store_atoms_with_embeddings,
    store_opportunities,
)
from src.pipeline.briefing import generate_briefing, store_briefing

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)


def parse_limit_arg(default: int = 100) -> int:
    """Parse --limit N from CLI args."""
    if "--limit" not in sys.argv:
        return default
    try:
        idx = sys.argv.index("--limit")
        value = int(sys.argv[idx + 1])
        return max(1, value)
    except Exception:
        logger.warning("Invalid --limit value, fallback to %d", default)
        return default


def save_raw_sources(entries: list[dict]) -> list[dict]:
    """Deduplicate and save raw scraped entries to the database. Returns saved entries."""
    db = get_db()
    saved: list[dict] = []

    for entry in entries:
        try:
            db.table("raw_sources").upsert(
                {
                    "source": entry["source"],
                    "title": entry["title"],
                    "description": entry.get("description"),
                    "url": entry["url"],
                },
                on_conflict="url",
            ).execute()
            saved.append(entry)
        except Exception as e:
            logger.debug("Skip duplicate or invalid entry '%s': %s", entry.get("title"), e)

    logger.info("Saved %d raw sources to database", len(saved))
    return saved


def load_raw_sources(limit: int = 300) -> list[dict]:
    """Load previously scraped raw entries from database for resume mode."""
    db = get_db()
    try:
        resp = (
            db.table("raw_sources")
            .select("source,title,description,url")
            .order("scraped_at", desc=True)
            .limit(limit)
            .execute()
        )
        rows = resp.data or []
        entries = [
            {
                "source": r.get("source"),
                "title": r.get("title"),
                "description": r.get("description") or "",
                "url": r.get("url"),
            }
            for r in rows
            if r.get("title") and r.get("url")
        ]
        logger.info("Loaded %d raw entries from database", len(entries))
        return entries
    except Exception as e:
        logger.warning("Failed to load raw sources from database: %s", e)
        return []


def save_products(products: list[dict]) -> dict[str, str]:
    """Save denoised products to the database. Returns a url -> id map."""
    db = get_db()
    url_to_id: dict[str, str] = {}

    for p in products:
        try:
            resp = db.table("ai_products").upsert(
                {
                    "name": p["title"],
                    "description": p.get("description"),
                    "url": p["url"],
                    "source": p["source"],
                    "is_ai_native": p["is_ai_native"],
                    "innovation_score": p["innovation_score"],
                    "core_capability": p.get("core_capability"),
                    "reasoning": p.get("reasoning"),
                },
                on_conflict="url",
            ).execute()
            url_to_id[p["url"]] = resp.data[0]["id"]
        except Exception as e:
            logger.debug("Failed to save product '%s': %s", p["title"], e)

    logger.info("Saved %d AI products to database", len(url_to_id))
    return url_to_id


def run_pipeline(
    resume_from_db: bool = False,
    limit: int = 100,
    *,
    skip_embedding: bool = False,
):
    """Execute the full daily pipeline: scrape -> denoise -> unbundle -> cluster -> briefing."""
    logger.info("=" * 60)
    logger.info("Starting AI Trend Agent pipeline...")
    if skip_embedding:
        logger.info("Cost saver: --skip-embedding (no embedding API calls)")
    logger.info("=" * 60)

    # Step 1: Scrape all sources OR resume from existing raw_sources
    raw_entries: list[dict] = []
    if resume_from_db:
        logger.info(
            "Resume mode enabled: loading existing raw_sources from database (limit=%d).",
            limit,
        )
        raw_entries = load_raw_sources(limit=limit)
        if not raw_entries:
            logger.warning("No raw entries found in database. Falling back to fresh scrape.")
    if not raw_entries:
        raw_entries.extend(fetch_rss())
        raw_entries.extend(fetch_github_trending())
        raw_entries.extend(fetch_producthunt())
        if not raw_entries:
            logger.warning("No raw entries fetched. Aborting pipeline.")
            return
        save_raw_sources(raw_entries)
        raw_entries = raw_entries[:limit]
        logger.info("Using %d freshly scraped raw entries after limit applied", len(raw_entries))

    # Step 2: Denoise (LLM filter for AI Washing)
    products = denoise_batch(raw_entries)
    if not products:
        logger.warning("No products passed the AI-native filter. Aborting pipeline.")
        return

    product_id_map = save_products(products)

    # Step 3: Unbundle (extract atomic functions, pain points)
    atoms = unbundle_batch(products)
    if atoms:
        store_atoms_with_embeddings(
            atoms, product_id_map, skip_embedding=skip_embedding
        )

    # Step 4: Re-bundle (semantic clustering, whitespace detection)
    opportunities = analyze_rebundling(atoms) if atoms else []
    if opportunities:
        store_opportunities(opportunities)

    # Step 5: Generate daily briefing
    briefing_md = generate_briefing(products, atoms, opportunities)
    if briefing_md:
        store_briefing(briefing_md, len(products), len(opportunities))

    logger.info("=" * 60)
    logger.info(
        "Pipeline complete: %d products, %d atoms, %d opportunities",
        len(products),
        len(atoms),
        len(opportunities),
    )
    logger.info("=" * 60)


def main():
    """Entry point: run once or start the scheduler."""
    limit = parse_limit_arg(default=100)
    skip_embedding = "--skip-embedding" in sys.argv

    if "--resume-from-db" in sys.argv:
        run_pipeline(
            resume_from_db=True,
            limit=limit,
            skip_embedding=skip_embedding,
        )
        return

    if "--once" in sys.argv:
        run_pipeline(limit=limit, skip_embedding=skip_embedding)
        return

    logger.info("Starting scheduler. Pipeline will run daily at 08:00 UTC.")
    scheduler = BlockingScheduler()
    scheduler.add_job(
        lambda: run_pipeline(skip_embedding=skip_embedding),
        "cron",
        hour=8,
        minute=0,
        misfire_grace_time=3600,
    )

    # Also run immediately on first start
    run_pipeline(skip_embedding=skip_embedding)

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Scheduler stopped.")


if __name__ == "__main__":
    main()
