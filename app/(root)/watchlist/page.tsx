import { getWatchlistWithData } from '@/lib/actions/watchlist.actions';
import WatchlistTable from '@/components/WatchlistTable';
import SearchCommand from '@/components/SearchCommand';
import RefreshButton from '@/components/RefreshButton';
import { getNews } from '@/lib/actions/ finnhub.actions';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function WatchlistPage() {
  const watchlist = await getWatchlistWithData();
  const initialStocks = await import('@/lib/actions/ finnhub.actions').then(m => m.searchStocks());
  
  // Get news for watchlist symbols
  const watchlistSymbols = watchlist.map(stock => stock.symbol);
  const news = await getNews(watchlistSymbols);

  return (
    <div className="watchlist-page-container">
      <div className="container mx-auto px-4 py-8">
        <div className="watchlist-page-header">
          <h1 className="watchlist-page-title">Watchlist</h1>
          <p className="watchlist-page-description">Track your favorite stocks and monitor their performance</p>
        </div>
        
        <div className="watchlist-section">
          <div className="watchlist-section-header">
            <h2 className="watchlist-section-title">Your Watchlist</h2>
            <div className="flex gap-2">
              <SearchCommand 
                renderAs="button" 
                label="Add Stock" 
                initialStocks={initialStocks} 
              />
              <RefreshButton />
            </div>
          </div>
          
          {watchlist.length > 0 ? (
            <WatchlistTable watchlist={watchlist} />
          ) : (
            <div className="watchlist-empty-state">
              <div className="watchlist-empty-content">
                <p className="watchlist-empty-title">No stocks in your watchlist</p>
                <p className="watchlist-empty-description">Add stocks to start tracking their performance</p>
              </div>
            </div>
          )}
        </div>
        
        {/* News Section */}
        {news && news.length > 0 && (
          <div className="watchlist-news-section mt-8">
            <h2 className="watchlist-section-title mb-4">Latest News for Your Watchlist</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article, index) => (
                <div key={index} className="news-card p-4 border border-gray-700 rounded-lg">
                  <h3 className="news-headline text-lg font-semibold mb-2 line-clamp-2">
                    {article.headline}
                  </h3>
                  <p className="news-summary text-gray-400 text-sm mb-3 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="news-meta flex justify-between items-center text-xs text-gray-500">
                    <span>{article.source}</span>
                    <span>{new Date(article.datetime * 1000).toLocaleDateString()}</span>
                  </div>
                  {article.url && (
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="news-link text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                    >
                      Read more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}