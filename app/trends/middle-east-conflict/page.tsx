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
    <div className="bg-background">
      <div className="container mx-auto px-4 py-10 md:px-6">
        <div className="mb-12 pb-6 border-b-2 border-foreground">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-4">
            <div className="flex-1">
              <div className="mb-3">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  冲突追踪
                </span>
              </div>
              <h1 className="serif text-5xl md:text-6xl font-bold mb-4 text-foreground leading-tight">
                中东冲突
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-2xl">
                实时追踪和分析当前局势
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 rounded bg-red-50 px-3 py-2 text-sm font-medium text-danger border border-danger/20">
                <span className="h-2 w-2 rounded-full bg-danger animate-pulse" />
                <span className="uppercase tracking-wide">实时</span>
              </div>

              <RefreshButton />
            </div>
          </div>

          <div className="text-xs text-muted uppercase tracking-wider">
            最后更新: {new Date(indicators.lastUpdated).toLocaleString("zh-CN")}
            {forceReload && " · 强制刷新"}
          </div>
        </div>

        <div className="space-y-12">
          <ConflictIndicatorsGrid indicators={indicators} />
          <ConflictTimelineChart data={timelineData} />
          <FactionComparison factions={factions} />
          <LiveUpdatesTimeline updates={liveUpdates} />
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
        <div className="bg-background">
          <div className="container mx-auto px-4 py-10 md:px-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-foreground mx-auto mb-4" />
                <p className="text-muted">加载冲突数据中...</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <MiddleEastConflictContent searchParams={searchParams} />
    </Suspense>
  );
}
