## ADDED Requirements

### Requirement: Daily Intelligence Briefing
The system SHALL generate a formatted daily report summarizing the most significant AI-native tools discovered, their unbundled atoms, and the top re-bundling opportunities.

#### Scenario: Generating the report
- **WHEN** the daily analysis pipeline completes
- **THEN** the system compiles a markdown or text-based report and delivers it to the configured output channel

#### Scenario: Frontend markdown rendering
- **WHEN** a briefing is displayed on the AI trends page
- **THEN** the frontend SHALL render markdown via `Streamdown` instead of custom regex HTML conversion
- **AND THEN** preserve readable typography for headings, lists, blockquotes, and code blocks

### Requirement: Self-Correction Feedback
The system SHALL accept natural language feedback on its daily briefings to adjust its scraping preferences, denoising strictness, and clustering logic.

#### Scenario: Adjusting parameters based on feedback
- **WHEN** a user provides feedback like "Too many wrapper tools today"
- **THEN** the frontend SHALL persist feedback into `user_feedback`
- **AND THEN** the agent can consume those rows in future iterations to tune prompt behavior
