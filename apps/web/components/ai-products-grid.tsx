import { ExternalLink, Sparkles } from "lucide-react";
import type { Database } from "@trend/db-schema";

type AIProduct = Database["public"]["Tables"]["ai_products"]["Row"];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8
      ? "text-green-800 border-green-800"
      : score >= 5
        ? "text-amber-800 border-amber-800"
        : "text-gray-600 border-gray-400";

  return (
    <span
      className={`inline-flex items-center text-xs font-bold border px-2 py-0.5 rounded-sm font-sans ${color}`}
    >
      <Sparkles className="w-3 h-3 mr-1" />
      {score}/10
    </span>
  );
}

function SourceLabel({ source }: { source: string }) {
  const labels: Record<string, string> = {
    producthunt: "Product Hunt",
    github: "GitHub",
    x: "X (Twitter)",
    rss: "RSS",
  };
  return (
    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-900 pb-0.5 font-sans">
      {labels[source] ?? source}
    </span>
  );
}

export function AIProductsGrid({ products }: { products: AIProduct[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <article
          key={product.id}
          className="group border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <SourceLabel source={product.source} />
            <ScoreBadge score={product.innovation_score} />
          </div>

          <h3 className="serif text-xl font-bold text-gray-900 mb-2 group-hover:underline decoration-1 underline-offset-4">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              {product.name}
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            </a>
          </h3>

          {product.description && (
            <p className="text-sm text-gray-600 font-serif leading-relaxed mb-3 line-clamp-3">
              {product.description}
            </p>
          )}

          {product.core_capability && (
            <div className="text-xs text-gray-500 font-sans border-t border-gray-100 pt-3 mt-auto">
              <span className="font-bold text-gray-700 uppercase tracking-wider">
                核心能力:
              </span>{" "}
              {product.core_capability}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
