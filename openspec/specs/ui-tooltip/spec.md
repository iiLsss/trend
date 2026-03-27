## ADDED Requirements

### Requirement: Reusable Tooltip Component
The system SHALL provide a reusable Tooltip component that wraps target elements (like icons or text) and displays explanatory content when triggered.

#### Scenario: PC Hover Interaction
- **WHEN** a user on a device with a pointing device (mouse) hovers over the tooltip trigger
- **THEN** the tooltip content is displayed near the trigger element

#### Scenario: Mobile Touch Interaction
- **WHEN** a user on a touch device taps the tooltip trigger
- **THEN** the tooltip content is displayed and remains visible until the user taps outside the tooltip or triggers another element

#### Scenario: Screen Boundary Collision
- **WHEN** the tooltip is triggered near the edge of the viewport
- **THEN** the tooltip automatically adjusts its position (e.g., flips from top to bottom) to ensure the content remains fully visible within the screen