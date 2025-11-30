import { getWatchlistWithData } from "@/lib/actions/watchlist.actions";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import WatchlistClientWrapper from "./client-wrapper";

export default async function WatchlistPage() {
  // Fetch real watchlist data from the database
  const watchlist = await getWatchlistWithData();

  // Fetch initial stocks for the search command
  const initialStocks = await searchStocks();

  return (
    <WatchlistClientWrapper
      initialWatchlist={watchlist}
      initialStocks={initialStocks}
    />
  );
}