import LazyTradingViewWidget from "@/components/LazyTradingViewWidget";
import { auth } from "@/lib/batter-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { GlassCard } from "@/components/ui/GlassCard";
import { Loader2 } from "lucide-react";

import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import { ArrowUpRight, TrendingUp, Wallet, Activity, Sparkles, Calendar } from "lucide-react";

const Home = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) redirect('/sign-in');
    const user = session.user;

    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    {/* <div className="flex items-center gap-2 text-yellow-500 mb-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium tracking-wide uppercase">Premium Overview</span>
                    </div> */}
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Hello, <span className="text-gradient-gold"> {user.name}</span>
                    </h1>
                    {/* <p className="text-muted-foreground mt-2 text-lg">
                        Your wealth is growing. Here's your daily briefing.
                    </p> */}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{currentDate}</span>
                </div>
            </div>

            {/* Portfolio Summary Section - Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Portfolio */}
                {/* <GlassCard hoverEffect className="relative overflow-hidden group border-l-4 border-l-yellow-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <Wallet className="h-32 w-32 text-yellow-500 rotate-12" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Portfolio Value</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-foreground tracking-tight">$124,592.00</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                                <ArrowUpRight className="h-3 w-3" />
                                <span>+$1,240.50 (1.2%)</span>
                            </div>
                            <span className="text-xs text-muted-foreground">vs yesterday</span>
                        </div>
                    </div>
                </GlassCard> */}

                {/* Day's Gain */}
                {/* <GlassCard hoverEffect className="relative overflow-hidden group border-l-4 border-l-emerald-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <TrendingUp className="h-32 w-32 text-emerald-500 rotate-12" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Day's Gain</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-foreground tracking-tight">$1,240.50</span>
                        </div>
                        <div className="mt-5 relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-[65%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-right">Target: $2,000.00</p>
                    </div>
                </GlassCard> */}

                {/* Buying Power */}
                {/* <GlassCard hoverEffect className="relative overflow-hidden group border-l-4 border-l-purple-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <Activity className="h-32 w-32 text-purple-500 rotate-12" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Buying Power</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-foreground tracking-tight">$12,450.00</span>
                            </div>
                        </div>
                        <button className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-foreground transition-all hover:scale-[1.02] active:scale-[0.98]">
                            + Deposit Funds
                        </button>
                    </div>
                </GlassCard> */}
            </div>

            {/* Bento Grid Layout for Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart - Market Overview (Span 2) */}
                <GlassCard className="lg:col-span-2 p-0 overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-400" />
                            Market Overview
                        </h2>
                    </div>
                    <div className="flex-1 min-h-[450px]">
                        <LazyTradingViewWidget
                            title="Market Overview"
                            scriptUrl={`${scriptUrl}market-overview.js`}
                            config={{
                                ...MARKET_OVERVIEW_WIDGET_CONFIG,
                                colorTheme: "dark",
                                isTransparent: true,
                                width: "100%",
                                height: "100%"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </GlassCard>

                {/* Top Stories (Span 1) */}
                <GlassCard className="lg:col-span-1 p-0 overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-yellow-400" />
                            Top Stories
                        </h2>
                    </div>
                    <div className="flex-1 min-h-[450px]">
                        <LazyTradingViewWidget
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
                    </div>
                </GlassCard>

                {/* Market Heatmap (Span 2) */}
                <GlassCard className="lg:col-span-2 p-0 overflow-hidden min-h-[400px] flex flex-col">
                    <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                            Market Heatmap
                        </h2>
                    </div>
                    <div className="flex-1 min-h-[350px]">
                        <LazyTradingViewWidget
                            title="Stock Heatmap"
                            scriptUrl={`${scriptUrl}stock-heatmap.js`}
                            config={{
                                ...HEATMAP_WIDGET_CONFIG,
                                colorTheme: "dark",
                                isTransparent: true,
                                width: "100%",
                                height: "100%"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </GlassCard>

                {/* Market Quotes (Span 1) */}
                <GlassCard className="lg:col-span-1 p-0 overflow-hidden min-h-[400px] flex flex-col">
                    <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Activity className="h-4 w-4 text-purple-400" />
                            Live Quotes
                        </h2>
                    </div>
                    <div className="flex-1 min-h-[350px]">
                        <LazyTradingViewWidget
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
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Home;