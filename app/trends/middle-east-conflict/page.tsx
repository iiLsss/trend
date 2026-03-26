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
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              中东冲突
            </h1>
            <p className="text-lg text-foreground/60">
              实时追踪和分析当前局势
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 border border-green-500/20">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>实时</span>
            </div>

            <RefreshButton />
          </div>
        </div>

        <div className="text-sm text-foreground/40">
          最后更新: {new Date(indicators.lastUpdated).toLocaleString("zh-CN")}
          {forceReload && " (强制刷新)"}
        </div>
      </div>

      <div className="space-y-8">
        <ConflictIndicatorsGrid indicators={indicators} />
        <ConflictTimelineChart data={timelineData} />
        <FactionComparison factions={factions} />
        <LiveUpdatesTimeline updates={liveUpdates} />
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
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-accent-blue mx-auto mb-4" />
              <p className="text-foreground/60">加载冲突数据中...</p>
            </div>
          </div>
        </div>
      }
    >
      <MiddleEastConflictContent searchParams={searchParams} />
    </Suspense>
  );
}
