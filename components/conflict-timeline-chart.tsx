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
      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="serif text-3xl md:text-4xl font-bold mb-2 text-foreground">
          冲突时间线
        </h2>
        <p className="text-muted leading-relaxed">
          30天关键冲突指标趋势分析
        </p>
      </div>

      <div className="editorial-card">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="date"
              stroke="#737373"
              style={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }}
            />
            <YAxis 
              stroke="#737373" 
              style={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "4px",
                color: "#1a1a1a",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <Legend
              wrapperStyle={{ 
                fontSize: "13px", 
                color: "#737373",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <Line
              type="monotone"
              dataKey="casualties"
              stroke="#991b1b"
              strokeWidth={2.5}
              dot={{ fill: "#991b1b", r: 4 }}
              name="伤亡人数"
            />
            <Line
              type="monotone"
              dataKey="diplomaticEvents"
              stroke="#1e40af"
              strokeWidth={2.5}
              dot={{ fill: "#1e40af", r: 4 }}
              name="外交事件"
            />
            <Line
              type="monotone"
              dataKey="militaryActions"
              stroke="#b45309"
              strokeWidth={2.5}
              dot={{ fill: "#b45309", r: 4 }}
              name="军事行动"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
