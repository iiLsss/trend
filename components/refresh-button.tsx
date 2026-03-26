"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export function RefreshButton() {
  const router = useRouter();

  const handleRefresh = () => {
    router.push("?reloaddate=true");
    router.refresh();
  };

  return (
    <button
      onClick={handleRefresh}
      className="flex items-center space-x-2 rounded border-2 border-foreground bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors uppercase tracking-wide"
    >
      <RefreshCw className="h-4 w-4" />
      <span>刷新</span>
    </button>
  );
}
