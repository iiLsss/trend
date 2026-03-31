# 全球趋势追踪器 (Global Trends Tracker)

Turborepo monorepo for tracking and analyzing global trends with real-time data.

## Structure

```
├── apps/
│   ├── web/              # Next.js frontend (Vercel)
│   └── agent/            # Python AI Trend Agent (Docker)
├── packages/
│   └── db-schema/        # Shared database schema & TypeScript types
└── openspec/             # Change specifications
```

## Getting Started

```bash
npm install        # Install all workspace dependencies
npm run dev        # Start the Next.js dev server (via Turborepo)
```

## Apps

- **`apps/web`** — Next.js 16, React 19, Tailwind CSS v4. Deployed on Vercel.
- **`apps/agent`** — Python AI agent for scraping, denoising, and analysis. Deployed via Docker.  
  Low-cost run: `cd apps/agent && source .venv/bin/activate && export $(cat .env | xargs) && python3 -m src.main --resume-from-db --limit 30 --skip-embedding`

## Packages

- **`packages/db-schema`** — Shared `schema.sql` and TypeScript `Database` type (`@trend/db-schema`).
