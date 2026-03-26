import Link from "next/link";
import { TrendingUp, Globe, MapPin, ChevronRight } from "lucide-react";

export default function TrendsPage() {
  const trends = [
    {
      id: "middle-east-conflict",
      title: "中东冲突",
      description: "通过实时更新、阵营对比和关键指标追踪中东地区持续冲突",
      icon: MapPin,
      status: "live",
      lastUpdate: "今天",
      category: "地缘政治",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 bg-background">
      <div className="mb-12 border-b-2 border-foreground pb-6">
        <div className="flex items-center space-x-3 mb-3">
          <TrendingUp className="h-8 w-8 text-foreground" />
          <h1 className="serif text-4xl md:text-5xl font-bold">全球趋势</h1>
        </div>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
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
              className="editorial-card group relative"
            >
              <div className="absolute top-4 right-4">
                {trend.status === "live" && (
                  <span className="flex items-center space-x-1.5 rounded px-2 py-1 text-xs font-medium bg-red-50 text-danger border border-danger/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
                    <span className="uppercase tracking-wide">实时</span>
                  </span>
                )}
              </div>

              <div className="mb-4">
                <Icon className="h-10 w-10 text-foreground group-hover:text-danger transition-colors" />
              </div>

              <div className="mb-2">
                <span className="text-xs text-muted uppercase tracking-wider">
                  {trend.category}
                </span>
              </div>

              <h3 className="serif text-2xl font-bold mb-3 text-foreground group-hover:text-danger transition-colors">
                {trend.title}
              </h3>
              
              <p className="text-sm text-muted leading-relaxed mb-4">
                {trend.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center text-xs text-muted">
                  <Globe className="h-3 w-3 mr-1" />
                  <span>更新于 {trend.lastUpdate}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
