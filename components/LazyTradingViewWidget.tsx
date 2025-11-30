'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const TradingViewWidget = dynamic(
    () => import('./TradingViewWidget'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse rounded-lg">
                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
            </div>
        )
    }
);

export default TradingViewWidget;
