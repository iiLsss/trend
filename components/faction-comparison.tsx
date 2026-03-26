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
      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="serif text-3xl md:text-4xl font-bold mb-2 text-foreground">
          对峙阵容
        </h2>
        <p className="text-muted leading-relaxed">
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
  return (
    <div className="editorial-card">
      <div className="mb-5 pb-4 border-b-2 border-foreground">
        <div className="flex items-center space-x-3 mb-3">
          <div className="rounded bg-foreground p-2">
            <Shield className="h-5 w-5 text-background" />
          </div>
          <h3 className="serif text-2xl font-bold text-foreground">{faction.name}</h3>
        </div>
        <p className="text-sm text-muted leading-relaxed">{faction.description}</p>
      </div>

      <div className="mb-5">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="h-4 w-4 text-muted" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
            目标
          </h4>
        </div>
        <ul className="space-y-2">
          {faction.objectives.map((obj, idx) => (
            <li key={idx} className="text-sm text-muted leading-relaxed pl-4 relative">
              <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-foreground" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5">
        <div className="flex items-center space-x-2 mb-3">
          <Users className="h-4 w-4 text-muted" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
            关键人物
          </h4>
        </div>
        <ul className="space-y-1.5">
          {faction.keyFigures.map((figure, idx) => (
            <li key={idx} className="text-sm text-muted leading-relaxed">
              {figure}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted uppercase tracking-wide">状态</span>
          <span className="text-xs font-medium text-foreground bg-foreground/5 px-3 py-1.5 rounded">
            {faction.status}
          </span>
        </div>
      </div>
    </div>
  );
}
