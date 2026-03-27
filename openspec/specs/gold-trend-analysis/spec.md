## ADDED Requirements

### Requirement: Fetch and process daily gold price
The system SHALL fetch the daily gold price index (`NASDAQQGLDI`) from the FRED API and process it to calculate 20-day and 60-day Simple Moving Averages (SMA).

#### Scenario: Successful data fetch and SMA calculation
- **WHEN** the FRED API successfully returns `NASDAQQGLDI` observations
- **THEN** the system calculates the 20-day and 60-day SMA for the most recent data point

### Requirement: Determine price trend
The system SHALL determine the current price trend based on the relationship between the current price, the 20-day SMA, and the 60-day SMA.

#### Scenario: Strong upward trend
- **WHEN** current price > 20-day SMA AND 20-day SMA > 60-day SMA
- **THEN** the trend is classified as "强势上行" (Strong Upward)

#### Scenario: Weak downward trend
- **WHEN** current price < 20-day SMA AND 20-day SMA < 60-day SMA
- **THEN** the trend is classified as "弱势下行" (Weak Downward)

#### Scenario: Oscillating trend
- **WHEN** the conditions for strong upward or weak downward are not met
- **THEN** the trend is classified as "震荡/转折" (Oscillating/Turning)

### Requirement: Fetch and process gold volatility
The system SHALL fetch the CBOE Gold ETF Volatility Index (`GVZCLS`) from the FRED API to determine the current market risk level.

#### Scenario: Low risk
- **WHEN** the latest `GVZCLS` value is less than 15
- **THEN** the risk level is classified as "低风险 (平稳)" (Low Risk - Stable)

#### Scenario: Medium risk
- **WHEN** the latest `GVZCLS` value is between 15 (inclusive) and 25 (exclusive)
- **THEN** the risk level is classified as "中等风险 (活跃)" (Medium Risk - Active)

#### Scenario: High risk
- **WHEN** the latest `GVZCLS` value is greater than or equal to 25
- **THEN** the risk level is classified as "高风险 (剧烈波动)" (High Risk - Highly Volatile)