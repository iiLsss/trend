## Why

The current styling of the gold trend page indicators (green and orange boxes) feels abrupt and inconsistent with the rest of the application's editorial aesthetic. We need to update it to match the cleaner, more refined style used on the Middle East conflict page (white boxes with thin borders and distinct typography).

## What Changes

- Update the styling of the trend and risk indicator cards on the `/trends/gold` page.
- Remove the solid background colors (light green/orange) and replace them with a white background.
- Add thin borders to the indicator cards matching the Middle East conflict page style.
- Update text colors and typography to match the Middle East conflict page (e.g., dark text for labels, specific colors for values like red/black).

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `gold-trend-page`: Update the visual styling requirements for the trend indicators to match the Middle East conflict page aesthetic.

## Impact

- `app/trends/gold/page.tsx` (or the relevant component rendering the gold trend indicators)
- Tailwind CSS classes used for styling these specific indicator cards.
