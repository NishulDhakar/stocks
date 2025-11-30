"use client";

import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Search, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

import { searchStocks } from "@/lib/actions/finnhub.actions";
import { useDebounce } from "@/hooks/useDebounce";
import { addToWatchlist, removeFromWatchlist } from "@/lib/actions/watchlist.actions";
import { toast } from "sonner";

export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks, buttonClassName, showIcon = false }: SearchCommandProps) {
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
    if (!isSearchMode) return setStocks(initialStocks);

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
        <span onClick={() => setOpen(true)} className="cursor-pointer text-primary hover:text-primary/80 transition-colors">
          {label}
        </span>
      ) : renderAs === 'input' ? (
        <div
          onClick={() => setOpen(true)}
          className="relative cursor-text"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder={label}
            readOnly
            className="h-10 w-full sm:w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground cursor-pointer hover:border-white/20 focus:outline-none transition-all"
          />
        </div>
      ) : (
        <Button onClick={() => setOpen(true)} className={buttonClassName || "bg-primary text-primary-foreground hover:bg-primary/90"}>
          {showIcon && <Plus className="h-4 w-4 mr-2" />}
          {label}
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search stocks..."
            className="h-12 text-base"
          />
          {loading && <Loader2 className="absolute right-3 top-3 h-5 w-5 animate-spin text-muted-foreground" />}
        </div>
        <CommandList className="max-h-[400px] scrollbar-hide">
          {loading ? (
            <CommandEmpty className="py-6 text-center text-muted-foreground">Loading stocks...</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground text-sm">
              {isSearchMode ? 'No results found' : 'No stocks available'}
            </div>
          ) : (
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                <span className="ml-1">({displayStocks?.length || 0})</span>
              </div>
              {displayStocks?.map((stock) => (
                <Link
                  key={stock.symbol}
                  href={`/stocks/${stock.symbol}`}
                  onClick={handleSelectStock}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                      {stock.name}
                    </div>
                    <div className="text-xs text-muted-foreground space-x-2">
                      <span>{stock.symbol}</span>
                      <span>•</span>
                      <span>{stock.exchange}</span>
                      <span>•</span>
                      <span>{stock.type}</span>
                    </div>
                  </div>
                  <Star
                    className={`h-5 w-5 flex-shrink-0 cursor-pointer transition-colors ${stock.isInWatchlist
                      ? 'text-yellow-500 fill-yellow-500 hover:text-yellow-400 hover:fill-yellow-400'
                      : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    onClick={(e) => handleStarClick(e, stock)}
                  />
                </Link>
              ))}
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}