"""Fetch AI-related products from Product Hunt via RSS."""

import logging
import feedparser

logger = logging.getLogger(__name__)

PH_RSS_URL = "https://www.producthunt.com/feed"

AI_KEYWORDS = {
    "ai", "artificial intelligence", "llm", "gpt", "machine learning",
    "generative", "agent", "copilot", "chatbot", "neural", "deep learning",
    "rag", "vector", "embedding", "automation", "nlp",
}


def _is_ai_related(title: str, description: str) -> bool:
    text = (title + " " + description).lower()
    return any(kw in text for kw in AI_KEYWORDS)


def fetch_producthunt() -> list[dict]:
    """Parse Product Hunt RSS feed and filter for AI-related entries."""
    results: list[dict] = []

    try:
        feed = feedparser.parse(PH_RSS_URL)
        for entry in feed.entries[:50]:
            title = entry.get("title", "").strip()
            description = entry.get("summary", "").strip()[:1000]
            url = entry.get("link", "").strip()

            if _is_ai_related(title, description):
                results.append({
                    "source": "producthunt",
                    "title": title,
                    "description": description,
                    "url": url,
                })

    except Exception as e:
        logger.warning("Failed to fetch Product Hunt feed: %s", e)

    logger.info("Product Hunt: fetched %d AI-related entries", len(results))
    return results
