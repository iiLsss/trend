import type { GoldIndicators } from "@/lib/gold-data";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Activity, ShieldCheck, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrendConclusionProps {
  indicators: GoldIndicators;
}

export function TrendConclusion({ indicators }: TrendConclusionProps) {
  const isUpward = indicators.trendDirection === "强势上行";
  const isDownward = indicators.trendDirection === "弱势下行";
  
  const isHighRisk = indicators.riskLevel === "高风险 (剧烈波动)";
  const isMediumRisk = indicators.riskLevel === "中等风险 (活跃)";

  return (
    <TooltipProvider delayDuration={300}>
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trend Card */}
        <div className={`p-6 border-2 flex flex-col justify-center ${
          isUpward ? "border-red-700 bg-red-50" : 
          isDownward ? "border-green-700 bg-green-50" : 
          "border-gray-400 bg-gray-50"
        }`}>
          <div className="flex items-center space-x-1.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest font-sans text-gray-600">当前趋势</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span className="sr-only">解释说明</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>基于20日均线（短期成本）与60日均线（中期成本）的交叉情况进行判断。当短期成本高于中期成本时，通常意味着趋势向上。</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-3">
            {isUpward && <TrendingUp className="h-8 w-8 text-red-700" strokeWidth={2.5} />}
            {isDownward && <TrendingDown className="h-8 w-8 text-green-700" strokeWidth={2.5} />}
            {!isUpward && !isDownward && <Minus className="h-8 w-8 text-gray-500" strokeWidth={2.5} />}
            <span className={`text-3xl font-black tracking-tight ${
              isUpward ? "text-red-700" : 
              isDownward ? "text-green-700" : 
              "text-gray-700"
            }`}>
              {indicators.trendDirection}
            </span>
          </div>
          <p className="text-sm mt-3 font-serif text-gray-600">
            基于20日均线与60日均线交叉分析
          </p>
        </div>

        {/* Risk Card */}
        <div className={`p-6 border-2 flex flex-col justify-center ${
          isHighRisk ? "border-orange-600 bg-orange-50" : 
          isMediumRisk ? "border-blue-600 bg-blue-50" : 
          "border-emerald-600 bg-emerald-50"
        }`}>
          <div className="flex items-center space-x-1.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest font-sans text-gray-600">市场风险</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span className="sr-only">解释说明</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>基于 CBOE 黄金 ETF 波动率指数 (GVZ)。数值越高，说明市场预期未来金价波动越剧烈，投资风险越大。</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-3">
            {isHighRisk && <AlertTriangle className="h-8 w-8 text-orange-600" strokeWidth={2.5} />}
            {isMediumRisk && <Activity className="h-8 w-8 text-blue-600" strokeWidth={2.5} />}
            {!isHighRisk && !isMediumRisk && <ShieldCheck className="h-8 w-8 text-emerald-600" strokeWidth={2.5} />}
            <span className={`text-3xl font-black tracking-tight ${
              isHighRisk ? "text-orange-600" : 
              isMediumRisk ? "text-blue-600" : 
              "text-emerald-600"
            }`}>
              {indicators.riskLevel}
            </span>
          </div>
          <p className="text-sm mt-3 font-serif text-gray-600">
            基于 CBOE 黄金 ETF 波动率指数 (GVZ)
            {indicators.latestVolatilityIndex && `：${indicators.latestVolatilityIndex.toFixed(2)}`}
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}