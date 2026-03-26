## 1. Environment and documentation

- [x] 1.1 Add `FRED_API_KEY` to `.env.example` and document required/optional keys in `DEPLOYMENT.md` (or README) for gold data.
- [x] 1.2 Confirm chosen FRED `series_id` (e.g. London PM fix) and document it in `design.md` or code comment.

## 2. Data layer

- [x] 2.1 Implement `lib/gold-data.ts` (or extend `lib/data.ts`) to fetch FRED `series/observations` with date range, sort order, and error handling; **no mock prices**.
- [x] 2.2 Derive indicator structs from observations (latest level, 30/90-observation change, simple volatility or range) with TypeScript types.
- [x] 2.3 Implement optional RSS fetch for gold/macro keywords reusing existing RSS patterns; ensure RSS failure does not fabricate prices.

## 3. Routing and hub

- [x] 3.1 Add `app/trends/gold/page.tsx` (and supporting components) matching editorial layout patterns used on `/trends/middle-east-conflict`.
- [x] 3.2 Update `app/trends/page.tsx` to include the 黄金趋势 card/entry linking to `/trends/gold`.

## 4. UI components

- [x] 4.1 Build gold trend indicators section (Chinese labels, semantic colors consistent with newsroom style).
- [x] 4.2 Build Recharts daily price line chart with Chinese legend/axis labels.
- [x] 4.3 Build live/context feed section (or reuse timeline component with gold-specific props).
- [x] 4.4 Add explicit Chinese empty/error state when FRED data is unavailable.

## 5. Caching and reload

- [x] 5.1 Set appropriate `revalidate` / `dynamic` for daily data; support `searchParams` `reloaddate=true` consistent with existing trend pages.
- [x] 5.2 Update `vercel.json` cron and/or `app/api/cron/route.ts` to revalidate `/trends/gold` if the project uses global revalidation.

## 6. Verification

- [x] 6.1 Run `npm run build` with `FRED_API_KEY` set locally; verify page renders chart and indicators.
- [x] 6.2 Run `npm run build` or dev without key; verify unavailable state (no fake numbers).
