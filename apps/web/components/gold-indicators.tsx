import type { GoldIndicators } from "@/lib/gold-data";
import { TrendingUp, TrendingDown, Minus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GoldIndicatorsGridProps {
  indicators: GoldIndicators;
}

function formatPct(p: number | null): string {
  if (p === null) return "—";
  const sign = p > 0 ? "+" : "";
  return `${sign}${p.toFixed(2)}%`;
}

function formatVol(v: number | null): string {
  if (v === null) return "—";
  return `${(v * 100).toFixed(2)}%`;
}

export function GoldIndicatorsGrid({ indicators }: GoldIndicatorsGridProps) {
  const rows = [
    {
      label: "最新价格（美元/盎司）",
      value: indicators.latestPriceUsd.toLocaleString("zh-CN", {
        maximumFractionDigits: 2,
      }),
      sub: `观测日 ${indicators.latestDate}`,
      trend: null as "up" | "down" | "stable" | null,
    },
    {
      label: "20日均线 (短期)",
      value: indicators.sma20
        ? indicators.sma20.toLocaleString("zh-CN", { maximumFractionDigits: 2 })
        : "—",
      sub: "近20个交易日平均价格",
      trend: null as "up" | "down" | "stable" | null,
      tooltip: "代表过去一个月左右的平均买入成本。如果当前价格高于它，说明短期内大家都在赚钱，趋势向好。",
    },
    {
      label: "60日均线 (中期)",
      value: indicators.sma60
        ? indicators.sma60.toLocaleString("zh-CN", { maximumFractionDigits: 2 })
        : "—",
      sub: "近60个交易日平均价格",
      trend: null as "up" | "down" | "stable" | null,
      tooltip: "代表过去三个月（一个季度）的平均买入成本。用来判断中长期的基本方向。",
    },
    {
      label: "日收益率波动率（样本）",
      value: formatVol(indicators.dailyReturnVolatility),
      sub: "基于最近至多60个日收益率",
      trend: null as "up" | "down" | "stable" | null,
      tooltip: "类似股市的恐慌指数。数值越大，说明近期金价上蹿下跳越厉害，风险越高；数值越小，说明价格走势越平稳。",
    },
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
        {rows.map((row) => (
          <div key={row.label} className="bg-white p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-1.5">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-sans">
                  {row.label}
                </h3>
                {row.tooltip && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span className="sr-only">解释说明</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{row.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              {row.trend && (
                <span
                  className={`flex items-center space-x-1 text-xs font-bold uppercase tracking-wider font-sans ${
                    row.trend === "up"
                      ? "text-red-700"
                      : row.trend === "down"
                        ? "text-green-700"
                        : "text-gray-500"
                  }`}
                >
                  {row.trend === "up" && <TrendingUp className="h-3 w-3" strokeWidth={3} />}
                  {row.trend === "down" && <TrendingDown className="h-3 w-3" strokeWidth={3} />}
                  {row.trend === "stable" && <Minus className="h-3 w-3" strokeWidth={3} />}
                  <span>
                    {row.trend === "up"
                      ? "上行"
                      : row.trend === "down"
                        ? "下行"
                        : "持平"}
                  </span>
                </span>
              )}
            </div>
            <div className="mt-auto">
              <div className="serif text-3xl font-black text-gray-900 tracking-tight">
                {row.value}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-serif leading-relaxed">
                {row.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
