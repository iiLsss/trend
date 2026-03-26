import { ConflictIndicators } from "@/lib/data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Handshake,
  Shield,
  Globe,
} from "lucide-react";

interface ConflictIndicatorsGridProps {
  indicators: ConflictIndicators;
}

export function ConflictIndicatorsGrid({
  indicators,
}: ConflictIndicatorsGridProps) {
  const metrics = [
    {
      label: "升级级别",
      value: `级别 ${indicators.escalationLevel.level}/5`,
      status: indicators.escalationLevel.status,
      trend: indicators.escalationLevel.trend,
      icon: AlertTriangle,
      colorClass: getTrendColorClass(indicators.escalationLevel.trend, true),
    },
    {
      label: "外交进展",
      value: indicators.diplomaticProgress.status,
      subValue: `${indicators.diplomaticProgress.recentEvents} 个近期事件`,
      trend: indicators.diplomaticProgress.trend,
      icon: Handshake,
      colorClass: getTrendColorClass(indicators.diplomaticProgress.trend),
    },
    {
      label: "停火可能性",
      value: `${indicators.ceasefireLikelihood.probability}%`,
      trend: indicators.ceasefireLikelihood.trend,
      icon: Shield,
      colorClass: getTrendColorClass(indicators.ceasefireLikelihood.trend),
    },
    {
      label: "地区影响",
      value: `${indicators.regionalImpact.affectedCountries} 个国家`,
      status: `严重程度: ${indicators.regionalImpact.severity}`,
      trend: indicators.regionalImpact.trend,
      icon: Globe,
      colorClass: getTrendColorClass(indicators.regionalImpact.trend, true),
    },
  ];

  return (
    <section className="mb-12">
      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="serif text-3xl md:text-4xl font-bold mb-2 text-foreground">
          冲突趋势指标
        </h2>
        <p className="text-muted leading-relaxed">
          宏观层面追踪冲突当前状态和发展方向
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}

function getTrendColorClass(trend: "up" | "down" | "stable", inverted = false): string {
  if (inverted) {
    return trend === "up" ? "text-danger" : trend === "down" ? "text-success" : "text-info";
  }
  return trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-info";
}

interface MetricCardProps {
  metric: {
    label: string;
    value: string;
    status?: string;
    subValue?: string;
    trend: "up" | "down" | "stable";
    icon: any;
    colorClass: string;
  };
}

function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.icon;

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };

  const TrendIcon = trendIcons[metric.trend];

  return (
    <div className="editorial-card">
      <div className="flex items-start justify-between mb-4">
        <div className="rounded bg-foreground/5 p-2">
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <TrendIcon className={`h-5 w-5 ${metric.colorClass}`} strokeWidth={2.5} />
      </div>

      <div className="space-y-2">
        <div className="serif text-3xl font-bold text-foreground">{metric.value}</div>
        <div className="text-sm font-medium text-foreground uppercase tracking-wide">
          {metric.label}
        </div>
        {metric.status && (
          <div className="text-xs text-muted pt-2 border-t border-border">
            {metric.status}
          </div>
        )}
        {metric.subValue && (
          <div className="text-xs text-muted pt-2 border-t border-border">
            {metric.subValue}
          </div>
        )}
      </div>
    </div>
  );
}
