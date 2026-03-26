"use client";

import { TimelineDataPoint } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ConflictTimelineChartProps {
  data: TimelineDataPoint[];
}

export function ConflictTimelineChart({ data }: ConflictTimelineChartProps) {
  const formattedData = data.map((point) => ({
    ...point,
    date: new Date(point.date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          冲突时间线
        </h2>
        <p className="text-foreground/60">
          30天关键冲突指标趋势分析
        </p>
      </div>

      <div className="bento-card">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="date"
              stroke="#71717a"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#71717a" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#ededed",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "14px", color: "#a1a1aa" }}
            />
            <Line
              type="monotone"
              dataKey="casualties"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", r: 3 }}
              name="伤亡人数"
            />
            <Line
              type="monotone"
              dataKey="diplomaticEvents"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ fill: "#a855f7", r: 3 }}
              name="外交事件"
            />
            <Line
              type="monotone"
              dataKey="militaryActions"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 3 }}
              name="军事行动"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
