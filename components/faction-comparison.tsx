import { FactionData } from "@/lib/data";
import { Shield, Target, Users } from "lucide-react";

interface FactionComparisonProps {
  factions: FactionData[];
}

export function FactionComparison({ factions }: FactionComparisonProps) {
  const leftFaction = factions.find((f) => f.side === "left");
  const rightFaction = factions.find((f) => f.side === "right");

  if (!leftFaction || !rightFaction) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">对峙阵容</h2>
        <p className="text-foreground/60">
          冲突中主要对立方概览
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FactionCard faction={leftFaction} />
        <FactionCard faction={rightFaction} />
      </div>
    </section>
  );
}

function FactionCard({ faction }: { faction: FactionData }) {
  const isLeft = faction.side === "left";
  const accentColor = isLeft ? "accent-blue" : "accent-purple";

  return (
    <div className="bento-card">
      <div className="mb-4">
        <div
          className={`inline-flex items-center justify-center rounded-full bg-${accentColor}/10 p-3 mb-3`}
        >
          <Shield className={`h-6 w-6 text-${accentColor}`} />
        </div>
        <h3 className="text-2xl font-bold mb-2">{faction.name}</h3>
        <p className="text-sm text-foreground/60">{faction.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="h-4 w-4 text-foreground/40" />
          <h4 className="text-sm font-semibold text-foreground/80">
            目标
          </h4>
        </div>
        <ul className="space-y-1.5">
          {faction.objectives.map((obj, idx) => (
            <li key={idx} className="text-sm text-foreground/60 pl-4 relative">
              <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-foreground/40" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="h-4 w-4 text-foreground/40" />
          <h4 className="text-sm font-semibold text-foreground/80">
            关键人物
          </h4>
        </div>
        <ul className="space-y-1.5">
          {faction.keyFigures.map((figure, idx) => (
            <li key={idx} className="text-sm text-foreground/60">
              {figure}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/40">状态</span>
          <span
            className={`text-xs font-medium text-${accentColor} bg-${accentColor}/10 px-3 py-1 rounded-full`}
          >
            {faction.status}
          </span>
        </div>
      </div>
    </div>
  );
}
