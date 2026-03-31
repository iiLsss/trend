"""Unbundling Analysis: extract atomic functions, pain points, and disposability score."""

import logging
from typing import Union
from pydantic import BaseModel, Field
from src.config import LLM_MODEL
from src.llm import client

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are a product teardown specialist. Your task is to break an AI product into its smallest "atomic functions" and assess how "disposable" it is.

For each product you must:
1. Extract 1–5 core atomic functions (core_functions). Each should be an independent, reusable capability unit.
2. Identify the specific pain points it addresses (pain_points).
3. Score disposability (disposable_score, 1–10):
   - 1–3: High stickiness; platform-style products users rely on long term
   - 4–6: Medium stickiness; solves ongoing problems but is substitutable
   - 7–10: Highly disposable; single-purpose, easy to absorb into a larger product"""


class AtomicFunction(BaseModel):
    function_name: str = Field(..., description="Name of the atomic function (e.g., SQL generation, screenshot-to-code)")
    category: str = Field(..., description="Function category (e.g., code generation, data analysis, content creation, automation)")
    pain_point: str = Field(..., description="Specific pain point this function addresses")


class UnbundleResult(BaseModel):
    core_functions: list[Union[AtomicFunction, str]] = Field(
        ..., min_length=1, max_length=5, description="List of core atomic functions"
    )
    disposable_score: int = Field(..., ge=1, le=10, description="Disposability score from 1 to 10")


def unbundle_product(name: str, description: str, core_capability: str) -> UnbundleResult | None:
    """Extract atomic functions from a single product."""
    try:
        result = client.chat.completions.create(
            model=LLM_MODEL,
            response_model=UnbundleResult,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": (
                        f"Product name: {name}\n"
                        f"Product description: {description}\n"
                        f"Core capability: {core_capability}"
                    ),
                },
            ],
        )
        return result
    except Exception as e:
        logger.warning("Unbundle failed for '%s': %s", name, e)
        return None


def unbundle_batch(products: list[dict]) -> list[dict]:
    """Unbundle a batch of AI-native products into atomic functions.

    Returns a flat list of atomic function dicts, each referencing its parent product.
    """
    atoms: list[dict] = []

    for product in products:
        result = unbundle_product(
            product["title"],
            product.get("description", ""),
            product.get("core_capability", ""),
        )
        if result is None:
            continue

        for func in result.core_functions:
            if isinstance(func, str):
                func_obj = AtomicFunction(
                    function_name=func,
                    category="general",
                    pain_point="Not provided by model output",
                )
            else:
                func_obj = func
            atoms.append({
                "product_title": product["title"],
                "product_url": product["url"],
                "function_name": func_obj.function_name,
                "category": func_obj.category,
                "pain_point": func_obj.pain_point,
                "disposable_score": result.disposable_score,
            })

        logger.info(
            "Unbundled '%s' -> %d atoms, disposable=%d/10",
            product["title"],
            len(result.core_functions),
            result.disposable_score,
        )

    logger.info("Unbundle: extracted %d atomic functions from %d products", len(atoms), len(products))
    return atoms
