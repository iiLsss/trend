## 1. Monorepo Structure Migration

- [x] 1.1 Restructure project as Turborepo monorepo (`apps/web`, `apps/agent`, `packages/db-schema`).
- [x] 1.2 Move all Next.js code to `apps/web/`, create root `package.json` with workspaces, add `turbo.json`.
- [x] 1.3 Create `packages/db-schema` with `schema.sql`, `database.types.ts`, and `package.json` (`@trend/db-schema`).
- [x] 1.4 Update all imports in `apps/web` to use `@trend/db-schema` instead of local `database.types`.
- [x] 1.5 Verify TypeScript compilation passes with zero errors.

## 2. Shared Database Schema (Supabase)

- [x] 2.1 Create a Supabase project and enable the `pgvector` extension.
- [x] 2.2 Define SQL schema in `packages/db-schema/schema.sql` for tables: `raw_sources`, `ai_products`, `atomic_functions`, `clusters`, `cluster_members`, `re_bundling_opportunities`, `briefings`, `user_feedback`.

## 3. Agent Backend (`apps/agent`)

- [x] 3.1 Scaffold Python project with `pyproject.toml`, `Dockerfile`, and `src/` directory structure.
- [x] 3.2 Implement data ingestion modules: `src/sources/rss.py`, `src/sources/github_trending.py`, `src/sources/producthunt.py`.
- [x] 3.3 Implement the LLM Denoising filter (`src/pipeline/denoise.py`) using `instructor` + Pydantic.
- [x] 3.4 Implement the Unbundling Analysis (`src/pipeline/unbundle.py`).
- [x] 3.5 Implement the Re-bundling Logic (`src/pipeline/rebundle.py`) with embedding generation and semantic clustering.
- [x] 3.6 Implement the daily briefing generation (`src/pipeline/briefing.py`).
- [x] 3.7 Set up APScheduler to orchestrate the full pipeline daily with automatic retries.
- [x] 3.8 Write a `Dockerfile` for deployment.
- [x] 3.9 Switch LLM provider to OpenRouter and default Gemini cost-efficient model.
- [x] 3.10 Add cost controls: `--resume-from-db`, `--limit`, `--skip-embedding`.
- [x] 3.11 Add structured-output compatibility fallbacks for unbundle/rebundle stages.
- [x] 3.12 Validate end-to-end low-cost run and persistence to Supabase.

## 4. Next.js Frontend (`apps/web`)

- [x] 4.1 Add Supabase client (`lib/supabase.ts`) and data fetching layer (`lib/ai-trends-data.ts`).
- [x] 4.2 Create the `app/trends/ai-tools/page.tsx` route matching existing editorial layout.
- [x] 4.3 Build `components/ai-products-grid.tsx` and `components/re-bundling-opportunities.tsx`.
- [x] 4.4 Build `components/briefing-view.tsx` for daily intelligence briefing.
- [x] 4.5 Implement `components/feedback-form.tsx` and `app/trends/ai-tools/actions.ts` Server Action.
- [x] 4.6 Create `components/ai-trends-unavailable.tsx` for error/empty states.
- [x] 4.7 Add AI Tools entry to `app/trends/page.tsx` and navigation link to `components/header.tsx`.
- [x] 4.8 Replace custom markdown regex rendering with `Streamdown` and add scoped typography styling.
- [x] 4.9 Fix monorepo Turbopack root resolution in `apps/web/next.config.ts`.
