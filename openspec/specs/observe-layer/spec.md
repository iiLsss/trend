## ADDED Requirements

### Requirement: Data Ingestion Pipeline
The system SHALL fetch new product data from configured sources (RSS feeds, GitHub Trending, Product Hunt RSS) and store normalized records in `raw_sources`.

#### Scenario: Scheduled data fetching
- **WHEN** the scheduled cron job triggers
- **THEN** the system fetches latest entries from configured sources and normalizes each item as `{source,title,description,url}`
- **AND THEN** the system upserts entries into `raw_sources` using `url` as dedupe key

#### Scenario: Resume from database without re-scraping
- **WHEN** the pipeline runs with `--resume-from-db`
- **THEN** the system SHALL load recent entries from `raw_sources` instead of fetching new remote data
- **AND THEN** the system SHALL continue downstream stages from those loaded rows

### Requirement: LLM Denoising Filter
The system SHALL process all raw data entries through an LLM to determine if the product is genuinely AI-native or just "AI Washing".

#### Scenario: Filtering out AI Washing
- **WHEN** a raw data entry is processed by the LLM filter
- **THEN** the system assigns an `is_ai_native` boolean flag and an `innovation_score`
- **AND THEN** only entries with `is_ai_native=true` are passed to the next stage

#### Scenario: Cost-controlled execution
- **WHEN** the pipeline runs with `--limit N`
- **THEN** the system SHALL process only the most recent `N` raw entries
