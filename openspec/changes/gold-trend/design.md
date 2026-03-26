## Context

The app is a Next.js (App Router) trends site with an editorial/newsroom visual language and Simplified Chinese UI. The Middle East conflict page sets patterns for layout, RSS sidebars, charts (Recharts), and cache/reload behavior. This change adds **黄金趋势** with **authentic daily gold data**—user has confirmed **no tick-level data** and **no mock prices**.

## Goals / Non-Goals

**Goals:**

- Deliver **`/trends/gold`** with headline metrics and a **multi-month daily** price series suitable for **trend** analysis (e.g. 90–365 trading days where the API allows).
- Use **FRED** as the **primary** source for a **daily** gold series (e.g. London PM fix or equivalent FRED series), via `https://api.stlouisfed.org/fred/series/observations` with `FRED_API_KEY`.
- Compute simple, explainable indicators from the series (e.g. latest level, change over 30/90 days, optional realized volatility from daily returns)—all **derived from fetched observations**, not hard-coded.
- Keep UI consistent with existing editorial pages (Playfair/Inter, white background, minimal semantic color).
- Add **黄金趋势** to **`/trends`** hub.

**Non-Goals:**

- Real-time order book, tick, or sub-hour “spot” as the primary narrative.
- Investment advice; at most a short non-normative disclaimer if product requires it.
- Storing prices in a database in v1 (in-memory + Next cache / ISR is enough unless limits force otherwise).

## Decisions

- **Primary data: FRED daily series**  
  - **Rationale**: Free (with registration), stable, appropriate for **trend** storytelling.  
  - **Default series** (document in code comments + README): e.g. `GOLDPMGBD228NLBM` (London Gold PM Fixing USD per troy oz)—confirm exact series ID in implementation from FRED catalog.  
  - **API**: `GET .../fred/series/observations?series_id=...&api_key=...&file_type=json&sort_order=asc` with `observation_start` to limit payload.

- **No mock gold prices**  
  - If `FRED_API_KEY` is missing or FRED returns an error: render **黄金数据暂时不可用** (or equivalent) for numeric sections; **do not** synthesize prices.  
  - RSS/news may still render if configured independently, or show empty state—spec should clarify.

- **Optional secondary provider (env-gated)**  
  - e.g. a free-tier metals API with user-supplied key for **supplementary** headline or sanity check—not required for MVP if FRED alone meets spec.  
  - If present, failures fall back to FRED-only or unavailable, never to fake numbers.

- **Refresh model**  
  - Align with existing app: `dynamic` / `revalidate` window suitable for **daily** data (e.g. hours, not seconds).  
  - Support **`?reloaddate=true`** on `/trends/gold` to force refresh consistent with the Middle East page, if the project standard requires it.

- **Chart**  
  - Recharts line chart, Chinese labels, daily x-axis; optional simple moving average computed client-side or server-side from the same series.

## Risks / Trade-offs

- **FRED rate limits / key exposure** → Keep key in server-only env; cache responses; batch single series per request.  
- **Series revisions** → FRED may revise historical points; document that charts may shift slightly after updates.  
- **Non-trading days** → Series has gaps; charting should tolerate missing calendar days or use observation dates only.  
- **User misconfiguration** → Clear build/runtime messaging when key missing (dev vs prod policy to be consistent with Middle East features).

## Migration Plan

1. Add env vars to `.env.example` and deployment docs.  
2. Ship page behind no feature flag; empty state if key unset in dev.  
3. Extend cron revalidation if used globally.

## Open Questions

- Exact FRED `series_id` to standardize on (PM fix vs other) after quick validation in implementation.  
- Whether RSS keywords for gold should be a fixed list or env-configurable.
