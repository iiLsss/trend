## ADDED Requirements

### Requirement: Middle East Conflict Trend Page
The system SHALL provide a dedicated page at `/trends/middle-east-conflict` to display information related to the Middle East conflict, utilizing a modern, dark-themed, dashboard-like UI.

#### Scenario: User navigates to the trend page
- **WHEN** the user visits `/trends/middle-east-conflict`
- **THEN** the page renders successfully with relevant content, utilizing Tailwind CSS official site design patterns (bento grids, subtle glows).

#### Scenario: Page is responsive
- **WHEN** the user views the page on a mobile device
- **THEN** the layout adapts to fit the screen size appropriately, stacking side-by-side elements vertically.

### Requirement: Faction Comparison Module
The page SHALL include a visual layout comparing the primary opposing factions in the conflict.

#### Scenario: Viewing faction details
- **WHEN** the user views the faction section
- **THEN** they see a clear left-vs-right (or side-by-side) layout detailing the opposing sides, their current status, and key figures or objectives.

### Requirement: Conflict Indicators Dashboard
The page SHALL display key conflict metrics using a bento-box grid layout.

#### Scenario: Viewing key metrics
- **WHEN** the user scrolls to the indicators section
- **THEN** they see distinct, styled cards (bento grid) showing macro conflict trend indicators like Escalation Status, Diplomatic Progress, Ceasefire Likelihood, and Regional Impact.

### Requirement: Data Visualizations
The page SHALL include visual charts or graphs to represent conflict trends over time.

#### Scenario: Viewing trend charts
- **WHEN** the user views the visualization section
- **THEN** they see an interactive or clearly rendered chart (e.g., line chart of events over time) built with a charting library.

### Requirement: Live Updates Timeline
The page SHALL include a dynamic-looking feed or timeline area to display recent events, statements, and developments.

#### Scenario: Viewing recent updates
- **WHEN** the user scrolls to the live updates section
- **THEN** they see a chronologically ordered list of recent events (e.g., "Trump statement on negotiations", "Iran official denial"), styled similarly to a modern discussion thread or news feed.

### Requirement: Localization (Chinese)
The system SHALL display all user-facing content (UI labels, headers, data descriptions) in Simplified Chinese.

#### Scenario: Viewing the page content
- **WHEN** the user views any section of the page
- **THEN** all text, including "对峙阵容" (Faction Comparison), "冲突趋势指标" (Conflict Trend Indicators), and "实时动态" (Live Updates), is displayed in Chinese.

### Requirement: Real-Time Data Integration
The system SHALL fetch live data from external sources to populate the page content automatically.

#### Scenario: Scheduled background data fetching
- **WHEN** the daily cron job triggers (e.g., at 04:00 UTC)
- **THEN** the system fetches the latest data from external APIs or RSS feeds and updates the static cache.

#### Scenario: Manual on-demand data reload
- **WHEN** the user appends `?reloaddate=true` to the page URL
- **THEN** the system bypasses the cached data, forces a fresh fetch from external sources, and displays the most up-to-date information.