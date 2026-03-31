"""Centralized configuration loaded from environment variables."""

import os

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

LLM_MODEL = os.environ.get("LLM_MODEL", "google/gemini-2.0-flash-lite-001")
EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "google/gemini-embedding-exp")

RSS_FEEDS: list[str] = [
    "https://a16z.com/feed/",
    "https://hnrss.org/newest?q=AI+tool",
    "https://hnrss.org/newest?q=AI+agent",
    "https://techcrunch.com/category/artificial-intelligence/feed/",
]
