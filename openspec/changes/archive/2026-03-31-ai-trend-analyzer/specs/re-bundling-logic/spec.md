## ADDED Requirements

### Requirement: Correlational Clustering
The system SHALL group extracted atomic functions and pain points into logical clusters that could form a more valuable, cohesive product.

#### Scenario: Grouping related tools
- **WHEN** the re-bundling logic is executed
- **THEN** the system generates one or more `Re-bundle Opportunity` records
- **AND THEN** it stores opportunities in `clusters` and `re_bundling_opportunities`

#### Scenario: Embedding cost bypass
- **WHEN** the pipeline runs with `--skip-embedding`
- **THEN** the system SHALL store atomic functions without embedding vectors
- **AND THEN** re-bundling generation SHALL still run using LLM text analysis

### Requirement: Whitespace Detection
The system SHALL identify industries or workflows where multiple unbundled tools exist but no comprehensive re-bundled solution is currently dominant.

#### Scenario: Identifying unserved markets
- **WHEN** analyzing the clusters of unbundled tools
- **THEN** the system highlights clusters that lack a dominant existing platform as "Whitespace Opportunities"

#### Scenario: Re-bundle output compatibility normalization
- **WHEN** model output returns opportunities as plain strings rather than structured objects
- **THEN** the system SHALL normalize those strings into valid opportunity objects with fallback defaults
- **AND THEN** persist normalized opportunities instead of discarding the run
