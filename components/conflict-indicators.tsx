import { ConflictIndicators } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ConflictIndicatorsGridProps {
  indicators: ConflictIndicators;
}

export function ConflictIndicatorsGrid({
  indicators,
}: ConflictIndicatorsGridProps) {
  const metrics = [
    {
      label: "冲突升级级别",
      value: `${indicators.escalationLevel.level} / 5`,
      status: indicators.escalationLevel.status,
      trend: indicators.escalationLevel.trend,
      desc: "基于军事行动强度和范围的综合评估",
      isDanger: indicators.escalationLevel.trend === "up",
    },
    {
      label: "外交进展状态",
      value: indicators.diplomaticProgress.status,
      status: `近期事件: ${indicators.diplomaticProgress.recentEvents}`,
      trend: indicators.diplomaticProgress.trend,
      desc: "多边谈判与国际调停的活跃程度",
      isDanger: indicators.diplomaticProgress.trend === "down",
    },
    {
      label: "停火达成概率",
      value: `${indicators.ceasefireLikelihood.probability}%`,
      status: "预测模型",
      trend: indicators.ceasefireLikelihood.trend,
      desc: "基于当前各方立场和外部压力的评估",
      isDanger: indicators.ceasefireLikelihood.trend === "down",
    },
    {
      label: "地区外溢影响",
      value: `${indicators.regionalImpact.affectedCountries} 国`,
      status: `严重程度: ${indicators.regionalImpact.severity}`,
      trend: indicators.regionalImpact.trend,
      desc: "受冲突直接或间接波及的周边国家数量",
      isDanger: indicators.regionalImpact.trend === "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

function MetricCard({ metric }: { metric: any }) {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };

  const TrendIcon = trendIcons[metric.trend as keyof typeof trendIcons];

  return (
    <div className="bg-white p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-sans">
          {metric.label}
        </h3>
        <div className={`flex items-center space-x-1 text-xs font-bold uppercase tracking-wider font-sans ${metric.isDanger ? 'text-red-700' : 'text-gray-500'}`}>
          <TrendIcon className="h-3 w-3" strokeWidth={3} />
          <span>{metric.trend === 'up' ? '上升' : metric.trend === 'down' ? '下降' : '持平'}</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline space-x-2 mb-1">
          <span className="serif text-4xl font-black text-gray-900 tracking-tight">
            {metric.value}
          </span>
        </div>
        <div className="text-sm font-medium text-gray-900 mb-2 font-sans">
          {metric.status}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed font-serif">
          {metric.desc}
        </p>
      </div>
    </div>
  );
}