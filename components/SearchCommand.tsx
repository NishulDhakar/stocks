"use client"

import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import {Button} from "@/components/ui/button";
import {Loader2,  Star,  TrendingUp} from "lucide-react";
import Link from "next/link";


import { searchStocks } from "@/lib/actions/ finnhub.actions";
import { useDebounce } from "@/hooks/useDebounce";
import { addToWatchlist, removeFromWatchlist } from "@/lib/actions/watchlist.actions";
import { toast } from "sonner";

export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSearch = async () => {
    if(!isSearchMode) return setStocks(initialStocks);

    setLoading(true)
    try {
        console.log('Searching for:', searchTerm.trim());
        const results = await searchStocks(searchTerm.trim());
        console.log('Search results:', results);
        setStocks(results);
    } catch (error) {
      console.error('Search error:', error);
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  }

  const handleStarClick = async (e: React.MouseEvent, stock: StockWithWatchlistStatus) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (stock.isInWatchlist) {
        const result = await removeFromWatchlist(stock.symbol);
        if (result.success) {
          // Update local state
          setStocks(prev => prev.map(s => 
            s.symbol === stock.symbol ? { ...s, isInWatchlist: false } : s
          ));
          toast.success("Stock removed from watchlist");
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await addToWatchlist(stock.symbol, stock.name);
        if (result.success) {
          // Update local state
          setStocks(prev => prev.map(s => 
            s.symbol === stock.symbol ? { ...s, isInWatchlist: true } : s
          ));
          toast.success("Stock added to watchlist");
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("Failed to update watchlist");
    }
  }

  return (
    <>
      {renderAs === 'text' ? (
          <span onClick={() => setOpen(true)} className="search-text">
            {label}
          </span>
      ): (
          <Button onClick={() => setOpen(true)} className="search-btn">
            {label}
          </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog">
        <div className="search-field">
          <CommandInput value={searchTerm} onValueChange={setSearchTerm} placeholder="Search stocks..." className="search-input" />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
              <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
              <div className="search-list-indicator">
                {isSearchMode ? 'No results found' : 'No stocks available'}
              </div>
            ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                {` `}({displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock, i) => (
                  <li key={stock.symbol} className="search-item">
                    <Link
                        href={`/stocks/${stock.symbol}`}
                        onClick={handleSelectStock}
                        className="search-item-link">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <div  className="flex-1">
                        <div className="search-item-name">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stock.symbol} | {stock.exchange } | {stock.type}
                        </div>
                      </div>
                    <Star 
                      className={`h-5 w-5 cursor-pointer transition-colors ${
                        stock.isInWatchlist 
                          ? 'text-yellow-400 fill-current hover:text-yellow-300' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                      onClick={(e) => handleStarClick(e, stock)}
                    />
                    </Link>
                  </li>
              ))}
            </ul>
          )
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}