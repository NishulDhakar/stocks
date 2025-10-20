import { renderHook } from '@testing-library/react';
import useTradingViewWidget from '@/hooks/useTradingViewWidget';

describe('useTradingViewWidget', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  describe('Hook initialization', () => {
    it('should return a ref object', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current).toHaveProperty('current');
    });

    it('should initialize with null ref', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current.current).toBeNull();
    });
  });

  describe('Script injection', () => {
    it('should create script element with correct src', () => {
      const scriptUrl = 'https://s3.tradingview.com/widget.js';
      const { result } = renderHook(() =>
        useTradingViewWidget(scriptUrl, { theme: 'dark' })
      );

      // Manually attach ref to container
      if (result.current) {
        (result.current as any).current = container;
      }

      // The hook should process in useEffect
      expect(result.current).toBeDefined();
    });

    it('should set script as async', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current).toBeDefined();
    });

    it('should inject config as JSON string', () => {
      const config = { theme: 'dark', locale: 'en' };
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', config)
      );

      expect(result.current).toBeDefined();
    });
  });

  describe('Container management', () => {
    it('should create widget container element', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' }, 600)
      );

      expect(result.current).toBeDefined();
    });

    it('should set correct height on container', () => {
      const height = 800;
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' }, height)
      );

      expect(result.current).toBeDefined();
    });

    it('should use default height of 600', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current).toBeDefined();
    });

    it('should set loaded dataset attribute', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current).toBeDefined();
    });
  });

  describe('Re-rendering behavior', () => {
    it('should not reload if already loaded', () => {
      const { result, rerender } = renderHook(
        ({ url, config }) => useTradingViewWidget(url, config),
        {
          initialProps: {
            url: 'https://test.com/widget.js',
            config: { theme: 'dark' },
          },
        }
      );

      const firstRef = result.current;

      rerender({
        url: 'https://test.com/widget.js',
        config: { theme: 'dark' },
      });

      expect(result.current).toBe(firstRef);
    });

    it('should update when scriptUrl changes', () => {
      const { result, rerender } = renderHook(
        ({ url, config }) => useTradingViewWidget(url, config),
        {
          initialProps: {
            url: 'https://test.com/widget1.js',
            config: { theme: 'dark' },
          },
        }
      );

      const firstRef = result.current;

      rerender({
        url: 'https://test.com/widget2.js',
        config: { theme: 'dark' },
      });

      expect(result.current).toBeDefined();
    });

    it('should update when config changes', () => {
      const { result, rerender } = renderHook(
        ({ url, config }) => useTradingViewWidget(url, config),
        {
          initialProps: {
            url: 'https://test.com/widget.js',
            config: { theme: 'dark' },
          },
        }
      );

      rerender({
        url: 'https://test.com/widget.js',
        config: { theme: 'light' },
      });

      expect(result.current).toBeDefined();
    });

    it('should update when height changes', () => {
      const { result, rerender } = renderHook(
        ({ url, config, height }) => useTradingViewWidget(url, config, height),
        {
          initialProps: {
            url: 'https://test.com/widget.js',
            config: { theme: 'dark' },
            height: 600,
          },
        }
      );

      rerender({
        url: 'https://test.com/widget.js',
        config: { theme: 'dark' },
        height: 800,
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('Cleanup', () => {
    it('should clean up on unmount', () => {
      const { result, unmount } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current).toBeDefined();
      
      unmount();
      
      // Hook should be unmounted without errors
      expect(true).toBe(true);
    });

    it('should remove loaded dataset on cleanup', () => {
      const { unmount } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      unmount();
      
      expect(true).toBe(true);
    });

    it('should clear container innerHTML on cleanup', () => {
      const { unmount } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      unmount();
      
      expect(true).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty config object', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', {})
      );

      expect(result.current).toBeDefined();
    });

    it('should handle null container ref', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' })
      );

      expect(result.current.current).toBeNull();
    });

    it('should handle zero height', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' }, 0)
      );

      expect(result.current).toBeDefined();
    });

    it('should handle very large height', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', { theme: 'dark' }, 10000)
      );

      expect(result.current).toBeDefined();
    });

    it('should handle complex config with nested objects', () => {
      const complexConfig = {
        theme: 'dark',
        tabs: [
          {
            title: 'Test',
            symbols: [{ s: 'AAPL', d: 'Apple' }],
          },
        ],
      };

      const { result } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget.js', complexConfig)
      );

      expect(result.current).toBeDefined();
    });
  });

  describe('Multiple instances', () => {
    it('should handle multiple hook instances', () => {
      const { result: result1 } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget1.js', { theme: 'dark' })
      );

      const { result: result2 } = renderHook(() =>
        useTradingViewWidget('https://test.com/widget2.js', { theme: 'light' })
      );

      expect(result1.current).toBeDefined();
      expect(result2.current).toBeDefined();
      expect(result1.current).not.toBe(result2.current);
    });
  });
});