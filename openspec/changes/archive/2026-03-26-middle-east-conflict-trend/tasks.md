## 1. Project Initialization

- [x] 1.1 Switch to Node.js v24.10.0 (`nvm use v24.10.0`)
- [x] 1.2 Initialize a new Next.js project with App Router and Tailwind CSS
- [x] 1.3 Install additional UI/Visualization dependencies (e.g., `lucide-react` for icons, `recharts` for charts, `clsx` and `tailwind-merge` for utility classes)
- [x] 1.4 Install data fetching/scraping dependencies (e.g., `rss-parser` for news feeds, `cheerio` for HTML scraping)
- [x] 1.5 Clean up the default boilerplate code, remove dark mode defaults, and set up basic global styles for an Editorial/Newsroom aesthetic (e.g., configure Serif fonts like Merriweather or Playfair Display in Tailwind config)
- [x] 1.6 Configure the project for Vercel deployment (e.g., ensure build scripts are correct)

## 2. Core Layout and Data Layer

- [x] 2.1 Create a responsive main layout component (header, main content area, footer) with a clean, white/off-white newsroom theme
- [x] 2.2 Set up the routing structure for the trends section (`/trends`)
- [x] 2.3 Set up the **Real-time Data Fetching Layer**: Create utility functions (`lib/data.ts`) to fetch live updates via RSS (e.g., using `rss-parser` on Al Jazeera/Reuters feeds) and scrape/fetch indicator data.
- [x] 2.4 Configure **Vercel Cron Job**: Create `vercel.json` and an API route (e.g., `/api/cron`) to trigger a daily data update at 04:00 UTC (07:00 AM Middle East time).
- [x] 2.5 Implement **Manual Reload**: Update the page component to read the `reloaddate=true` search parameter and bypass the Next.js cache to force a fresh data fetch when present.

## 3. Middle East Conflict Page Components

- [x] 3.1 Create the `/trends/middle-east-conflict` page route and hero section (Title, Live Status Badge) with Chinese copy
- [x] 3.2 Implement the **Faction Comparison Component**: A left/right split view showing opposing sides (e.g., 以色列 vs. 哈马斯/真主党/伊朗) with Chinese localization
- [x] 3.3 Implement the **Conflict Trend Indicators Component**: A Tailwind-style Bento Grid displaying macro status metrics (升级级别, 外交状态, 停火概率, etc.) with Chinese localization
- [x] 3.4 Implement the **Data Visualization Component**: Integrate `recharts` to show a timeline or trend chart of the conflict with Chinese labels
- [x] 3.5 Implement the **Live Updates Timeline Component**: A vertical feed showing recent news and events, styled like a modern discussion thread, with Chinese headers and translated/localized data where possible.
- [x] 3.6 Assemble components on the page and ensure the layout is fully responsive (stacking on mobile, side-by-side on desktop)

## 4. Deployment and Verification

- [x] 4.1 Test the build process locally (`npm run build`)
- [x] 4.2 Deploy the application to Vercel
- [x] 4.3 Verify the deployed `/trends/middle-east-conflict` page is accessible, styling is correct, and charts render properly