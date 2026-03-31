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
    <div className="border border-gray-200 p-6 bg-white font-sans">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">
          30日趋势分析
        </h3>
        <p className="text-sm text-gray-500 font-serif">
          军事行动与外交事件的频率对比
        </p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#9ca3af" 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif"
              }}
              itemStyle={{ color: '#111827', fontWeight: 500 }}
            />
            <Legend
              wrapperStyle={{ 
                fontSize: "12px", 
                paddingTop: "20px",
              }}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="militaryActions"
              name="军事行动"
              stroke="#b91c1c"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#b91c1c", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="diplomaticEvents"
              name="外交事件"
              stroke="#1d4ed8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#1d4ed8", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="casualties"
              name="伤亡估算"
              stroke="#9ca3af"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 4, fill: "#9ca3af", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}