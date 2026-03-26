export default function Home() {
  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center bg-background">
      <div className="text-center max-w-3xl px-4">
        <h1 className="serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
          全球趋势追踪器
        </h1>
        <p className="text-xl text-muted leading-relaxed mb-2">
          实时追踪和分析全球趋势
        </p>
        <p className="text-sm text-muted uppercase tracking-wider">
          Data-Driven Global Insights
        </p>
      </div>
    </div>
  );
}
