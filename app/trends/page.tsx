import Link from "next/link";
import { TrendingUp, Globe, MapPin } from "lucide-react";

export default function TrendsPage() {
  const trends = [
    {
      id: "middle-east-conflict",
      title: "中东冲突",
      description: "通过实时更新、阵营对比和关键指标追踪中东地区持续冲突",
      icon: MapPin,
      status: "live",
      lastUpdate: "今天",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-8 w-8 text-accent-blue" />
          <h1 className="text-4xl font-bold">全球趋势</h1>
        </div>
        <p className="text-lg text-foreground/60 max-w-2xl">
          探索当前全球趋势，包含实时数据、可视化和深度洞察
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
                    <span>实时</span>
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
                <span>更新于 {trend.lastUpdate}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
