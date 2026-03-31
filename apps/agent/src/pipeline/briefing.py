"""Generate a daily intelligence briefing in Markdown format."""

import logging
from datetime import date
from pydantic import BaseModel, Field
from src.config import LLM_MODEL
from src.llm import client
from src.db import get_db

logger = logging.getLogger(__name__)

BRIEFING_PROMPT = """You are the AI analysis editor for a global trend tracker. Based on today's analytical outputs, produce a concise daily intelligence briefing in Markdown.

Structure:
1. **Today's overview**: One paragraph summarizing the day's findings
2. **AI-native standouts**: 3–5 most notable AI products, each with name, core capability, and innovation score
3. **Unbundling insights**: Highlights from the most interesting atomic functions extracted today
4. **Re-bundling opportunities**: 2–3 highest-value re-bundling opportunities, including moat scores
5. **Whitespace alert**: Call out any market whitespace opportunities prominently if present

Tone: professional, concise, and insightful. Write the full briefing in Chinese (用中文撰写)."""


class BriefingContent(BaseModel):
    content_md: str = Field(..., description="Complete Markdown intelligence briefing")


def generate_briefing(
    products: list[dict],
    atoms: list[dict],
    opportunities: list[dict],
) -> str | None:
    """Generate a Markdown briefing from today's analysis results."""
    products_text = "\n".join(
        f"- {p['title']} (innovation={p.get('innovation_score', '?')}/10, capability={p.get('core_capability', '?')})"
        for p in products[:10]
    )

    atoms_text = "\n".join(
        f"- {a['function_name']} ({a['category']}): {a['pain_point']}"
        for a in atoms[:20]
    )

    opps_text = "\n".join(
        f"- {o.title} (moat={o.moat_score}/10, industry={o.target_industry}, whitespace={'yes' if o.is_whitespace else 'no'})"
        for o in opportunities
    )

    user_input = (
        f"Today's date: {date.today().isoformat()}\n\n"
        f"## AI-native products after denoise filter ({len(products)})\n{products_text}\n\n"
        f"## Extracted atomic functions ({len(atoms)})\n{atoms_text}\n\n"
        f"## Re-bundling opportunities ({len(opportunities)})\n{opps_text}"
    )

    try:
        result = client.chat.completions.create(
            model=LLM_MODEL,
            response_model=BriefingContent,
            messages=[
                {"role": "system", "content": BRIEFING_PROMPT},
                {"role": "user", "content": user_input},
            ],
        )
        return result.content_md
    except Exception as e:
        logger.warning("Briefing generation failed: %s", e)
        return None


def store_briefing(content_md: str, products_count: int, opportunities_count: int):
    """Save the daily briefing to the database."""
    db = get_db()
    today = date.today().isoformat()

    db.table("briefings").upsert(
        {
            "date": today,
            "content_md": content_md,
            "products_count": products_count,
            "opportunities_count": opportunities_count,
        },
        on_conflict="date",
    ).execute()

    logger.info("Stored briefing for %s", today)
