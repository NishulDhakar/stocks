'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '../batter-auth/auth';


export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function addToWatchlist(symbol: string, company: string): Promise<{ success: boolean; message: string }> {
  try {
    const { auth } = await import('../batter-auth/auth');
    const session = await auth.api.getSession({ headers: await import('next/headers').then(m => m.headers()) });
    if (!session?.user?.id) {
      return { success: false, message: 'User not authenticated' };
    }

    const mongoose = await connectToDatabase();
    const userId = session.user.id;

    // Check if already in watchlist
    const existing = await Watchlist.findOne({ userId, symbol: symbol.toUpperCase() });
    if (existing) {
      return { success: false, message: 'Stock already in watchlist' };
    }

    await Watchlist.create({
      userId,
      symbol: symbol.toUpperCase(),
      company: company.trim(),
    });

    return { success: true, message: 'Stock added to watchlist' };
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return { success: false, message: 'Failed to add stock to watchlist' };
  }
}

export async function removeFromWatchlist(symbol: string): Promise<{ success: boolean; message: string }> {
  try {
    const { auth } = await import('../batter-auth/auth');
    const session = await auth.api.getSession({ headers: await import('next/headers').then(m => m.headers()) });
    if (!session?.user?.id) {
      return { success: false, message: 'User not authenticated' };
    }

    const mongoose = await connectToDatabase();
    const userId = session.user.id;

    const result = await Watchlist.deleteOne({ userId, symbol: symbol.toUpperCase() });
    
    if (result.deletedCount === 0) {
      return { success: false, message: 'Stock not found in watchlist' };
    }

    return { success: true, message: 'Stock removed from watchlist' };
  } catch (err) {
    console.error('removeFromWatchlist error:', err);
    return { success: false, message: 'Failed to remove stock from watchlist' };
  }
}

export async function getWatchlistWithData(): Promise<StockWithData[]> {
  try {
    const { auth } = await import('../batter-auth/auth');
    const session = await auth.api.getSession({ headers: await import('next/headers').then(m => m.headers()) });
    if (!session?.user?.id) {
      return [];
    }

    const mongoose = await connectToDatabase();
    const userId = session.user.id;

    const watchlistItems = await Watchlist.find({ userId }).lean();
    
    // Fetch real-time data for each stock with timeout and caching
    const token = process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? '';
    const stocksWithData = await Promise.allSettled(
      watchlistItems.map(async (item) => {
        try {
          // Use Promise.race to timeout after 3 seconds
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 3000)
          );

          const quotePromise = fetch(`https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${token}`);
          const profilePromise = fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${item.symbol}&token=${token}`);

          const [quoteResponse, profileResponse] = await Promise.race([
            Promise.allSettled([quotePromise, profilePromise]),
            timeoutPromise
          ]) as [PromiseSettledResult<Response>, PromiseSettledResult<Response>];

          const quoteData = quoteResponse.status === 'fulfilled' && quoteResponse.value.ok 
            ? await quoteResponse.value.json() 
            : {};
          const profileData = profileResponse.status === 'fulfilled' && profileResponse.value.ok 
            ? await profileResponse.value.json() 
            : {};

          const currentPrice = quoteData.c || 0;
          const previousClose = quoteData.pc || currentPrice;
          const changePercent = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;

          return {
            userId: item.userId,
            symbol: item.symbol,
            company: item.company,
            addedAt: item.addedAt,
            currentPrice: currentPrice,
            changePercent: changePercent,
            priceFormatted: currentPrice ? `$${currentPrice.toFixed(2)}` : 'N/A',
            changeFormatted: changePercent !== 0 ? `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%` : 'N/A',
            marketCap: profileData.marketCapitalization ? `$${(profileData.marketCapitalization / 1000000000).toFixed(1)}B` : 'N/A',
            peRatio: profileData.pe ? profileData.pe.toFixed(2) : 'N/A'
          };
        } catch (error) {
          console.error(`Error fetching data for ${item.symbol}:`, error);
          return {
            userId: item.userId,
            symbol: item.symbol,
            company: item.company,
            addedAt: item.addedAt,
            currentPrice: 0,
            changePercent: 0,
            priceFormatted: 'N/A',
            changeFormatted: 'N/A',
            marketCap: 'N/A',
            peRatio: 'N/A'
          };
        }
      })
    );

    // Extract successful results
    const successfulResults = stocksWithData
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);

    return successfulResults;
  } catch (err) {
    console.error('getWatchlistWithData error:', err);
    return [];
  }
}