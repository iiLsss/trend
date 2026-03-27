## MODIFIED Requirements

### Requirement: Trend indicators from daily series
The page SHALL display macro-style indicators derived only from the fetched daily series (e.g. latest observed level, change over a defined lookback such as 30 and 90 observations). In addition, the page SHALL prominently display the current trend conclusion (e.g., "强势上行", "弱势下行", "震荡/转折") and the current market risk level (based on volatility) in a clear, easy-to-understand format at the top of the page. Labels and descriptions SHALL be in Simplified Chinese. Complex indicators (like Moving Averages and Volatility) SHALL include interactive tooltips providing plain-language explanations.

#### Scenario: Indicators reflect data
- **WHEN** valid observations are available
- **THEN** indicator values match definitions documented in implementation (same source series, consistent date ordering).

#### Scenario: Trend and risk conclusions are prominently displayed
- **WHEN** the user views the gold trend page
- **THEN** a highly visible summary section clearly states the current trend direction and market risk level.

#### Scenario: Indicator tooltips are accessible
- **WHEN** the user interacts with the help icon next to a complex indicator
- **THEN** a tooltip appears explaining the indicator's meaning in simple terms.