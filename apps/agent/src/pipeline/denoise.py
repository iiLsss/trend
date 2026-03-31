"""LLM-based denoising filter to separate AI-native products from AI Washing."""

import logging
from pydantic import BaseModel, Field
from src.config import LLM_MODEL
from src.llm import client

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are a top-tier AI product investor and architect. Your task is to determine whether an emerging AI tool represents genuine "AI-native innovation" or merely "AI washing" (thin wrappers or hype-chasing).

Characteristics of AI washing:
- A traditional form or rich-text editor with an "AI help me write" bolt-on
- Core business logic remains conventional CRUD; AI is only a marginal add-on
- No proprietary data handling, complex agentic workflows, or deep multimodal integration
- A CRUD app with little more than a thin layer over a general-purpose API

Characteristics of AI-native products:
- Interaction paradigms are rethought (e.g., generative UI, conversation-driven dynamic interfaces)
- Autonomous planning and execution capabilities (agentic)
- Solves problems that were impractical or impossible without AI
- Deep use of RAG, multimodal models, code generation, visual generation, or similar capabilities"""


class DenoiseResult(BaseModel):
    is_ai_native: bool = Field(..., description="Whether this is a genuine AI-native application")
    innovation_score: int = Field(..., ge=1, le=10, description="Innovation score from 1 to 10")
    core_capability: str = Field(
        ..., description="One-sentence summary of the underlying capability (e.g., RAG, agentic workflow, visual generation)"
    )
    reasoning: str = Field(..., description="Reasoning for the judgment")


def denoise_product(title: str, description: str) -> DenoiseResult | None:
    """Run a single product through the LLM denoising filter."""
    try:
        result = client.chat.completions.create(
            model=LLM_MODEL,
            response_model=DenoiseResult,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Product name: {title}\nProduct description: {description}",
                },
            ],
        )
        return result
    except Exception as e:
        logger.warning("Denoise failed for '%s': %s", title, e)
        return None


def denoise_batch(entries: list[dict]) -> list[dict]:
    """Filter a batch of raw entries. Returns only AI-native products with scores attached."""
    passed: list[dict] = []

    for entry in entries:
        result = denoise_product(entry["title"], entry.get("description", ""))
        if result is None:
            continue

        if result.is_ai_native and result.innovation_score >= 5:
            passed.append({
                **entry,
                "is_ai_native": result.is_ai_native,
                "innovation_score": result.innovation_score,
                "core_capability": result.core_capability,
                "reasoning": result.reasoning,
            })
            logger.info(
                "PASS [%d/10] %s — %s",
                result.innovation_score,
                entry["title"],
                result.core_capability,
            )
        else:
            logger.debug(
                "FILTER [%d/10] %s — %s",
                result.innovation_score,
                entry["title"],
                result.reasoning[:80],
            )

    logger.info("Denoise: %d/%d entries passed the AI-native filter", len(passed), len(entries))
    return passed
