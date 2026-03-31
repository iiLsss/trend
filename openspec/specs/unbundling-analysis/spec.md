## ADDED Requirements

### Requirement: Atomic Function Extraction
The system SHALL extract specific, atomic core functions and target pain points from the descriptions of AI-native products using an LLM.

#### Scenario: Extracting core functions
- **WHEN** an AI-native product description is analyzed
- **THEN** the system outputs a structured JSON containing an array of `core_functions` and `pain_points`

#### Scenario: LLM output compatibility normalization
- **WHEN** model output returns `core_functions` as string entries instead of structured objects
- **THEN** the system SHALL normalize each string to a valid atomic-function object with fallback fields
- **AND THEN** continue processing without failing the entire product

### Requirement: Disposability Scoring
The system SHALL evaluate and score each product on its "disposability" (whether it is a single-use tool likely to be re-bundled later).

#### Scenario: Scoring disposable tools
- **WHEN** the unbundling analysis is performed
- **THEN** the system calculates a `disposable_score` from 1-10 based on the narrowness of the tool's use case
