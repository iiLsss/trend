"""Re-bundling Logic: semantic clustering of atomic functions and whitespace detection."""

import logging
from typing import Union
from pydantic import BaseModel, Field
from src.config import LLM_MODEL, EMBEDDING_MODEL
from src.llm import client, raw_client
from src.db import get_db

logger = logging.getLogger(__name__)

REBUNDLE_PROMPT = """You are a product strategist. Given a set of decomposed AI atomic functions, analyze how they relate and identify opportunities to "re-bundle" them into stronger offerings.

For each cluster you must assess:
1. If bundled together, what materially greater value do these functions deliver than standalone tools?
2. Which industry or use case would benefit most from this integrated opportunity?
3. Moat score (moat_score, 1–10), considering:
   - Proprietary data (has_proprietary_data)
   - Potential for transaction embedding (has_transaction_embed)
   - Network effects (has_network_effect)
4. Whether this is a whitespace opportunity (is_whitespace): many fragmented tools exist but no dominant integrated solution"""


class ReBundleOpportunity(BaseModel):
    title: str = Field(..., description="Name or concept for the bundled product")
    value_proposition: str = Field(..., description="Value proposition: why the bundle beats using tools separately")
    target_industry: str = Field(..., description="Target industry or scenario")
    member_functions: list[str] = Field(..., description="Names of atomic functions included in this cluster")
    moat_score: int = Field(..., ge=1, le=10, description="Moat score")
    has_proprietary_data: bool = Field(default=False)
    has_transaction_embed: bool = Field(default=False)
    has_network_effect: bool = Field(default=False)
    is_whitespace: bool = Field(default=False, description="Whether this is a market whitespace opportunity")


class ReBundleAnalysis(BaseModel):
    opportunities: list[Union[ReBundleOpportunity, str]] = Field(
        ..., min_length=1, max_length=10, description="Discovered re-bundling opportunities"
    )


def generate_embedding(text: str) -> list[float] | None:
    """Generate an embedding vector via OpenRouter. Returns None if unsupported."""
    try:
        resp = raw_client.embeddings.create(input=text, model=EMBEDDING_MODEL)
        return resp.data[0].embedding
    except Exception as e:
        logger.debug("Embedding generation skipped (model may not support it): %s", e)
        return None


def store_atoms_with_embeddings(
    atoms: list[dict],
    product_id_map: dict[str, str],
    *,
    skip_embedding: bool = False,
):
    """Store atomic functions in DB. Embeddings are optional (skip to save API cost)."""
    db = get_db()

    for atom in atoms:
        product_id = product_id_map.get(atom["product_url"])
        if not product_id:
            continue

        row: dict = {
            "product_id": product_id,
            "function_name": atom["function_name"],
            "category": atom["category"],
            "pain_point": atom["pain_point"],
            "disposable_score": atom["disposable_score"],
        }

        if not skip_embedding:
            embedding_text = f"{atom['function_name']}: {atom['pain_point']}"
            embedding = generate_embedding(embedding_text)
            if embedding:
                row["embedding"] = embedding

        db.table("atomic_functions").insert(row).execute()

    logger.info(
        "Stored %d atomic functions%s",
        len(atoms),
        " (embeddings skipped)" if skip_embedding else "",
    )


def _normalize_opportunity(item: Union[ReBundleOpportunity, str], idx: int) -> ReBundleOpportunity:
    """Normalize model output to ReBundleOpportunity."""
    if isinstance(item, ReBundleOpportunity):
        return item
    # Fallback for models that return plain strings instead of structured objects.
    parts = [p.strip() for p in item.split(",") if p.strip()]
    title = parts[0][:80] if parts else f"Opportunity {idx + 1}"
    members = parts[:5] if parts else [title]
    return ReBundleOpportunity(
        title=title,
        value_proposition=item[:400],
        target_industry="general",
        member_functions=members,
        moat_score=5,
        has_proprietary_data=False,
        has_transaction_embed=False,
        has_network_effect=False,
        is_whitespace=True,
    )


def analyze_rebundling(atoms: list[dict]) -> list[ReBundleOpportunity]:
    """Use LLM to analyze atomic functions and discover re-bundling opportunities."""
    atoms_text = "\n".join(
        f"- {a['function_name']} ({a['category']}): {a['pain_point']} [disposable={a['disposable_score']}/10]"
        for a in atoms
    )

    try:
        result = client.chat.completions.create(
            model=LLM_MODEL,
            response_model=ReBundleAnalysis,
            messages=[
                {"role": "system", "content": REBUNDLE_PROMPT},
                {
                    "role": "user",
                    "content": f"Here are all atomic functions extracted today:\n\n{atoms_text}",
                },
            ],
        )
        normalized = [
            _normalize_opportunity(opp, idx) for idx, opp in enumerate(result.opportunities)
        ]
        logger.info("Re-bundling: found %d opportunities", len(normalized))
        return normalized
    except Exception as e:
        logger.warning("Re-bundling analysis failed: %s", e)
        return []


def store_opportunities(opportunities: list[ReBundleOpportunity]):
    """Store re-bundling opportunities and their clusters in the database."""
    db = get_db()

    for opp in opportunities:
        cluster_resp = db.table("clusters").insert({
            "label": opp.title,
            "description": opp.value_proposition,
            "is_whitespace": opp.is_whitespace,
            "opportunity_score": opp.moat_score,
        }).execute()

        cluster_id = cluster_resp.data[0]["id"]

        db.table("re_bundling_opportunities").insert({
            "cluster_id": cluster_id,
            "title": opp.title,
            "value_proposition": opp.value_proposition,
            "target_industry": opp.target_industry,
            "moat_score": opp.moat_score,
            "has_proprietary_data": opp.has_proprietary_data,
            "has_transaction_embed": opp.has_transaction_embed,
            "has_network_effect": opp.has_network_effect,
        }).execute()

    logger.info("Stored %d re-bundling opportunities", len(opportunities))
