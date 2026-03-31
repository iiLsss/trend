## Why

In the AI era, survival depends on having a "data flywheel." There is a massive influx of both genuine AI-native innovations and superficial "AI Washing" products. We need an automated, agentic system to continuously observe, unbundle, and re-bundle these fragmented tools to discover high-value product opportunities, identify market whitespace, and build a strategic moat.

## What Changes

- Implemented an automated ingestion pipeline in `apps/agent` for RSS feeds, GitHub Trending HTML scraping, and Product Hunt RSS (keyword-filtered AI entries).
- Implemented OpenRouter-based LLM analysis (default `google/gemini-2.0-flash-lite-001`) for denoising, unbundling, re-bundling, and briefing generation.
- Implemented resilient structured-output fallbacks for Gemini-style variability:
  - `unbundle`: accepts either object list or string list for `core_functions`
  - `rebundle`: accepts either object list or string list for `opportunities`
- Implemented low-cost execution modes in pipeline CLI:
  - `--resume-from-db` (reuse `raw_sources`, skip fresh scrape)
  - `--limit N` (process only recent N records)
  - `--skip-embedding` (skip embedding calls and still complete pipeline)
- Implemented daily briefing persistence and frontend rendering with Streamdown Markdown renderer in `apps/web`.
- Implemented user feedback write-path (`user_feedback`) from frontend to DB.

## Capabilities

### New Capabilities
- `observe-layer`: RSS/GitHub/Product Hunt ingestion, Supabase raw store, resume-from-db mode, and LLM denoising.
- `unbundling-analysis`: Atomic function extraction with schema-compatibility fallback and disposability scoring.
- `re-bundling-logic`: Opportunity generation + DB storage with schema-compatibility fallback and optional embedding skip.
- `reflection-loop`: Daily briefing generation/storage and frontend feedback capture.

### Modified Capabilities
- (None - this is a new system)

## Impact

- **External Integrations**: Uses RSS sources + Product Hunt RSS + GitHub Trending page scrape. X/Twitter source is not yet implemented in code.
- **AI/LLM**: Uses OpenRouter OpenAI-compatible endpoint with Gemini default model; structured output through `instructor`.
- **Infrastructure**: Uses Supabase/Postgres tables (`raw_sources`, `ai_products`, `atomic_functions`, `clusters`, `re_bundling_opportunities`, `briefings`, `user_feedback`) and APScheduler-based daily orchestration.
