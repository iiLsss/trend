## Why

The goal is to create a new "trend" project to track and display current global trends. As a starting point, we need a dedicated trend page for the ongoing Middle East conflict. This will provide users with a centralized, accessible, and up-to-date view of the situation. Using Next.js allows us to build a fast, modern web application that can be easily and freely deployed on Vercel.

## What Changes

- Initialize a new Next.js project optimized for Vercel deployment.
- Adopt a serious, editorial "Newsroom" design language inspired by professional journalism (e.g., NYT, Reuters). This means clean white/off-white backgrounds, classic grid layouts, elegant serif typography for headings, and highly restrained use of color (using red only for escalation/danger and blue/green for de-escalation).
- Develop a specific trend page dedicated to the "Middle East Conflict", featuring:
  - **Faction Comparison**: A left-vs-right split layout detailing the opposing sides (e.g., Israel vs. Hamas/Hezbollah/Iran), their objectives, and current status.
  - **Conflict Trend Indicators Dashboard**: Key metrics focusing on the macro status and direction of the conflict (e.g., Escalation Level, Diplomatic/Negotiation Status, Ceasefire Probability, Active Fronts Intensity) to answer "Is it escalating, de-escalating, or ending?" displayed in a clear, bento-grid style.
  - **Data Visualizations**: Interactive charts or maps illustrating conflict trends over time.
  - **Live Updates Timeline**: A vertical feed or discussion-style area showing recent events, diplomatic statements (e.g., negotiations, official denials), and breaking news.
- **Real-time Data Integration**: Implement automated scraping and RSS feed parsing to fetch live conflict data and news updates without manual intervention, utilizing Next.js ISR (Incremental Static Regeneration) for performance.
- **Localization**: All user-facing text, UI elements, and data labels on the web page MUST be displayed in **Simplified Chinese (中文)**.
- Set up the necessary deployment configuration for Vercel.

## Capabilities

### New Capabilities
- `middle-east-conflict-page`: A dedicated page displaying trends, news, or data related to the Middle East conflict.
- `trend-app-core`: The core Next.js application setup, routing, and deployment configuration for Vercel.

### Modified Capabilities
- (None)

## Impact

- **New Repository/Project**: A completely new Next.js project will be initialized.
- **Deployment**: The project will be configured for seamless integration and deployment on Vercel.
- **Frontend Architecture**: Establishes the foundational UI and routing structure for future trend pages.