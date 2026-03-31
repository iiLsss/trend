"""Shared LLM client configured for OpenRouter."""

import instructor
from openai import OpenAI
from src.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL

_openai_client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url=OPENROUTER_BASE_URL,
)

client = instructor.from_openai(_openai_client)
raw_client = _openai_client
