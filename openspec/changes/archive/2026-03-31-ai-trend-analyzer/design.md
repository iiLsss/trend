## Context

The project is a "Global Trends Tracker" built on Next.js 16.2.1, React 19, and Tailwind CSS v4. We are expanding it with an "AI Trend Analyzer" to track AI products, filter "AI Washing", unbundle core features, and identify "Re-bundling" opportunities.

We adopt a **Turborepo Monorepo** architecture with the following structure:

```
/trend/
├── apps/
│   ├── web/              # Next.js frontend (deployed on Vercel)
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── package.json
│   │   └── next.config.ts
│   └── agent/            # Python Agent backend (deployed on Render/Railway/VPS)
│       ├── pyproject.toml
│       ├── Dockerfile
│       └── src/
├── packages/
│   └── db-schema/        # Shared database Schema & TypeScript types
│       ├── schema.sql
│       ├── database.types.ts
│       └── package.json
├── openspec/
├── package.json          # Root workspace config
└── turbo.json            # Turborepo pipeline config
```

- **`apps/web`**: The existing Next.js frontend, displaying AI trend intelligence and handling user feedback.
- **`apps/agent`**: A standalone Python service for scraping, LLM denoising, unbundling, clustering, and long-horizon monitoring.
- **`packages/db-schema`**: The single source of truth for the database schema (`schema.sql`) and TypeScript types (`Database`), consumed by both `apps/web` (via npm workspace `@trend/db-schema`) and `apps/agent` (via direct file reference).
- **Shared Data Layer**: Both apps connect to a single **Supabase (PostgreSQL + pgvector)** database.

## Goals / Non-Goals

**Goals:**
- **Frontend (`apps/web`)**: Editorial-style AI trends page (`/trends/ai-tools`) showing products, opportunities, daily briefing, and feedback form.
- **Backend (`apps/agent`)**: Python service that runs scrape → denoise → unbundle → rebundle → briefing and persists all outputs.
- **Data Layer**: Shared Supabase schema in `packages/db-schema/schema.sql`, typed in `packages/db-schema/database.types.ts`.
- **Cost Controls**: Support low-cost runs with `--resume-from-db`, `--limit`, and `--skip-embedding`.

**Non-Goals:**
- Running heavy scraping or LLM calls in Next.js route handlers.
- Implementing direct X/Twitter ingestion in current code iteration.
- Building vector-only clustering logic as a hard dependency (current pipeline can complete with `--skip-embedding`).

## Decisions

- **Architecture Pattern: Turborepo Monorepo**
  - *Rationale*: Unified codebase for AI-assisted development (Cursor sees everything). Independent deployment per app. Shared schema package eliminates drift.
- **Shared Database**: Use **Supabase (PostgreSQL + pgvector)**.
  - *Contract*: `packages/db-schema/schema.sql` is the single source of truth.
- **Agent Backend Tech Stack (Python)**:
  - Scraping: `feedparser` (RSS + Product Hunt RSS), `httpx` + `beautifulsoup4` (GitHub Trending).
  - LLM transport: OpenRouter (`https://openrouter.ai/api/v1`) via OpenAI-compatible SDK.
  - Default model: `google/gemini-2.0-flash-lite-001`.
  - Structured output: `instructor` + Pydantic response models.
  - Orchestration: APScheduler + CLI modes (`--once`, `--resume-from-db`, `--limit`, `--skip-embedding`).
  - Deployment: Dockerized agent service.
- **Robustness for Gemini Structured Output**:
  - `unbundle.py`: `core_functions` accepts object-or-string and normalizes.
  - `rebundle.py`: `opportunities` accepts object-or-string and normalizes.
- **Frontend Rendering**:
  - `apps/web/components/briefing-view.tsx` uses `Streamdown` for Markdown rendering.
  - `streamdown/styles.css` imported in layout and Tailwind source path added in `app/globals.css`.

## Risks / Trade-offs

- **Risk: LLM structured output drift** -> *Mitigation*: Added compatibility normalization for string-form outputs in unbundle/rebundle stages.
- **Risk: Runtime cost spikes** -> *Mitigation*: Resume mode from DB + record limit + optional embedding skip.
- **Risk: Monorepo Turbopack root mis-detection** -> *Mitigation*: `apps/web/next.config.ts` sets absolute `turbopack.root` to monorepo root.
- **Risk: Schema drift across apps** -> *Mitigation*: Keep SQL and TS types together in `packages/db-schema`.
