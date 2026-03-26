import Link from "next/link";
import { Newspaper } from "lucide-react";

export function Header() {
  return (
    <header className="newsroom-header sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between border-b border-border">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <div className="flex items-center space-x-3">
              <Newspaper className="h-7 w-7 text-foreground" />
              <div>
                <h1 className="serif text-2xl font-bold tracking-tight text-foreground">
                  全球趋势
                </h1>
                <p className="text-xs text-muted uppercase tracking-wider">
                  GLOBAL TRENDS
                </p>
              </div>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link
              href="/trends"
              className="text-sm font-medium text-foreground hover:text-muted transition-colors uppercase tracking-wider"
            >
              趋势
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-foreground hover:text-muted transition-colors uppercase tracking-wider"
            >
              关于
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
