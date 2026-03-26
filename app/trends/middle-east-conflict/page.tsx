import { Suspense } from "react";
import { RefreshCw } from "lucide-react";
import {
  fetchLiveUpdates,
  fetchConflictIndicators,
  fetchFactionData,
  fetchTimelineData,
} from "@/lib/data";
import { FactionComparison } from "@/components/faction-comparison";
import { ConflictIndicatorsGrid } from "@/components/conflict-indicators";
import { ConflictTimelineChart } from "@/components/conflict-timeline-chart";
import { LiveUpdatesTimeline } from "@/components/live-updates-timeline";
import { RefreshButton } from "@/components/refresh-button";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function MiddleEastConflictContent({
  searchParams,
}: {
  searchParams: Promise<{ reloaddate?: string }>;
}) {
  const params = await searchParams;
  const forceReload = params.reloaddate === "true";

  const [liveUpdates, indicators, factions, timelineData] = await Promise.all([
    fetchLiveUpdates(),
    fetchConflictIndicators(),
    fetchFactionData(),
    fetchTimelineData(),
  ]);

  return (
    <div className="py-6">
      {/* Article Header */}
      <header className="mb-12 pb-8 border-heavy-bottom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-900 pb-1 font-sans">
                地缘政治
              </span>
              <span className="flex items-center text-xs font-bold text-red-700 uppercase tracking-widest font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-red-700 animate-pulse mr-1.5" />
                实时追踪
              </span>
            </div>
            <h1 className="serif text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-4">
              中东冲突局势评估
            </h1>
            <p className="serif text-xl text-gray-600 leading-relaxed">
              基于最新数据的宏观趋势分析，追踪地区冲突的升级、外交进展及潜在的停火可能性。
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-gray-200 gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-gray-900 uppercase tracking-wider font-sans">
              全球趋势编辑部
            </div>
            <div className="text-sm text-gray-500 font-sans">
              最后更新: {new Date(indicators.lastUpdated).toLocaleString("zh-CN", {
                month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>
          <RefreshButton />
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Data & Analysis (8 cols) */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h2 className="serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              宏观趋势指标
            </h2>
            <ConflictIndicatorsGrid indicators={indicators} />
          </section>

          <section>
            <h2 className="serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              冲突强度时间线
            </h2>
            <ConflictTimelineChart data={timelineData} />
          </section>

          <section>
            <h2 className="serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              对峙阵容与战略目标
            </h2>
            <FactionComparison factions={factions} />
          </section>
        </div>

        {/* Right Column: Live Feed (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="serif text-xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 flex items-center justify-between">
              <span>最新动态</span>
              <span className="text-xs font-normal text-gray-500 font-sans tracking-widest">LIVE</span>
            </h2>
            <LiveUpdatesTimeline updates={liveUpdates} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MiddleEastConflictPage({
  searchParams,
}: {
  searchParams: Promise<{ reloaddate?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 uppercase tracking-widest font-sans">加载数据中...</p>
        </div>
      }
    >
      <MiddleEastConflictContent searchParams={searchParams} />
    </Suspense>
  );
}