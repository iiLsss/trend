import { FactionData } from "@/lib/data";

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
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <FactionColumn faction={leftFaction} />
      <FactionColumn faction={rightFaction} />
    </div>
  );
}

function FactionColumn({ faction }: { faction: FactionData }) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-t-4 border-gray-900 pt-4 mb-6">
        <h3 className="serif text-3xl font-bold text-gray-900 mb-2">{faction.name}</h3>
        <p className="text-sm text-gray-600 font-serif italic">
          {faction.description}
        </p>
      </div>

      <div className="space-y-6 flex-1 font-sans">
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
            战略目标
          </h4>
          <ul className="space-y-2">
            {faction.objectives.map((obj, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start">
                <span className="mr-2 text-gray-400 mt-0.5">•</span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
            关键人物
          </h4>
          <ul className="space-y-2">
            {faction.keyFigures.map((figure, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start">
                <span className="mr-2 text-gray-400 mt-0.5">▪</span>
                <span className="leading-relaxed">{figure}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 font-sans">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">当前状态</span>
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wider bg-gray-100 px-2.5 py-1">
            {faction.status}
          </span>
        </div>
      </div>
    </div>
  );
}