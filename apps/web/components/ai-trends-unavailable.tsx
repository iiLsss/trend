import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AITrendsUnavailable({ reason }: { reason?: string }) {
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
      <div className="py-20 text-center">
        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-4" />
        <h2 className="serif text-2xl font-bold text-gray-900 mb-2">
          AI 趋势数据暂不可用
        </h2>
        <p className="text-sm text-gray-500 font-sans max-w-md mx-auto">
          {reason ?? "无法连接数据源，请稍后再试。"}
        </p>
      </div>
    </div>
  );
}
