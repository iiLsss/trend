import { NewsItem } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface LiveUpdatesTimelineProps {
  updates: NewsItem[];
}

export function LiveUpdatesTimeline({ updates }: LiveUpdatesTimelineProps) {
  if (updates.length === 0) {
    return (
      <div className="text-sm text-gray-500 font-serif italic py-4">
        暂无最新报道。
      </div>
    );
  }

  return (
    <div className="space-y-0 font-sans">
      {updates.map((update, idx) => (
        <UpdateItem key={`${update.link}-${idx}`} update={update} />
      ))}
    </div>
  );
}

function UpdateItem({ update }: { update: NewsItem }) {
  return (
    <article className="py-5 border-b border-gray-200 last:border-0 group">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5">
          {update.source}
        </span>
        <time className="text-[11px] text-gray-500 uppercase tracking-wider">
          {formatDate(update.pubDate)}
        </time>
      </div>

      <a
        href={update.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover:opacity-75 transition-opacity"
      >
        <h3 className="serif text-lg font-bold text-gray-900 leading-snug mb-2">
          {update.title}
        </h3>
        {update.content && (
          <p className="text-sm text-gray-600 font-serif leading-relaxed line-clamp-3">
            {update.content}
          </p>
        )}
      </a>
    </article>
  );
}