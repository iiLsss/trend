## Context

We are creating a new Next.js application to track global trends, starting with a dedicated page for the Middle East conflict. The project needs to be modern, fast, and easily deployable on Vercel for free access. This will serve as the foundation for a larger trend-tracking platform.

## Goals / Non-Goals

**Goals:**
- Initialize a Next.js project using the App Router.
- Build a responsive layout with a clean UI (using Tailwind CSS).
- Create a dedicated route and page for the Middle East conflict (`/trends/middle-east-conflict`).
- Ensure the application is ready for zero-configuration deployment on Vercel.

**Non-Goals:**
- Complex backend infrastructure or databases (initially, data can be static or fetched from public APIs).
- User authentication or personalized feeds.
- Real-time WebSocket updates for this initial phase.

## Decisions

- **Node.js Version**: v24.10.0. We will use `nvm use v24.10.0` to ensure consistency across environments.
- **Framework**: Next.js (App Router). It provides excellent performance, SEO capabilities, and seamless integration with Vercel.
- **Styling & UI Paradigm**: Tailwind CSS. The design will heavily borrow from the **Tailwind CSS official website aesthetic**—favoring a dark mode default, bento-box grid layouts for data presentation, subtle border gradients, glassmorphism, and high-quality typography (e.g., Inter font). This ensures the serious topic is presented in a modern, objective, and highly readable "dashboard" format.
- **Data Visualization**: We will use a lightweight charting library like `recharts` or `chart.js` (React wrapper) to render conflict indicators and timeline trends, as they integrate perfectly with Tailwind and React.
- **Deployment**: Vercel. It offers a generous free tier and native support for Next.js features.
- **Data Fetching & Sourcing Strategy**: 
  - **Real-time Scraping & API Integration**: Instead of relying on manual data entry, we will directly implement automated data fetching. 
  - **Live Updates Timeline**: We will use `rss-parser` to automatically fetch breaking news and statements from reliable global and regional news RSS feeds (e.g., Al Jazeera, Reuters, BBC).
  - **Indicators & Data**: We will utilize Next.js Server Components combined with `cheerio` (for HTML scraping) or public APIs to fetch live conflict indicators where available.
  - **Caching Strategy (Daily Cron & On-Demand)**: Instead of constant ISR polling, we will use a **Daily Cron Job** to fetch and cache the data. 
    - **Timing**: The cron job will run at **04:00 UTC** (which is 07:00 AM in the Middle East / UTC+3). This is the optimal time to capture the previous night's events and prepare the dashboard for the morning news cycle.
    - **Manual Reload**: We will implement a query parameter `?reloaddate=true` in the URL. When accessed, it will bypass the static cache, force a fresh data fetch, and re-render the page on demand.

## Risks / Trade-offs

- **Risk**: External RSS feeds or scraped websites might change their structure or go down, breaking the data pipeline.
  - **Mitigation**: Implement robust error handling (try/catch) in the data fetching layer. If scraping fails, the UI should gracefully degrade (e.g., show the last successfully cached data or a "Data temporarily unavailable" state) without crashing the page.
- **Risk**: Vercel free tier limits (Cron jobs are limited to 1 per day on the Hobby tier).
  - **Mitigation**: Our strategy perfectly aligns with the Vercel Hobby tier limits by using exactly 1 cron job per day at 04:00 UTC, while allowing manual overrides via the query parameter if urgent updates are needed.