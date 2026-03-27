import { Suspense } from "react";
import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  fetchGoldSeriesFromFred,
  observationsForChart,
  fetchGoldContextNews,
} from "@/lib/gold-data";
import { GoldIndicatorsGrid } from "@/components/gold-indicators";
import { GoldPriceChart } from "@/components/gold-price-chart";
import { GoldDataUnavailable } from "@/components/gold-data-unavailable";
import { LiveUpdatesTimeline } from "@/components/live-updates-timeline";
import { RefreshButton } from "@/components/refresh-button";
import { TrendConclusion } from "@/components/trend-conclusion";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function GoldTrendContent({
  searchParams,
}: {
  searchParams: Promise<{ reloaddate?: string }>;
}) {
  await searchParams;

  const [seriesResult, contextNews] = await Promise.all([
    fetchGoldSeriesFromFred(),
    fetchGoldContextNews(),
  ]);

  const chartObs = seriesResult.success
    ? observationsForChart(seriesResult.observations)
    : [];

  const metaTime =
    seriesResult.indicators?.lastUpdated ?? new Date().toISOString();

  return (
    <div className="py-6">
      <div className="mb-6">
        <Link 
          href="/trends" 
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider font-sans"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回专题追踪
        </Link>
      </div>

      <header className="mb-12 pb-8 border-heavy-bottom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-900 pb-1 font-sans">
                大宗商品
              </span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest font-sans">
                日频趋势
              </span>
            </div>
            <h1 className="serif text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-4">
              黄金趋势
            </h1>
            <p className="serif text-xl text-gray-600 leading-relaxed">
              基于圣路易斯联储（FRED）纳斯达克黄金价格指数与 CBOE 黄金波动率指数，观察中长期价格方向与市场风险，非实时盘口。
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-gray-200 gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-gray-900 uppercase tracking-wider font-sans">
              全球趋势编辑部
            </div>
            <div className="text-sm text-gray-500 font-sans">
              数据刷新:{" "}
              {new Date(metaTime).toLocaleString("zh-CN", {
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <RefreshButton />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          
          {seriesResult.success && seriesResult.indicators && (
            <section>
              <TrendConclusion indicators={seriesResult.indicators} />
            </section>
          )}

          <section>
            <h2 className="serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              价格与趋势指标
            </h2>
            {seriesResult.success && seriesResult.indicators ? (
              <GoldIndicatorsGrid indicators={seriesResult.indicators} />
            ) : (
              <GoldDataUnavailable reason={seriesResult.error} />
            )}
          </section>

          <section>
            <h2 className="serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              历史走势
            </h2>
            {seriesResult.success && chartObs.length > 0 ? (
              <GoldPriceChart data={chartObs} />
            ) : (
              <GoldDataUnavailable reason={seriesResult.error} />
            )}
          </section>

          <p className="text-xs text-gray-500 font-sans leading-relaxed border-t border-gray-200 pt-6">
            数据仅供信息参考，不构成投资建议。序列修订可能导致历史曲线略有变化。
          </p>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="serif text-xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 flex items-center justify-between">
              <span>宏观与金价相关动态</span>
              <span className="text-xs font-normal text-gray-500 font-sans tracking-widest">
                RSS
              </span>
            </h2>
            <LiveUpdatesTimeline updates={contextNews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoldTrendPage({
  searchParams,
}: {
  searchParams: Promise<{ reloaddate?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 uppercase tracking-widest font-sans">
            加载数据中...
          </p>
        </div>
      }
    >
      <GoldTrendContent searchParams={searchParams} />
    </Suspense>
  );
}
