import Link from "next/link";
import { TrendingUp, Globe, MapPin } from "lucide-react";

export default function TrendsPage() {
  const trends = [
    {
      id: "middle-east-conflict",
      title: "Middle East Conflict",
      description: "Track the ongoing conflict in the Middle East with real-time updates, faction comparisons, and key indicators.",
      icon: MapPin,
      status: "live",
      lastUpdate: "Today",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-8 w-8 text-accent-blue" />
          <h1 className="text-4xl font-bold">Global Trends</h1>
        </div>
        <p className="text-lg text-foreground/60 max-w-2xl">
          Explore current global trends with real-time data, visualizations, and insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trends.map((trend) => {
          const Icon = trend.icon;
          return (
            <Link
              key={trend.id}
              href={`/trends/${trend.id}`}
              className="bento-card group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                {trend.status === "live" && (
                  <span className="flex items-center space-x-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Live</span>
                  </span>
                )}
              </div>

              <div className="mb-4">
                <Icon className="h-12 w-12 text-accent-blue group-hover:text-accent-purple transition-colors" />
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                {trend.title}
              </h3>
              <p className="text-sm text-foreground/60 mb-4">
                {trend.description}
              </p>

              <div className="flex items-center text-xs text-foreground/40">
                <Globe className="h-3 w-3 mr-1" />
                <span>Updated {trend.lastUpdate}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
