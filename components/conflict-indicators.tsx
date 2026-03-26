import { ConflictIndicators } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Activity,
  MapPin,
  MessageSquare,
} from "lucide-react";

interface ConflictIndicatorsGridProps {
  indicators: ConflictIndicators;
}

export function ConflictIndicatorsGrid({
  indicators,
}: ConflictIndicatorsGridProps) {
  const metrics = [
    {
      label: "Casualties",
      value: formatNumber(indicators.casualties.total),
      trend: indicators.casualties.trend,
      icon: Activity,
      color: "red",
    },
    {
      label: "Displaced Persons",
      value: formatNumber(indicators.displacedPersons.total),
      trend: indicators.displacedPersons.trend,
      icon: Users,
      color: "orange",
    },
    {
      label: "Active Fronts",
      value: indicators.activeFronts.toString(),
      trend: "stable" as const,
      icon: MapPin,
      color: "blue",
    },
    {
      label: "Diplomatic Events",
      value: indicators.diplomaticEvents.toString(),
      trend: "stable" as const,
      icon: MessageSquare,
      color: "purple",
    },
  ];

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Conflict Indicators
        </h2>
        <p className="text-foreground/60">
          Key metrics tracking the current situation
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
          <div className="text-3xl font-bold">{metric.value}</div>
          <div className="text-sm text-foreground/60">{metric.label}</div>
        </div>
      </div>
    </div>
  );
}
