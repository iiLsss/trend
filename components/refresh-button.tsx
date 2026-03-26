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
      className="flex items-center space-x-2 rounded-full bg-accent-blue/10 px-4 py-2 text-sm font-medium text-accent-blue border border-accent-blue/20 hover:bg-accent-blue/20 transition-colors"
    >
      <RefreshCw className="h-4 w-4" />
      <span>刷新</span>
    </button>
  );
}
