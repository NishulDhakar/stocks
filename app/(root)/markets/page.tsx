"use client";

import TradingViewWidget from "@/components/TradingViewWidget";
import { GlassCard } from "@/components/ui/GlassCard";
import {
    FOREX_CROSS_RATES_WIDGET_CONFIG,
    CRYPTO_COINS_HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG
} from "@/lib/constants";

export default function MarketsPage() {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Global Markets</h1>
                <p className="text-muted-foreground mt-1">Real-time data across stocks, forex, and crypto.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <GlassCard className="p-0 overflow-hidden min-h-[500px]">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-lg font-semibold text-foreground">Forex Cross Rates</h2>
                    </div>
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}forex-cross-rates.js`}
                        config={{
                            ...FOREX_CROSS_RATES_WIDGET_CONFIG,
                            colorTheme: "dark",
                            isTransparent: true,
                            width: "100%",
                            height: "100%"
                        }}
                        className="w-full h-full"
                    />
                </GlassCard>

                <GlassCard className="p-0 overflow-hidden min-h-[500px]">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-lg font-semibold text-foreground">Crypto Heatmap</h2>
                    </div>
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}crypto-coins-heatmap.js`}
                        config={{
                            ...CRYPTO_COINS_HEATMAP_WIDGET_CONFIG,
                            colorTheme: "dark",
                            isTransparent: true,
                            width: "100%",
                            height: "100%"
                        }}
                        className="w-full h-full"
                    />
                </GlassCard>
            </div>

            <GlassCard className="p-0 overflow-hidden min-h-[600px]">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-lg font-semibold text-foreground">Global Indices & Futures</h2>
                </div>
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}market-quotes.js`}
                    config={{
                        ...MARKET_DATA_WIDGET_CONFIG,
                        colorTheme: "dark",
                        isTransparent: true,
                        width: "100%",
                        height: "100%"
                    }}
                    className="w-full h-full"
                />
            </GlassCard>
        </div>
    );
}
