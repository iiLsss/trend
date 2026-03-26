import type { GoldIndicators } from "@/lib/gold-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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
      label: "最新定盘价（美元/盎司）",
      value: indicators.latestPriceUsd.toLocaleString("zh-CN", {
        maximumFractionDigits: 2,
      }),
      sub: `观测日 ${indicators.latestDate}`,
      trend: null as "up" | "down" | "stable" | null,
    },
    {
      label: "近30个交易日涨跌",
      value: formatPct(indicators.change30ObsPct),
      sub: "相对约30个有效观测点之前",
      trend:
        indicators.change30ObsPct === null
          ? null
          : indicators.change30ObsPct > 0.05
            ? "up"
            : indicators.change30ObsPct < -0.05
              ? "down"
              : "stable",
    },
    {
      label: "近90个交易日涨跌",
      value: formatPct(indicators.change90ObsPct),
      sub: "相对约90个有效观测点之前",
      trend:
        indicators.change90ObsPct === null
          ? null
          : indicators.change90ObsPct > 0.05
            ? "up"
            : indicators.change90ObsPct < -0.05
              ? "down"
              : "stable",
    },
    {
      label: "日收益率波动率（样本）",
      value: formatVol(indicators.dailyReturnVolatility),
      sub: "基于最近至多60个日收益率",
      trend: null as "up" | "down" | "stable" | null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
      {rows.map((row) => (
        <div key={row.label} className="bg-white p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-sans">
              {row.label}
            </h3>
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
  );
}
