## Why

The trends product already covers geopolitical topics (e.g. Middle East conflict). Users also need a dedicated, editorial-style **gold (XAU) trend** view driven by **real daily market data**—not fabricated numbers—so they can read direction, volatility, and context at a glance.

## What Changes

- Add a new trend route **`/trends/gold`** with the same serious editorial/newsroom UI patterns as existing trend pages (Chinese copy, serif headlines, restrained color).
- Implement **daily-frequency gold price history** for charts and trend metrics, sourced primarily from the **free FRED API** (user supplies `FRED_API_KEY`). **No mock or placeholder gold prices** in the happy path; on failure, show an explicit unavailable state.
- Extend the **`/trends`** hub to surface the new **黄金趋势** entry alongside existing topics.
- Optionally document a **secondary free-tier** metals API for cross-check or headline spot (behind env var); primary trend remains daily series–based.
- Reuse existing patterns: server-side data module, `?reloaddate=true` manual refresh semantics where applicable, Vercel cron / revalidation alignment with the existing app.

## Capabilities

### New Capabilities

- `gold-trend-page`: Gold trend topic page—daily price series, trend indicators, chart, and optional RSS/news sidebar filtered for gold/macro keywords; **real data only** for numeric gold metrics.

### Modified Capabilities

- `trend-app-core`: The trends index SHALL list all published trend topics including the new gold trend entry (link, title, description in Chinese).

## Impact

- **New route**: `app/trends/gold/` (or equivalent App Router segment).
- **New components** and/or **`lib/` data** for FRED (and optional second provider).
- **Environment**: `FRED_API_KEY` required for production gold numeric data; optional second key documented in `.env.example`.
- **Cron / revalidate**: extend or document revalidation for `/trends/gold` alongside existing paths.
- **Dependencies**: likely none beyond `fetch` and existing stack; no mock price generators.
