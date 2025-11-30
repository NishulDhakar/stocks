"use client";

import TradingViewWidget from "@/components/TradingViewWidget";
import { GlassCard } from "@/components/ui/GlassCard";
import { TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";

export default function NewsPage() {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Market News</h1>
                <p className="text-muted-foreground mt-1">Stay ahead with the latest financial headlines.</p>
            </div>

            <GlassCard className="p-0 overflow-hidden min-h-[800px]">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}timeline.js`}
                    config={{
                        ...TOP_STORIES_WIDGET_CONFIG,
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
