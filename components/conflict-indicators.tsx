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
      color: "red",
    },
    {
      label: "外交进展",
      value: indicators.diplomaticProgress.status,
      subValue: `${indicators.diplomaticProgress.recentEvents} 个近期事件`,
      trend: indicators.diplomaticProgress.trend,
      icon: Handshake,
      color: "blue",
    },
    {
      label: "停火可能性",
      value: `${indicators.ceasefireLikelihood.probability}%`,
      trend: indicators.ceasefireLikelihood.trend,
      icon: Shield,
      color: "green",
    },
    {
      label: "地区影响",
      value: `${indicators.regionalImpact.affectedCountries} 个国家`,
      status: `严重程度: ${indicators.regionalImpact.severity}`,
      trend: indicators.regionalImpact.trend,
      icon: Globe,
      color: "orange",
    },
  ];

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          冲突趋势指标
        </h2>
        <p className="text-foreground/60">
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

interface MetricCardProps {
  metric: {
    label: string;
    value: string;
    status?: string;
    subValue?: string;
    trend: "up" | "down" | "stable";
    icon: any;
    color: string;
  };
}

function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.icon;

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };

  const trendColors = {
    up: "text-red-400",
    down: "text-green-400",
    stable: "text-gray-400",
  };

  const TrendIcon = trendIcons[metric.trend];

  return (
    <div className="bento-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-blue/5 to-transparent rounded-full -mr-16 -mt-16" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="rounded-lg bg-accent-blue/10 p-2">
            <Icon className="h-5 w-5 text-accent-blue" />
          </div>
          <TrendIcon className={`h-4 w-4 ${trendColors[metric.trend]}`} />
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className="text-sm text-foreground/60">{metric.label}</div>
          {metric.status && (
            <div className="text-xs text-foreground/40 mt-1">{metric.status}</div>
          )}
          {metric.subValue && (
            <div className="text-xs text-foreground/40 mt-1">{metric.subValue}</div>
          )}
        </div>
      </div>
    </div>
  );
}
