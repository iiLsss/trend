import Link from "next/link";

export function Header() {
  const today = new Date().toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top small bar */}
        <div className="flex justify-between items-center py-2 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-widest font-sans">
          <div>{today}</div>
          <div className="flex space-x-6">
            <Link href="/trends" className="hover:text-gray-900 transition-colors">趋势</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">关于</Link>
          </div>
        </div>
        
        {/* Masthead */}
        <div className="py-8 text-center border-double-bottom mb-4">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="serif text-5xl md:text-7xl font-black tracking-tight text-gray-900">
              全球趋势
            </h1>
            <p className="mt-3 text-xs text-gray-500 uppercase tracking-[0.4em] font-bold font-sans">
              Global Trends Tracker
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}