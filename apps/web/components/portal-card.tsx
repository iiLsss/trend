import Link from "next/link";
import type { PortalItem } from "@/lib/portal";

interface PortalCardProps {
  item: PortalItem;
}

function StatusLabel({ item }: { item: PortalItem }) {
  if (item.status === "live") {
    return (
      <span className="flex items-center text-xs font-bold text-red-700 uppercase tracking-widest">
        <span className="h-1.5 w-1.5 rounded-full bg-red-700 animate-pulse mr-1.5" />
        实时更新
      </span>
    );
  }

  if (item.status === "daily") {
    return (
      <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">
        日频数据
      </span>
    );
  }

  return (
    <span className="text-xs font-bold text-blue-800 uppercase tracking-widest">
      教程指南
    </span>
  );
}

export function PortalCard({ item }: PortalCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 font-sans transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="border-b border-gray-900 pb-1 text-xs font-bold uppercase tracking-widest text-gray-900">
          {item.category}
        </span>
        <StatusLabel item={item} />
      </div>

      <Link href={item.href} className="flex-1">
        <h2 className="serif mb-3 text-2xl font-bold text-gray-900 decoration-2 underline-offset-4 group-hover:underline">
          {item.title}
        </h2>
        <p className="font-serif text-sm leading-relaxed text-gray-600">
          {item.description}
        </p>
      </Link>

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-xs text-gray-500">
        <span className="font-bold uppercase tracking-widest">{item.author}</span>
        <span>{item.updatedAt}</span>
      </div>
    </article>
  );
}
