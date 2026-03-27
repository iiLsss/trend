## Why

Currently, users navigating to the Middle East conflict and Gold indicators pages cannot easily return to the main trends page without using the browser's back button, which degrades the user experience. Additionally, on the trends page, the two trend modules lack sufficient visual separation (spacing or borders), making them blend together and look like a single module.

## What Changes

- Add a "Back to Trends" (返回专题追踪) button or breadcrumb at the top of the Middle East conflict page.
- Add a "Back to Trends" (返回专题追踪) button or breadcrumb at the top of the Gold indicators page.
- Update the layout and styling of the trends list on the trends page to increase the visual gap or add dividers between the trend modules so they are clearly distinct.

## Capabilities

### New Capabilities

- `navigation-enhancements`: Adds back navigation to trend detail pages and improves list layout spacing on the trends index page.

### Modified Capabilities

- `trends-ui`: Enhances the UI of the trends page to improve visual separation between modules.

## Impact

- `app/trends/page.tsx`: Styling and layout updates for the trends grid/list.
- `app/trends/middle-east-conflict/page.tsx`: Addition of a back navigation component.
- `app/trends/gold/page.tsx`: Addition of a back navigation component.
- Possible creation of a reusable `BackButton` component in `components/`.
