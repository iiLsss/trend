import { Layers, Shield, Repeat, Network } from "lucide-react";
import type { Database } from "@trend/db-schema";

type ReBundlingOpportunity =
  Database["public"]["Tables"]["re_bundling_opportunities"]["Row"] & {
    cluster_label?: string;
  };

function MoatIndicator({
  active,
  icon: Icon,
  label,
}: {
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-xs font-sans gap-1 ${active ? "text-gray-900 font-bold" : "text-gray-300"}`}
      title={label}
    >
      <Icon className="w-3.5 h-3.5" />
    </span>
  );
}

export function ReBundlingOpportunities({
  opportunities,
}: {
  opportunities: ReBundlingOpportunity[];
}) {
  return (
    <div className="space-y-6">
      {opportunities.map((opp) => (
        <article
          key={opp.id}
          className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="serif text-lg font-bold text-gray-900 leading-snug">
              {opp.title}
            </h3>
            {opp.moat_score && (
              <span className="text-xs font-bold text-blue-800 font-sans whitespace-nowrap ml-3">
                护城河 {opp.moat_score}/10
              </span>
            )}
          </div>

          {opp.cluster_label && (
            <div className="text-xs text-gray-500 font-sans mb-2">
              <Layers className="w-3 h-3 inline mr-1" />
              聚类: {opp.cluster_label}
            </div>
          )}

          {opp.value_proposition && (
            <p className="text-sm text-gray-600 font-serif leading-relaxed mb-3">
              {opp.value_proposition}
            </p>
          )}

          <div className="flex items-center gap-4">
            {opp.target_industry && (
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest font-sans">
                {opp.target_industry}
              </span>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <MoatIndicator
                active={opp.has_proprietary_data}
                icon={Shield}
                label="专有数据"
              />
              <MoatIndicator
                active={opp.has_transaction_embed}
                icon={Repeat}
                label="交易嵌入"
              />
              <MoatIndicator
                active={opp.has_network_effect}
                icon={Network}
                label="网络效应"
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
