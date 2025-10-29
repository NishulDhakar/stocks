"use client";

import { useState } from "react";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { removeFromWatchlist } from "@/lib/actions/watchlist.actions";
import { toast } from "sonner";

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


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap: string) => {
    if (marketCap === 'N/A') return 'N/A';
    // You can enhance this with proper market cap formatting
    return marketCap;
  };

  if (localWatchlist.length === 0) {
    return (
      <div className="watchlist-empty-state">
        <div className="watchlist-empty-content">
          <Star className="watchlist-empty-icon" />
          <p className="watchlist-empty-title">No stocks in your watchlist</p>
          <p className="watchlist-empty-description">Add stocks to start tracking their performance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-table-container">
      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {localWatchlist.map((stock) => (
            <tr key={stock.symbol}>
              <td>
                <div className="watchlist-company-cell">
                  <Star 
                    className="watchlist-star-icon"
                    onClick={() => handleRemoveStock(stock.symbol)}
                  />
                  <div>
                    <div className="watchlist-company-name">{stock.company}</div>
                  </div>
                </div>
              </td>
              <td className="watchlist-symbol">{stock.symbol}</td>
              <td className="watchlist-price">
                {stock.currentPrice ? formatPrice(stock.currentPrice) : stock.priceFormatted}
              </td>
              <td>
                <div className={`watchlist-change ${
                  (stock.changePercent ?? 0) >= 0 ? 'watchlist-change-positive' : 'watchlist-change-negative'
                }`}>
                  {(stock.changePercent ?? 0) >= 0 ? (
                    <TrendingUp className="watchlist-change-icon" />
                  ) : (
                    <TrendingDown className="watchlist-change-icon" />
                  )}
                  <span className="watchlist-change-text">
                    {stock.changePercent !== undefined && stock.changePercent !== 0 ? formatChange(stock.changePercent) : stock.changeFormatted}
                  </span>
                </div>
              </td>
              <td className="watchlist-market-cap">{formatMarketCap(stock.marketCap || 'N/A')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
