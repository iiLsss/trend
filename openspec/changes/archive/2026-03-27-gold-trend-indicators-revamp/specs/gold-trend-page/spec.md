## MODIFIED Requirements

### Requirement: Trend indicators from daily series
The page SHALL display macro-style indicators derived only from the fetched daily series (e.g. latest observed level, change over a defined lookback such as 30 and 90 observations). In addition, the page SHALL prominently display the current trend conclusion (e.g., "强势上行", "弱势下行", "震荡/转折") and the current market risk level (based on volatility) in a clear, easy-to-understand format at the top of the page. Labels and descriptions SHALL be in Simplified Chinese.

#### Scenario: Indicators reflect data
- **WHEN** valid observations are available
- **THEN** indicator values match definitions documented in implementation (same source series, consistent date ordering).

#### Scenario: Trend and risk conclusions are prominently displayed
- **WHEN** the user views the gold trend page
- **THEN** a highly visible summary section clearly states the current trend direction and market risk level.

## ADDED Requirements

### Requirement: Use specific FRED series for trend and risk
The page SHALL use the `NASDAQQGLDI` series for gold price trend analysis and the `GVZCLS` series for market risk/volatility analysis.

#### Scenario: Displaying correct series data
- **WHEN** the page loads successfully
- **THEN** the chart and indicators reflect the `NASDAQQGLDI` and `GVZCLS` data, and the UI explicitly mentions these indices.