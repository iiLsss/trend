import { FileText } from "lucide-react";
import type { Database } from "@trend/db-schema";
import { Streamdown } from "streamdown";

type Briefing = Database["public"]["Tables"]["briefings"]["Row"];

export function BriefingView({ briefing }: { briefing: Briefing }) {
  const date = new Date(briefing.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h2 className="serif text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        每日情报简报
      </h2>

      <div className="flex items-center gap-4 mb-6 text-xs text-gray-500 font-sans">
        <span>{date}</span>
        <span>·</span>
        <span>发现 {briefing.products_count} 个产品</span>
        <span>·</span>
        <span>{briefing.opportunities_count} 个整合机会</span>
      </div>

      <div
        className="
          max-w-none font-serif text-[15px] leading-7 text-gray-700
          [&_h1]:serif [&_h2]:serif [&_h3]:serif
          [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-gray-900 [&_h1]:mt-10 [&_h1]:mb-4
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-1
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:my-3 [&_p]:leading-7
          [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc
          [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal
          [&_li]:my-1
          [&_strong]:font-bold [&_strong]:text-gray-900
          [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:text-gray-600
          [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px]
          [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-gray-200 [&_pre]:bg-gray-50 [&_pre]:p-4
          [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-800
          [&_hr]:my-8 [&_hr]:border-gray-200
        "
      >
        <Streamdown>{briefing.content_md}</Streamdown>
      </div>
    </div>
  );
}
