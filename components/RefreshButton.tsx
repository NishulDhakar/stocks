"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      aria-label="Refresh Page"
      className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RotateCw
        className={`w-5 h-5 text-gray-800 ${isRefreshing ? "animate-spin" : ""}`}
      />
    </button>
  );
}
