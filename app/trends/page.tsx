import Link from "next/link";

export default function TrendsPage() {
  const trends = [
    {
      id: "middle-east-conflict",
      title: "中东冲突深度追踪",
      description: "通过实时更新、阵营对比和关键指标，全面解析中东地区持续冲突的宏观走向与地缘政治影响。",
      status: "live" as const,
      lastUpdate: "今日",
      category: "地缘政治",
      author: "编辑部",
    },
    {
      id: "gold",
      title: "黄金趋势",
      description:
        "基于 FRED 伦敦下午金价定盘日序列，展示中长期价格水平、涨跌与波动，并聚合宏观与金价相关资讯。",
      status: "daily" as const,
      lastUpdate: "日更",
      category: "大宗商品",
      author: "编辑部",
    },
  ];

  return (
    <div className="py-8">
      <div className="mb-12 border-heavy-bottom pb-6">
        <h1 className="serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">专题追踪</h1>
        <p className="text-lg text-gray-600 font-serif max-w-3xl">
          深入报道和持续追踪全球最具影响力的事件。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trends.map((trend) => (
          <article key={trend.id} className="group flex flex-col h-full font-sans border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-900 pb-1">
                {trend.category}
              </span>
              {trend.status === "live" && (
                <span className="flex items-center text-xs font-bold text-red-700 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-700 animate-pulse mr-1.5" />
                  实时更新
                </span>
              )}
              {trend.status === "daily" && (
                <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">
                  日频数据
                </span>
              )}
            </div>

            <Link href={`/trends/${trend.id}`} className="flex-1">
              <h2 className="serif text-2xl font-bold text-gray-900 mb-3 group-hover:underline decoration-2 underline-offset-4">
                {trend.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed font-serif mb-4">
                {trend.description}
              </p>
            </Link>

            <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span className="uppercase tracking-widest font-bold">{trend.author}</span>
              <span>更新于 {trend.lastUpdate}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}