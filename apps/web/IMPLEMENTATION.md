# Implementation Summary (Current)

This document describes the **current** codebase under the Turborepo monorepo. The Next.js app lives in **`apps/web`** (not the repository root).

## Repository layout

```
trend/                          # monorepo root
├── apps/
│   ├── web/                    # Next.js frontend (this folder)
│   └── agent/                  # Python AI Trend Agent (pipeline + cron)
├── packages/
│   └── db-schema/              # Shared schema.sql + TypeScript Database types (@trend/db-schema)
├── package.json                # npm workspaces + turbo
├── turbo.json
└── openspec/
```

## Technology stack (`apps/web`)

- **Framework**: Next.js 16.2.1 (App Router), React 19
- **Styling**: Tailwind CSS v4
- **UI**: Lucide React, Radix Tooltip (where used)
- **Charts**: Recharts (gold / conflict visualizations)
- **Data**: `rss-parser`, Cheerio (legacy trend pages); **Supabase JS** for AI trends
- **Markdown (briefings)**: `streamdown` + `streamdown/styles.css`; Tailwind scans Streamdown via `@source` in `app/globals.css`
- **Node**: use `.nvmrc` at repo root (v24.10.0) — Next.js requires `>=20.9.0`

## Routes and features

### Marketing / hub

- **`/`** — Home landing with link to trends
- **`/trends`** — Topic index (Middle East, Gold, AI 工具)

### Middle East conflict (`/trends/middle-east-conflict`)

- Indicators, timeline chart, faction comparison, RSS-driven live updates (`lib/data.ts`)
- Manual refresh via `?reloaddate=` and `RefreshButton`

### Gold (`/trends/gold`)

- FRED-backed series and context news (`lib/gold-data.ts`)
- Requires `FRED_API_KEY`; on failure shows unavailable state (no mock numeric series)

### AI tools trend (`/trends/ai-tools`)

- **Read path**: `lib/ai-trends-data.ts` loads from Supabase tables `ai_products`, `re_bundling_opportunities` (with `clusters`), `briefings`
- **UI**: `AIProductsGrid`, `ReBundlingOpportunities`, `BriefingView` (Streamdown), `FeedbackForm`
- **Write path**: Server Action `app/trends/ai-tools/actions.ts` inserts `user_feedback`
- **Empty / error**: `AITrendsUnavailable` when Supabase missing, query fails, or no rows

### API routes (`apps/web/app/api`)

- **`/api/cron`** — Vercel cron (see `vercel.json` + `CRON_SECRET`)
- **`/api/revalidate`** — Manual revalidation hook

## Agent backend (`apps/agent`) — contract with this app

- Python pipeline: scrape → LLM denoise → unbundle → rebundle → briefing → **Supabase writes**
- LLM: **OpenRouter** (OpenAI-compatible), default `google/gemini-2.0-flash-lite-001` (`src/config.py`, `src/llm.py`)
- CLI cost controls: `--resume-from-db`, `--limit N`, `--skip-embedding`
- **Does not run inside Next.js**; frontend only reads what the agent (or SQL) wrote

## Important config files (`apps/web`)

- **`next.config.ts`** — `turbopack.root` points at **monorepo root** (absolute path) so Turbopack resolves workspaces correctly
- **`vercel.json`** — cron schedule for this app
- **`.env.example`** — documents `CRON_SECRET`, `FRED_API_KEY`, Supabase public keys for AI page

## Local development

From **monorepo root**:

```bash
nvm use
npm install
npm run dev
```

Dev server runs the `@trend/web` workspace via Turbo. If you see “Another next dev server is already running”, stop the existing process or reuse the existing port.

## UI note

The site uses a **light editorial** layout (e.g. white background in `layout.tsx`). Earlier docs that claimed a global dark/bento default are outdated.

## Verification checklist (maintainer)

- [ ] `nvm use` then `npm run dev` from repo root
- [ ] `/trends/gold` with valid `FRED_API_KEY`
- [ ] `/trends/ai-tools` with valid Supabase env and agent-populated tables
- [ ] Briefing markdown renders via Streamdown (headings, lists, code)
