import { PortalCard } from "@/components/portal-card";
import { trendItems } from "@/lib/portal";

export default function TrendsPage() {
  return (
    <div className="py-8">
      <div className="mb-12 border-heavy-bottom pb-6">
        <h1 className="serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">专题追踪</h1>
        <p className="text-lg text-gray-600 font-serif max-w-3xl">
          深入报道和持续追踪全球最具影响力的事件。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendItems.map((trend) => (
          <PortalCard key={trend.id} item={trend} />
        ))}
      </div>
    </div>
  );
}
