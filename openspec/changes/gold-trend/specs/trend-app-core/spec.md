## ADDED Requirements

### Requirement: Trends hub lists published topics
The system SHALL present on `/trends` a list of available trend topics. Each entry SHALL include a Simplified Chinese title, a short description, and a link to the topic route.

#### Scenario: Hub includes gold trend
- **WHEN** the user visits `/trends`
- **THEN** they see an entry for the gold trend topic linking to `/trends/gold`.

#### Scenario: Hub includes existing topics
- **WHEN** the user visits `/trends`
- **THEN** previously published trend topics (such as the Middle East conflict topic) remain listed alongside new topics.
