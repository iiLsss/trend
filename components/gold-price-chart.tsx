"use client";

import type { GoldObservation } from "@/lib/gold-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GoldPriceChartProps {
  data: GoldObservation[];
}

export function GoldPriceChart({ data }: GoldPriceChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="border border-gray-200 p-6 bg-white font-sans">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">
          伦敦下午定盘价走势
        </h3>
        <p className="text-sm text-gray-500 font-serif">
          美元/盎司（FRED: GOLDPMGBD228NLBM），日频
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formatted}
            margin={{ top: 5, right: 8, left: -12, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
            <XAxis
              dataKey="label"
              stroke="#9ca3af"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "0",
                fontSize: "12px",
              }}
              labelFormatter={(_, payload) => {
                const p = payload?.[0]?.payload as GoldObservation | undefined;
                return p?.date ?? "";
              }}
              formatter={(value) => {
                const n = typeof value === "number" ? value : Number(value);
                if (!Number.isFinite(n)) return ["—", "价格"];
                return [
                  `${n.toLocaleString("zh-CN", { maximumFractionDigits: 2 })} 美元/盎司`,
                  "价格",
                ];
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="价格"
              stroke="#b45309"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#b45309", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
