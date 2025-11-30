"use client";

import SearchCommand from "@/components/SearchCommand";
import WatchlistTable from "@/components/WatchlistTable";

interface WatchlistClientWrapperProps {
    initialWatchlist: StockWithData[];
    initialStocks: StockWithWatchlistStatus[];
}

export default function WatchlistClientWrapper({
    initialWatchlist,
    initialStocks,
}: WatchlistClientWrapperProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Watchlist
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track your favorite assets and market movements.
                    </p>
                </div>
                <SearchCommand
                    renderAs="button"
                    label="Add Symbol"
                    initialStocks={initialStocks}
                    buttonClassName="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                    showIcon={true}
                />
            </div>

            <WatchlistTable watchlist={initialWatchlist} />
        </div>
    );
}
