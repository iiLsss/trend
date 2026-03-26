import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glassmorphism">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <BarChart3 className="h-6 w-6 text-accent-blue" />
          <span className="text-xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            全球趋势
          </span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link
            href="/trends"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            趋势
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
