'use client';

import React, { memo } from 'react';
import { cn } from "@/lib/utils";
import useTradingViewWidget from '@/hooks/useTradingViewWidget';

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number | string;
    className?: string;
}

const TradingViewWidget = ({ title, scriptUrl, config, height = 600, className }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, typeof height === 'number' ? height : undefined);

    return (
        <div className="w-full h-full flex flex-col">
            {title && <h3 className="font-semibold text-xl text-foreground mb-4">{title}</h3>}
            <div
                className={cn('tradingview-widget-container flex-1 w-full', className)}
                ref={containerRef}
                style={{ height: height }}
            >
                <div className="tradingview-widget-container__widget w-full h-full" />
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);