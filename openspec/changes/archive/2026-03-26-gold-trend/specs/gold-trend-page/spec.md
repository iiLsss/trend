## ADDED Requirements

### Requirement: Gold trend page route and editorial shell
The system SHALL provide a dedicated page at `/trends/gold` for gold (XAU) trend analysis, using the same serious editorial/newsroom aesthetic as other trend pages (white background, authoritative serif headings, Simplified Chinese UI labels).

#### Scenario: User opens gold trend
- **WHEN** the user visits `/trends/gold`
- **THEN** the page renders with a Chinese headline, introduction, and distinct sections for indicators, chart, and updates.

#### Scenario: Page is responsive
- **WHEN** the user views the page on a narrow viewport
- **THEN** multi-column layouts stack vertically without horizontal overflow.

### Requirement: Real daily gold price data (no mock prices)
The system SHALL obtain gold price history from a **real** external source. The **primary** source SHALL be the **FRED** daily series API using a server-side `FRED_API_KEY`. The system SHALL NOT fabricate or hard-code gold price time series or “latest price” values as a substitute for successful API data.

#### Scenario: Successful FRED fetch
- **WHEN** `FRED_API_KEY` is configured and FRED returns valid observations
- **THEN** the page uses those observations for the chart and for numeric metrics derived from the series.

#### Scenario: Missing or invalid API configuration
- **WHEN** `FRED_API_KEY` is missing or FRED returns an error
- **THEN** the page shows an explicit Simplified Chinese unavailable state for gold numeric content and does not display synthetic gold prices.

### Requirement: Trend indicators from daily series
The page SHALL display macro-style indicators derived only from the fetched daily series (e.g. latest observed level, change over a defined lookback such as 30 and 90 observations, and a volatility or range metric computed from daily returns). Labels and descriptions SHALL be in Simplified Chinese.

#### Scenario: Indicators reflect data
- **WHEN** valid observations are available
- **THEN** indicator values match definitions documented in implementation (same source series, consistent date ordering).

### Requirement: Gold price trend chart
The page SHALL include a line chart of the daily gold price over a defined history window (at least 90 calendar days of data when available from the provider). The chart SHALL use Simplified Chinese axis/legend labels.

#### Scenario: Chart renders with data
- **WHEN** sufficient observations exist
- **THEN** the user sees a line chart of price versus observation date.

### Requirement: Gold-related news or context feed
The page SHOULD include a vertical feed of recent items from configured RSS sources filtered by gold/macro-related keywords (e.g. 黄金, 金价, gold, Fed), styled consistently with other trend pages. This feed SHALL NOT be used to infer numeric gold prices when FRED data is missing.

#### Scenario: RSS failure
- **WHEN** RSS fetching fails
- **THEN** the feed section degrades gracefully (empty or short message) without affecting the truthfulness rule for numeric gold data.

### Requirement: Manual reload query parameter
The page SHALL honor the query parameter `reloaddate=true` by forcing a fresh server fetch of gold data (bypassing stale cache) in line with the existing trends application behavior.

#### Scenario: User forces reload
- **WHEN** the user opens `/trends/gold?reloaddate=true`
- **THEN** the server recomputes content from upstream sources rather than serving an outdated cached result for that navigation.
