# Global Trends Tracker

A Next.js application for tracking and analyzing global trends in real-time.

## Features

- Modern, dark-themed UI inspired by Tailwind CSS design patterns
- Real-time data fetching via RSS feeds and web scraping
- Interactive data visualizations with Recharts
- Responsive design optimized for all devices
- Deployed on Vercel with automatic daily updates

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React (icons)
- **Data Visualization**: Recharts
- **Data Fetching**: RSS Parser, Cheerio
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js v24.10.0
- npm or yarn

### Installation

```bash
# Switch to the correct Node.js version
nvm use v24.10.0

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Deploy with zero configuration

### Environment Variables

No environment variables are required for the basic setup.

## Project Structure

```
trend/
├── app/              # Next.js App Router pages and layouts
├── components/       # React components
├── lib/             # Utility functions and data fetching
├── public/          # Static assets
└── openspec/        # OpenSpec change management
```

## License

MIT
