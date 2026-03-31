import { Suspense } from "react";
import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchAITrendsData } from "@/lib/ai-trends-data";
import { AIProductsGrid } from "@/components/ai-products-grid";
import { ReBundlingOpportunities } from "@/components/re-bundling-opportunities";
import { BriefingView } from "@/components/briefing-view";
import { FeedbackForm } from "@/components/feedback-form";
import { AITrendsUnavailable } from "@/components/ai-trends-unavailable";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function AITrendsContent() {
  const data = await fetchAITrendsData();

  if (!data.success) {
    return <AITrendsUnavailable reason={data.error} />;
  }

  const hasProducts = data.products.length > 0;
  const hasOpportunities = data.opportunities.length > 0;
  const hasBriefing = data.latestBriefing !== null;

  if (!hasProducts && !hasOpportunities && !hasBriefing) {
    return (
      <AITrendsUnavailable reason="尚无数据。Agent 后端尚未运行或未产生分析结果。" />
    );
  }

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
                AI 产品
              </span>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest font-sans">
                智能分析
              </span>
            </div>
            <h1 className="serif text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-4">
              AI 工具趋势
            </h1>
            <p className="serif text-xl text-gray-600 leading-relaxed">
              自动追踪全球 AI 新物种，过滤"AI Washing"，拆解核心功能，发现重构整合机会。
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-gray-200 gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-gray-900 uppercase tracking-wider font-sans">
              AI 趋势分析引擎
            </div>
            {hasBriefing && data.latestBriefing && (
              <div className="text-sm text-gray-500 font-sans">
                最新简报:{" "}
                {new Date(data.latestBriefing.date).toLocaleDateString("zh-CN", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          {hasBriefing && data.latestBriefing && (
            <section>
              <BriefingView briefing={data.latestBriefing} />
            </section>
          )}

          {hasProducts && (
            <section>
              <h2 className="serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                AI 原生新物种
              </h2>
              <AIProductsGrid products={data.products} />
            </section>
          )}

          <p className="text-xs text-gray-500 font-sans leading-relaxed border-t border-gray-200 pt-6">
            数据由 AI Agent 自动抓取与分析，仅供产品研究参考。创新评分基于 LLM 判断，可能存在偏差。
          </p>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-12">
            {hasOpportunities && (
              <div>
                <h2 className="serif text-xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 flex items-center justify-between">
                  <span>重构整合机会</span>
                  <span className="text-xs font-normal text-gray-500 font-sans tracking-widest">
                    Re-bundling
                  </span>
                </h2>
                <ReBundlingOpportunities opportunities={data.opportunities} />
              </div>
            )}

            <div>
              <h2 className="serif text-xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
                调教反馈
              </h2>
              <FeedbackForm briefingId={data.latestBriefing?.id ?? null} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 uppercase tracking-widest font-sans">
            加载 AI 趋势数据中...
          </p>
        </div>
      }
    >
      <AITrendsContent />
    </Suspense>
  );
}
