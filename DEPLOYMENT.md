# Deployment Guide

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Git repository (already initialized)

## Deployment Steps

### 1. Push to Git Repository

First, create a repository on GitHub, GitLab, or Bitbucket, then push your code:

```bash
# Add your remote repository
git remote add origin <your-repository-url>

# Push to main/master branch
git push -u origin master
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will automatically detect Next.js and configure the build settings

### 3. Configure Environment Variables

In the Vercel project settings, add the following environment variables:

- **`CRON_SECRET`**: Generate a secure random string (e.g., run `openssl rand -base64 32` in terminal). Used to authenticate the daily cron job that revalidates cached pages.

- **`FRED_API_KEY`**: Required for the **黄金趋势** page (`/trends/gold`). Register for a free key at [FRED API Keys](https://fred.stlouisfed.org/docs/api/api_key.html). Without this key, the app shows a data-unavailable state for gold prices (no mock numbers).

See `.env.example` for a full list of placeholders (copy to **`.env.local`** for local development—Next.js does not load `.env.example` at runtime).

### Local development (FRED key)

1. Copy `.env.example` to `.env.local` in the project root (or create `.env.local` manually).
2. Set `FRED_API_KEY=...` with your real key from [FRED](https://fred.stlouisfed.org/docs/api/api_key.html).
3. Restart `npm run dev`. Visiting `/trends/gold` should then load live series data.

**Do not commit real keys.** `.env.local` is gitignored; keep secrets there or in Vercel env vars only.

### 4. Deploy

Click "Deploy" and Vercel will build and deploy your application.

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL (e.g., `https://your-project.vercel.app`)
2. Navigate to `/trends/middle-east-conflict` to view the conflict tracker
3. Test the refresh button to manually trigger data updates

### Cron Job Verification

The cron job is configured to run daily at 04:00 UTC (07:00 AM Middle East time). You can verify it's working by:

1. Checking the Vercel deployment logs the day after deployment
2. Looking for cron execution logs in the "Functions" section of your Vercel dashboard

## Manual Data Updates

To force a data refresh outside the scheduled cron job:

1. Visit: `https://your-project.vercel.app/trends/middle-east-conflict?reloaddate=true`
2. Or click the "Refresh" button on the page

## Troubleshooting

### RSS Feeds Not Loading

If the live updates aren't appearing:
- Check the RSS feed URLs are still valid
- Verify the feeds are accessible from Vercel's servers
- Check the deployment logs for any fetch errors

### Build Failures

If the build fails on Vercel:
- Ensure all dependencies are listed in `package.json`
- Check the build logs for specific errors
- Verify Node.js version compatibility (using v24.10.0)

## Continuous Deployment

Vercel automatically deploys your application when you push changes to your Git repository:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will build and deploy the new version automatically.
