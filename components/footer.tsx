import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-white border-heavy-top mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="serif text-2xl font-bold mb-4 text-gray-900">全球趋势</h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              我们致力于提供客观、准确的全球宏观趋势分析。通过数据驱动的洞察，帮助读者理解复杂的世界局势。
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">栏目</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/trends" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  所有趋势
                </Link>
              </li>
              <li>
                <Link href="/trends/middle-east-conflict" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  中东冲突
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">关于</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  联系方式
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} 全球趋势追踪器. 保留所有权利.
          </p>
          <div className="text-xs text-gray-500 space-x-4">
            <Link href="#" className="hover:text-gray-900">隐私政策</Link>
            <Link href="#" className="hover:text-gray-900">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}