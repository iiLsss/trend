## 1. Setup & Infrastructure

- [x] 1.1 Install `@radix-ui/react-tooltip` dependency.
- [x] 1.2 Create a reusable `ui/tooltip.tsx` component wrapping Radix primitives with Tailwind styling (dark background, white text, rounded corners).

## 2. Gold Trend Page Updates

- [x] 2.1 Update `GoldIndicatorsGrid` component to accept an optional `tooltip` property for each indicator row.
- [x] 2.2 Add plain-language tooltips to the 20-day SMA, 60-day SMA, and Volatility indicators in `GoldIndicatorsGrid`.
- [x] 2.3 Add a tooltip to the "Trend Conclusion" and "Market Risk" cards in `TrendConclusion` component to explain the underlying logic.

## 3. Middle East Conflict Page Updates

- [x] 3.1 Update `ConflictIndicators` component to support tooltips next to indicator titles.
- [x] 3.2 Add plain-language tooltips to complex indicators (e.g., Escalation Status, Diplomatic Progress, Ceasefire Likelihood).

## 4. Verification

- [x] 4.1 Verify tooltips appear on hover in desktop view.
- [x] 4.2 Verify tooltips appear on click/tap in mobile view.
- [x] 4.3 Verify tooltip text is readable and doesn't overflow the screen edges.