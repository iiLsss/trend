import Link from "next/link";
import { Code2, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-foreground bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="serif text-xl font-bold mb-3">全球趋势追踪器</h3>
            <p className="text-sm text-muted leading-relaxed">
              通过数据驱动的洞察实时追踪和分析全球趋势
            </p>
          </div>
          
          <div>
            <h3 className="serif text-lg font-bold mb-3">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trends" className="text-sm text-muted hover:text-foreground transition-colors">
                  趋势
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  关于
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="serif text-lg font-bold mb-3">联系</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="代码"
              >
                <Code2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="分享"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <p className="text-center text-xs text-muted uppercase tracking-wider">
            © {new Date().getFullYear()} 全球趋势追踪器 · 保留所有权利
          </p>
        </div>
      </div>
    </footer>
  );
}
