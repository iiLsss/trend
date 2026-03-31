# Deployment Guide (Monorepo)

This app is **`apps/web`** inside a Turborepo workspace. Deploy it as the **Next.js** target; the Python agent is deployed **separately**.

## Prerequisites

- Git repository containing the **monorepo root** (not only `apps/web`)
- [Vercel](https://vercel.com) account (or another Next.js host that supports monorepos)
- For **AI 工具** page: a Supabase project and schema from `packages/db-schema/schema.sql`
- For **黄金趋势**: a free [FRED API key](https://fred.stlouisfed.org/docs/api/api_key.html)

## 1. Vercel: connect the repo

1. Import the Git repository in Vercel.
2. Set **Root Directory** to **`apps/web`** (required).
3. Framework preset: Next.js (default).

Build/install commands are usually inferred; if you customize:

- Install: run from repo root so workspaces resolve, e.g. `cd ../.. && npm install` or Vercel’s default that installs from root when using monorepos — align with your Vercel “Install Command” if builds fail.

## 2. Environment variables (Vercel → `apps/web`)

Set these in the Vercel project (Production / Preview as needed):

| Variable | Purpose |
|----------|---------|
| `CRON_SECRET` | Authenticates `/api/cron` (see `vercel.json`) |
| `FRED_API_KEY` | Required for `/trends/gold` live series |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for `/trends/ai-tools` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key for browser/server reads used by the web app |

Copy names from **`apps/web/.env.example`**. Do not commit real secrets; use Vercel env UI or `.env.local` locally.

### Local development

From monorepo root:

```bash
nvm use
npm install
```

Create **`apps/web/.env.local`** with the same variables you need (at minimum `FRED_API_KEY` for gold; add Supabase keys for AI tools).

```bash
npm run dev
```

## 3. Python agent (`apps/agent`) — separate deploy

The agent writes to Supabase (`raw_sources`, `ai_products`, `atomic_functions`, `clusters`, `re_bundling_opportunities`, `briefings`, `user_feedback`). Configure on your host (Docker on Render/Railway/VPS, etc.):

| Variable | Purpose |
|----------|---------|
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `LLM_MODEL` | Optional; default `google/gemini-2.0-flash-lite-001` |
| `SUPABASE_URL` | Same project as web |
| `SUPABASE_SERVICE_ROLE_KEY` | **Service role** key (server-side only; never in Next.js public env) |

See **`apps/agent/.env.example`** and CLI flags: `--once`, `--resume-from-db`, `--limit N`, `--skip-embedding`.

The web app **does not** need the service role key if it only reads via anon key + RLS policies you define in Supabase.

## 4. Supabase

1. Create a project; enable **`vector`** extension if you use embeddings (see `packages/db-schema/schema.sql`).
2. Run the SQL in **`packages/db-schema/schema.sql`** (SQL Editor).
3. Configure **Row Level Security** so the anon key can `select` what the UI needs and optionally `insert` on `user_feedback` if you use the feedback form from the client.

## 5. Post-deploy checks

1. Open deployed `/` and `/trends`.
2. **`/trends/gold`** — confirms `FRED_API_KEY`.
3. **`/trends/ai-tools`** — confirms Supabase + populated tables after agent runs.
4. Cron: Vercel → Functions/logs for `/api/cron` per `apps/web/vercel.json`.

## Troubleshooting

### “Another next dev server is already running”

Only one `next dev` per `apps/web` directory. Stop the old PID or reuse `http://localhost:3000`.

### Turbopack / monorepo root errors

`apps/web/next.config.ts` sets `turbopack.root` to the monorepo root. If you move the repo layout, update that path.

### AI page empty

- Run the agent at least once with valid keys.
- Confirm web env has `NEXT_PUBLIC_SUPABASE_*` and RLS allows read.

### Build fails on wrong Node version

Use Node **>= 20.9.0** (repo `.nvmrc` pins v24.10.0). Set the same on Vercel project settings if needed.

## Continuous deployment

Pushing to the connected branch triggers Vercel builds for **`apps/web`** when Root Directory is set correctly.
