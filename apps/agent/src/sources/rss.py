"""Fetch AI-related entries from configured RSS feeds."""

import logging
import feedparser
from src.config import RSS_FEEDS

logger = logging.getLogger(__name__)


def fetch_rss() -> list[dict]:
    """Parse all configured RSS feeds and return normalized entries."""
    results: list[dict] = []

    for feed_url in RSS_FEEDS:
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:20]:
                results.append({
                    "source": "rss",
                    "title": entry.get("title", "").strip(),
                    "description": entry.get("summary", "").strip()[:1000],
                    "url": entry.get("link", "").strip(),
                })
        except Exception as e:
            logger.warning("Failed to parse RSS feed %s: %s", feed_url, e)

    logger.info("RSS: fetched %d entries from %d feeds", len(results), len(RSS_FEEDS))
    return results
