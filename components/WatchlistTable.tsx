"use client";

import { useState } from "react";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { removeFromWatchlist } from "@/lib/actions/watchlist.actions";
import { toast } from "sonner";
import Link from "next/link";

export default function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const [localWatchlist, setLocalWatchlist] = useState(watchlist);

  const handleRemoveStock = async (symbol: string) => {
    try {
      const result = await removeFromWatchlist(symbol);
      if (result.success) {
        setLocalWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
        toast.success("Stock removed from watchlist");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to remove stock from watchlist");
    }
  };

  if (localWatchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
        <Star className="h-16 w-16 text-yellow-500/20 mb-4" />
        <p className="text-xl font-semibold text-foreground mb-2">No stocks in your watchlist</p>
        <p className="text-muted-foreground text-center">Add stocks to start tracking their performance</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 font-medium text-muted-foreground">Company</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Symbol</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Price</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Change</th>
              <th className="px-6 py-4 font-medium text-muted-foreground hidden md:table-cell">Market Cap</th>
              <th className="px-6 py-4 font-medium text-muted-foreground hidden lg:table-cell">P/E Ratio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {localWatchlist.map((stock) => (
              <tr key={stock.symbol} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/stocks/${stock.symbol}`} className="flex items-center gap-3 group/link">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveStock(stock.symbol);
                      }}
                      className="flex-shrink-0"
                      title="Remove from watchlist"
                    >
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 hover:text-yellow-400 hover:fill-yellow-400 transition-colors cursor-pointer" />
                    </button>
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-foreground flex-shrink-0">
                      {stock.symbol[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground group-hover/link:text-primary transition-colors truncate">
                        {stock.company}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{stock.symbol}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">
                  {stock.symbol}
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">
                  {stock.currentPrice ? `$${stock.currentPrice.toFixed(2)}` : stock.priceFormatted || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${(stock.changePercent ?? 0) >= 0
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'
                    }`}>
                    {(stock.changePercent ?? 0) >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {stock.changePercent !== undefined && stock.changePercent !== 0
                        ? `${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%`
                        : stock.changeFormatted || 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                  {stock.marketCap || 'N/A'}
                </td>
                <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                  {stock.peRatio || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
