import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
      <div className="text-center max-w-3xl px-4">
        <h2 className="serif text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          洞察全球脉络，<br/>把握时代趋势。
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10 font-serif">
          以客观的数据和严谨的分析，为您呈现世界上正在发生的重大事件及其深远影响。
        </p>
        <Link 
          href="/trends" 
          className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors font-sans font-bold"
        >
          浏览最新趋势
        </Link>
      </div>
    </div>
  );
}