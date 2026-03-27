## Context

The gold trend page currently uses solid background colors (light green and orange) for its main trend and risk indicators. The user requested updating these to match the cleaner, editorial style used on the Middle East conflict page, which features white backgrounds, thin borders, and specific typography (e.g., red/black text).

## Goals / Non-Goals

**Goals:**
- Update the CSS classes for the gold trend indicators to match the Middle East conflict page style.
- Ensure the new styling is responsive and consistent with the overall application aesthetic.

**Non-Goals:**
- Changing the underlying data logic or the text content of the indicators.
- Modifying other sections of the gold trend page beyond the top-level indicators.

## Decisions

- **CSS Updates**: We will replace the existing background color classes (e.g., `bg-green-50`, `bg-orange-50`) with a white background (`bg-white`), add a thin border (`border`, `border-gray-200` or similar depending on the exact Middle East conflict page implementation), and update text colors to match the target style.
- **Component Reusability**: If the Middle East conflict page uses a reusable component for these indicators, we should consider adopting it for the gold trend page. If not, we will replicate the Tailwind classes.

## Risks / Trade-offs

- **Risk**: The new styling might not contrast well if the page background is also white.
  - **Mitigation**: Ensure the border color provides sufficient contrast and matches the Middle East conflict page exactly.
