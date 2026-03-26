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
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Live Updates</h2>
          <p className="text-foreground/60">
            Recent news and developments from the region
          </p>
        </div>

        <div className="bento-card text-center text-foreground/60">
          No updates available at this time. Please check back later.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Live Updates</h2>
        <p className="text-foreground/60">
          Recent news and developments from the region
        </p>
      </div>

      <div className="bento-card">
        <div className="space-y-4">
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
    <div className="group border-b border-border last:border-0 pb-4 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <a
            href={update.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-2 group-hover:text-accent-blue transition-colors"
          >
            <h3 className="text-base font-semibold line-clamp-2">
              {update.title}
            </h3>
          </a>

          {update.content && (
            <p className="text-sm text-foreground/60 line-clamp-2 mb-2">
              {update.content}
            </p>
          )}

          <div className="flex items-center space-x-4 text-xs text-foreground/40">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(update.pubDate)}</span>
            </div>
            <span className="text-accent-blue">{update.source}</span>
          </div>
        </div>

        <a
          href={update.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-lg bg-accent-blue/10 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Open article"
        >
          <ExternalLink className="h-4 w-4 text-accent-blue" />
        </a>
      </div>
    </div>
  );
}
