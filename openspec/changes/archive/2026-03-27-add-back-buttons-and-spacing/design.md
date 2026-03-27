## Context

Currently, the trend detail pages (Middle East conflict and Gold indicators) do not have a back button, forcing users to rely on the browser's back button. Additionally, the trends index page displays the two trend modules with insufficient visual separation, making them appear as a single block of content.

## Goals / Non-Goals

**Goals:**
- Implement a reusable back navigation component.
- Add the back navigation component to the Middle East conflict and Gold indicators pages.
- Update the layout/styling of the trends index page to provide clear visual separation between trend modules.

**Non-Goals:**
- Redesigning the entire trends page or the detail pages.
- Adding new trend modules.

## Decisions

- **Back Navigation Component**: Create a simple `BackButton` component in `components/` or inline it if it's simple enough. Given it's just a link back to `/trends`, we can use Next.js `Link` with a left arrow icon (using lucide-react or similar if available, or an SVG).
- **Trends Page Spacing**: The current grid uses `gap-8`. To make the modules distinct, we can add a border, a subtle background color, or increase the gap and add a divider. We will add a border and padding to each article card (`border border-gray-200 rounded-lg p-6`), and possibly a subtle shadow on hover to make them distinct interactive cards.

## Risks / Trade-offs

- **Risk**: The back button might clash with existing page headers.
  - **Mitigation**: Place the back button above the main title with sufficient margin, styled as a subtle breadcrumb or secondary button.
