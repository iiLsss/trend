import Link from "next/link";
import { PortalCard } from "@/components/portal-card";
import { guideItems, trendItems } from "@/lib/portal";

export default function Home() {
  return (
    <div className="py-10">
      <div className="mb-14 border-heavy-bottom pb-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            Personal Knowledge Portal
          </p>
          <h2 className="serif mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            收纳趋势、教程与工具，<br />把有用信息放在同一个入口。
          </h2>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-gray-600">
            这里会逐步从全球趋势追踪器扩展为个人内容门户：既放持续更新的趋势专题，也放能直接照着做的工具配置教程。
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/trends"
            className="inline-flex border border-gray-900 px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            浏览趋势
          </Link>
          <Link
            href="/guides"
            className="inline-flex border border-gray-300 px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
          >
            查看教程
          </Link>
        </div>
      </div>

      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-gray-200 pb-3">
          <div>
            <h2 className="serif text-3xl font-bold text-gray-900">趋势追踪</h2>
            <p className="mt-2 font-serif text-sm text-gray-600">
              关注宏观事件、市场数据与 AI 产品变化。
            </p>
          </div>
          <Link href="/trends" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900">
            全部趋势
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendItems.map((item) => (
            <PortalCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-gray-200 pb-3">
          <div>
            <h2 className="serif text-3xl font-bold text-gray-900">教程指南</h2>
            <p className="mt-2 font-serif text-sm text-gray-600">
              面向小白的配置说明、工具玩法和操作手册。
            </p>
          </div>
          <Link href="/guides" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900">
            全部教程
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guideItems.map((item) => (
            <PortalCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
