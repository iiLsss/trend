## 1. Data Layer Updates

- [x] 1.1 Update `lib/gold-data.ts` to use `NASDAQQGLDI` as the primary gold price series.
- [x] 1.2 Add logic to fetch `GVZCLS` (CBOE Gold ETF Volatility Index) from FRED API.
- [x] 1.3 Implement 20-day and 60-day SMA calculation logic for the price series.
- [x] 1.4 Implement trend classification logic (Strong Upward, Weak Downward, Oscillating).
- [x] 1.5 Implement risk level classification logic based on GVZCLS value (<15, 15-25, >=25).
- [x] 1.6 Update `GoldIndicators` interface to include new trend and risk fields.

## 2. UI Updates

- [x] 2.1 Create a new "Trend Conclusion" component to prominently display the trend direction and risk level at the top of the page.
- [x] 2.2 Update `GoldIndicatorsGrid` to display the new indicators (SMA values, Volatility Index).
- [x] 2.3 Update `GoldPriceChart` to reflect the new daily `NASDAQQGLDI` series and update labels/tooltips.
- [x] 2.4 Update page header text in `app/trends/gold/page.tsx` to reflect the new daily indices and analysis logic.
- [x] 2.5 Ensure the "Data Unavailable" fallback state works correctly if either of the new series fails to load.

## 3. Verification

- [x] 3.1 Verify that the trend conclusion accurately reflects the SMA logic.
- [x] 3.2 Verify that the risk level accurately reflects the GVZCLS logic.
- [x] 3.3 Verify that the chart renders correctly with the daily data.
- [x] 3.4 Verify that the page degrades gracefully if FRED API keys are missing or requests fail.