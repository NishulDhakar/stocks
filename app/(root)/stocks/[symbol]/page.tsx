import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { auth } from "@/lib/batter-auth/auth";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

export default async function StockDetails({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  // Check if user is authenticated and get their watchlist
  const session = await auth.api.getSession({
    headers: await import('next/headers').then(m => m.headers())
  });

  let isInWatchlist = false;
  if (session?.user?.email) {
    const watchlistSymbols = await getWatchlistSymbolsByEmail(session.user.email);
    isInWatchlist = watchlistSymbols.includes(symbol.toUpperCase());
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{symbol.toUpperCase()}</h1>
          <p className="text-muted-foreground mt-1">Detailed market analysis and company profile.</p>
        </div>
        <WatchlistButton
          symbol={symbol.toUpperCase()}
          company={symbol.toUpperCase()}
          isInWatchlist={isInWatchlist}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Column */}
        <div className="xl:col-span-2 space-y-8">
          <GlassCard className="p-0 overflow-hidden min-h-[600px]">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Advanced Chart</h2>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}advanced-chart.js`}
              config={{
                ...CANDLE_CHART_WIDGET_CONFIG(symbol),
                colorTheme: "dark",
                isTransparent: true,
                width: "100%",
                height: "100%"
              }}
              className="w-full h-full min-h-[600px]"
            />
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden min-h-[400px]">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Baseline Analysis</h2>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}advanced-chart.js`}
              config={{
                ...BASELINE_WIDGET_CONFIG(symbol),
                colorTheme: "dark",
                isTransparent: true,
                width: "100%",
                height: "100%"
              }}
              className="w-full h-full min-h-[400px]"
            />
          </GlassCard>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Symbol Info</h2>
            </div>
            <div className="p-4">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}symbol-info.js`}
                config={{
                  ...SYMBOL_INFO_WIDGET_CONFIG(symbol),
                  colorTheme: "dark",
                  isTransparent: true,
                  width: "100%"
                }}
                height={200}
              />
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Technical Analysis</h2>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}technical-analysis.js`}
              config={{
                ...TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol),
                colorTheme: "dark",
                isTransparent: true,
                width: "100%",
                height: "100%"
              }}
              height={400}
            />
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Company Profile</h2>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}company-profile.js`}
              config={{
                ...COMPANY_PROFILE_WIDGET_CONFIG(symbol),
                colorTheme: "dark",
                isTransparent: true,
                width: "100%",
                height: "100%"
              }}
              height={400}
            />
          </GlassCard>
        </div>
      </div>

      {/* Financials Full Width */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-foreground">Financials</h2>
        </div>
        <TradingViewWidget
          scriptUrl={`${scriptUrl}financials.js`}
          config={{
            ...COMPANY_FINANCIALS_WIDGET_CONFIG(symbol),
            colorTheme: "dark",
            isTransparent: true,
            width: "100%",
            height: "100%"
          }}
          height={500}
        />
      </GlassCard>
    </div>
  );
}