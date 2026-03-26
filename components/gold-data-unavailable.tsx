export function GoldDataUnavailable({ reason }: { reason?: string }) {
  return (
    <div className="border-2 border-gray-900 bg-gray-50 p-8 text-center">
      <p className="serif text-xl font-bold text-gray-900 mb-2">
        黄金数据暂时不可用
      </p>
      <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-xl mx-auto">
        本页金价与图表来自圣路易斯联储（FRED）公开序列，需配置有效的{" "}
        <code className="text-xs bg-white px-1 py-0.5 border border-gray-200">
          FRED_API_KEY
        </code>
        。未配置密钥或上游接口异常时，不展示虚构价格。
      </p>
      {reason && process.env.NODE_ENV === "development" && (
        <p className="mt-4 text-xs text-gray-400 font-mono">{reason}</p>
      )}
    </div>
  );
}
