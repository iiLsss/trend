"""Fetch AI-related trending repositories from GitHub."""

import logging
import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

GITHUB_TRENDING_URL = "https://github.com/trending?since=daily&spoken_language_code=en"


def fetch_github_trending() -> list[dict]:
    """Scrape GitHub Trending page and return normalized entries."""
    results: list[dict] = []

    try:
        resp = httpx.get(GITHUB_TRENDING_URL, timeout=30, follow_redirects=True)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        for article in soup.select("article.Box-row"):
            h2 = article.select_one("h2 a")
            if not h2:
                continue

            repo_path = h2.get("href", "").strip("/")
            if not repo_path:
                continue

            title = repo_path.replace("/", " / ")
            url = f"https://github.com/{repo_path}"

            desc_tag = article.select_one("p")
            description = desc_tag.get_text(strip=True) if desc_tag else ""

            results.append({
                "source": "github",
                "title": title,
                "description": description[:1000],
                "url": url,
            })

    except Exception as e:
        logger.warning("Failed to fetch GitHub Trending: %s", e)

    logger.info("GitHub Trending: fetched %d repos", len(results))
    return results
