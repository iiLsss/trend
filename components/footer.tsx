import Link from "next/link";
import { Code2, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-zinc-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-3">Global Trends Tracker</h3>
            <p className="text-sm text-foreground/60">
              Track and analyze global trends in real-time with data-driven insights.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trends" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Trends
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Code"
              >
                <Code2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-foreground/40">
            © {new Date().getFullYear()} Global Trends Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
