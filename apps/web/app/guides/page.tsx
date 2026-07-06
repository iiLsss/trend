import { PortalCard } from "@/components/portal-card";
import { guideItems } from "@/lib/portal";

export default function GuidesPage() {
  return (
    <div className="py-8">
      <div className="mb-12 border-heavy-bottom pb-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
          Guides
        </p>
        <h1 className="serif mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          教程指南
        </h1>
        <p className="max-w-3xl font-serif text-lg text-gray-600">
          把工具配置、使用步骤和实践玩法整理成能直接照着做的手册。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {guideItems.map((guide) => (
          <PortalCard key={guide.id} item={guide} />
        ))}
      </div>
    </div>
  );
}
