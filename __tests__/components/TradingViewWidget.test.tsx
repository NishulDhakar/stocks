import React from 'react';
import { render, screen } from '@testing-library/react';
import TradingViewWidget from '@/components/TradingViewWidget';

// Mock the hook
jest.mock('@/hooks/useTradingViewWidget', () => ({
  __esModule: true,
  default: jest.fn(() => ({ current: null })),
}));

describe('TradingViewWidget', () => {
  const mockConfig = {
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
  };

  const mockScriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-test.js';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      expect(document.querySelector('.tradingview-widget-container')).toBeInTheDocument();
    });

    it('should render with title when provided', () => {
      render(
        <TradingViewWidget
          title="Market Overview"
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      expect(screen.getByText('Market Overview')).toBeInTheDocument();
      expect(screen.getByText('Market Overview')).toHaveClass('font-semibold', 'text-2xl', 'text-gray-100', 'mb-5');
    });

    it('should not render title when not provided', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
          className="custom-chart"
        />
      );
      
      const container = document.querySelector('.tradingview-widget-container');
      expect(container).toHaveClass('custom-chart');
    });

    it('should render with default height of 600px', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      const widget = document.querySelector('.tradingview-widget-container__widget') as HTMLElement;
      expect(widget).toHaveStyle({ height: '600px' });
    });

    it('should render with custom height when provided', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
          height={800}
        />
      );
      
      const widget = document.querySelector('.tradingview-widget-container__widget') as HTMLElement;
      expect(widget).toHaveStyle({ height: '800px' });
    });

    it('should apply correct width style', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      const widget = document.querySelector('.tradingview-widget-container__widget') as HTMLElement;
      expect(widget).toHaveStyle({ width: '100%' });
    });
  });

  describe('Props validation', () => {
    it('should handle empty config object', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={{}}
        />
      );
      
      expect(document.querySelector('.tradingview-widget-container')).toBeInTheDocument();
    });

    it('should handle complex config object', () => {
      const complexConfig = {
        colorTheme: 'dark',
        dateRange: '12M',
        locale: 'en',
        tabs: [
          {
            title: 'Financial',
            symbols: [
              { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
            ],
          },
        ],
      };

      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={complexConfig}
        />
      );
      
      expect(document.querySelector('.tradingview-widget-container')).toBeInTheDocument();
    });

    it('should handle different script URLs', () => {
      const urls = [
        'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
        'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
        'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js',
      ];

      urls.forEach(url => {
        const { unmount } = render(
          <TradingViewWidget
            scriptUrl={url}
            config={mockConfig}
          />
        );
        expect(document.querySelector('.tradingview-widget-container')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Memoization', () => {
    it('should be a memoized component', () => {
      const { rerender } = render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      const firstRenderContainer = document.querySelector('.tradingview-widget-container');
      
      // Rerender with same props
      rerender(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      const secondRenderContainer = document.querySelector('.tradingview-widget-container');
      expect(firstRenderContainer).toBe(secondRenderContainer);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero height', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
          height={0}
        />
      );
      
      const widget = document.querySelector('.tradingview-widget-container__widget') as HTMLElement;
      expect(widget).toHaveStyle({ height: '0px' });
    });

    it('should handle very large height values', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
          height={10000}
        />
      );
      
      const widget = document.querySelector('.tradingview-widget-container__widget') as HTMLElement;
      expect(widget).toHaveStyle({ height: '10000px' });
    });

    it('should handle empty string className', () => {
      render(
        <TradingViewWidget
          scriptUrl={mockScriptUrl}
          config={mockConfig}
          className=""
        />
      );
      
      expect(document.querySelector('.tradingview-widget-container')).toBeInTheDocument();
    });

    it('should handle title with special characters', () => {
      const specialTitle = "Market's Overview & Data (2024)";
      render(
        <TradingViewWidget
          title={specialTitle}
          scriptUrl={mockScriptUrl}
          config={mockConfig}
        />
      );
      
      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });
  });
});