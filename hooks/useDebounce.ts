'use client';

import { useCallback, useRef } from 'react';

/**
 * Create a debounced function that schedules `callback` to run after a specified delay.
 *
 * The returned function cancels any previously scheduled invocation and schedules a new one.
 *
 * @param callback - Function to invoke after the delay
 * @param delay - Delay in milliseconds before invoking `callback`
 * @returns A function that, when called, schedules `callback` to run after `delay` ms (cancels any prior scheduled call)
 */
export function useDebounce(callback: () => void, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay])
}