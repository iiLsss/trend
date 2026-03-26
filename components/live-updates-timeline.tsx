import { NewsItem } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ExternalLink, Clock } from "lucide-react";

interface LiveUpdatesTimelineProps {
  updates: NewsItem[];
}

export function LiveUpdatesTimeline({ updates }: LiveUpdatesTimelineProps) {
  if (updates.length === 0) {
    return (
      <section className="mb-12">
        <div className="mb-6 pb-4 border-b border-border">
          <h2 className="serif text-3xl md:text-4xl font-bold mb-2 text-foreground">
            实时动态
          </h2>
          <p className="text-muted leading-relaxed">
            来自该地区的最新消息和发展
          </p>
        </div>

        <div className="editorial-card text-center text-muted">
          暂无更新。请稍后再查看。
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="serif text-3xl md:text-4xl font-bold mb-2 text-foreground">
          实时动态
        </h2>
        <p className="text-muted leading-relaxed">
          来自该地区的最新消息和发展
        </p>
      </div>

      <div className="editorial-card">
        <div className="divide-y divide-border">
          {updates.map((update, idx) => (
            <UpdateItem key={`${update.link}-${idx}`} update={update} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UpdateItem({ update }: { update: NewsItem }) {
  return (
    <div className="group py-5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-medium text-foreground bg-foreground/5 px-2 py-1 rounded uppercase tracking-wide">
              {update.source}
            </span>
            <div className="flex items-center text-xs text-muted">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(update.pubDate)}</span>
            </div>
          </div>

          <a
            href={update.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-2"
          >
            <h3 className="serif text-lg font-bold text-foreground group-hover:text-danger transition-colors line-clamp-2 leading-tight">
              {update.title}
            </h3>
          </a>

          {update.content && (
            <p className="text-sm text-muted leading-relaxed line-clamp-2">
              {update.content}
            </p>
          )}
        </div>

        <a
          href={update.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded bg-foreground/5 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="打开文章"
        >
          <ExternalLink className="h-4 w-4 text-foreground" />
        </a>
      </div>
    </div>
  );
}
