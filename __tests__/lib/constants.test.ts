import {
  NAV_ITEMS,
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
  ALERT_TYPE_OPTIONS,
  CONDITION_OPTIONS,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HEATMAP_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  POPULAR_STOCK_SYMBOLS,
  NO_MARKET_NEWS,
  WATCHLIST_TABLE_HEADER,
} from '@/lib/constants';

describe('Constants', () => {
  describe('NAV_ITEMS', () => {
    it('should be an array', () => {
      expect(Array.isArray(NAV_ITEMS)).toBe(true);
    });

    it('should contain objects with href and label', () => {
      NAV_ITEMS.forEach(item => {
        expect(item).toHaveProperty('href');
        expect(item).toHaveProperty('label');
        expect(typeof item.href).toBe('string');
        expect(typeof item.label).toBe('string');
      });
    });

    it('should include Dashboard and Search items', () => {
      const labels = NAV_ITEMS.map(item => item.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Search');
    });

    it('should have valid href paths', () => {
      NAV_ITEMS.forEach(item => {
        expect(item.href).toMatch(/^\//);
      });
    });

    it('should not be empty', () => {
      expect(NAV_ITEMS.length).toBeGreaterThan(0);
    });
  });

  describe('Form Options', () => {
    describe('INVESTMENT_GOALS', () => {
      it('should be an array of options', () => {
        expect(Array.isArray(INVESTMENT_GOALS)).toBe(true);
      });

      it('should have value and label properties', () => {
        INVESTMENT_GOALS.forEach(option => {
          expect(option).toHaveProperty('value');
          expect(option).toHaveProperty('label');
        });
      });

      it('should include common investment goals', () => {
        const values = INVESTMENT_GOALS.map(o => o.value);
        expect(values).toContain('Growth');
        expect(values).toContain('Income');
        expect(values).toContain('Balanced');
      });
    });

    describe('RISK_TOLERANCE_OPTIONS', () => {
      it('should contain Low, Medium, and High options', () => {
        const values = RISK_TOLERANCE_OPTIONS.map(o => o.value);
        expect(values).toEqual(['Low', 'Medium', 'High']);
      });

      it('should have matching labels and values', () => {
        RISK_TOLERANCE_OPTIONS.forEach(option => {
          expect(option.value).toBe(option.label);
        });
      });
    });

    describe('PREFERRED_INDUSTRIES', () => {
      it('should include major industries', () => {
        const values = PREFERRED_INDUSTRIES.map(o => o.value);
        expect(values).toContain('Technology');
        expect(values).toContain('Healthcare');
        expect(values).toContain('Finance');
      });

      it('should have at least 5 industries', () => {
        expect(PREFERRED_INDUSTRIES.length).toBeGreaterThanOrEqual(5);
      });
    });

    describe('ALERT_TYPE_OPTIONS', () => {
      it('should contain upper and lower options', () => {
        const values = ALERT_TYPE_OPTIONS.map(o => o.value);
        expect(values).toEqual(['upper', 'lower']);
      });
    });

    describe('CONDITION_OPTIONS', () => {
      it('should contain comparison operators', () => {
        const values = CONDITION_OPTIONS.map(o => o.value);
        expect(values).toContain('greater');
        expect(values).toContain('less');
      });

      it('should have descriptive labels', () => {
        CONDITION_OPTIONS.forEach(option => {
          expect(option.label).toMatch(/[<>]/);
        });
      });
    });
  });

  describe('TradingView Widget Configs', () => {
    describe('MARKET_OVERVIEW_WIDGET_CONFIG', () => {
      it('should have dark color theme', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.colorTheme).toBe('dark');
      });

      it('should be transparent', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.isTransparent).toBe(true);
      });

      it('should have tabs with symbols', () => {
        expect(Array.isArray(MARKET_OVERVIEW_WIDGET_CONFIG.tabs)).toBe(true);
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.tabs.length).toBeGreaterThan(0);
      });

      it('should include Financial, Technology, and Services tabs', () => {
        const tabTitles = MARKET_OVERVIEW_WIDGET_CONFIG.tabs.map(t => t.title);
        expect(tabTitles).toContain('Financial');
        expect(tabTitles).toContain('Technology');
        expect(tabTitles).toContain('Services');
      });

      it('should have valid symbols in tabs', () => {
        MARKET_OVERVIEW_WIDGET_CONFIG.tabs.forEach(tab => {
          expect(Array.isArray(tab.symbols)).toBe(true);
          tab.symbols.forEach(symbol => {
            expect(symbol).toHaveProperty('s');
            expect(symbol).toHaveProperty('d');
          });
        });
      });

      it('should have full width and specific height', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.width).toBe('100%');
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.height).toBe(600);
      });

      it('should have color configurations', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('plotLineColorGrowing');
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('plotLineColorFalling');
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('backgroundColor');
      });
    });

    describe('HEATMAP_WIDGET_CONFIG', () => {
      it('should use SPX500 as data source', () => {
        expect(HEATMAP_WIDGET_CONFIG.dataSource).toBe('SPX500');
      });

      it('should enable zoom', () => {
        expect(HEATMAP_WIDGET_CONFIG.isZoomEnabled).toBe(true);
      });

      it('should have symbol tooltip enabled', () => {
        expect(HEATMAP_WIDGET_CONFIG.hasSymbolTooltip).toBe(true);
      });

      it('should group by sector', () => {
        expect(HEATMAP_WIDGET_CONFIG.grouping).toBe('sector');
      });

      it('should have correct dimensions', () => {
        expect(HEATMAP_WIDGET_CONFIG.width).toBe('100%');
        expect(HEATMAP_WIDGET_CONFIG.height).toBe('600');
      });
    });

    describe('TOP_STORIES_WIDGET_CONFIG', () => {
      it('should have market feed mode', () => {
        expect(TOP_STORIES_WIDGET_CONFIG.feedMode).toBe('market');
      });

      it('should display stock market news', () => {
        expect(TOP_STORIES_WIDGET_CONFIG.market).toBe('stock');
      });

      it('should use regular display mode', () => {
        expect(TOP_STORIES_WIDGET_CONFIG.displayMode).toBe('regular');
      });
    });

    describe('MARKET_DATA_WIDGET_CONFIG', () => {
      it('should have title as Stocks', () => {
        expect(MARKET_DATA_WIDGET_CONFIG.title).toBe('Stocks');
      });

      it('should show symbol logos', () => {
        expect(MARKET_DATA_WIDGET_CONFIG.showSymbolLogo).toBe(true);
      });

      it('should have symbol groups', () => {
        expect(Array.isArray(MARKET_DATA_WIDGET_CONFIG.symbolsGroups)).toBe(true);
        expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups.length).toBeGreaterThan(0);
      });

      it('should have non-transparent background', () => {
        expect(MARKET_DATA_WIDGET_CONFIG.isTransparent).toBe(false);
        expect(MARKET_DATA_WIDGET_CONFIG.backgroundColor).toBe('#0F0F0F');
      });

      it('should include major stock symbols', () => {
        const allSymbols = MARKET_DATA_WIDGET_CONFIG.symbolsGroups.flatMap(
          group => group.symbols.map(s => s.name)
        );
        expect(allSymbols).toContain('NASDAQ:AAPL');
        expect(allSymbols).toContain('NASDAQ:GOOGL');
      });
    });

    describe('Symbol-specific configs', () => {
      describe('SYMBOL_INFO_WIDGET_CONFIG', () => {
        it('should be a function', () => {
          expect(typeof SYMBOL_INFO_WIDGET_CONFIG).toBe('function');
        });

        it('should return config with uppercased symbol', () => {
          const config = SYMBOL_INFO_WIDGET_CONFIG('aapl');
          expect(config.symbol).toBe('AAPL');
        });

        it('should have correct dimensions', () => {
          const config = SYMBOL_INFO_WIDGET_CONFIG('AAPL');
          expect(config.width).toBe('100%');
          expect(config.height).toBe(170);
        });

        it('should be dark themed and transparent', () => {
          const config = SYMBOL_INFO_WIDGET_CONFIG('AAPL');
          expect(config.colorTheme).toBe('dark');
          expect(config.isTransparent).toBe(true);
        });
      });

      describe('CANDLE_CHART_WIDGET_CONFIG', () => {
        it('should return config with uppercased symbol', () => {
          const config = CANDLE_CHART_WIDGET_CONFIG('tsla');
          expect(config.symbol).toBe('TSLA');
        });

        it('should not allow symbol change', () => {
          const config = CANDLE_CHART_WIDGET_CONFIG('AAPL');
          expect(config.allow_symbol_change).toBe(false);
        });

        it('should use daily interval', () => {
          const config = CANDLE_CHART_WIDGET_CONFIG('AAPL');
          expect(config.interval).toBe('D');
        });

        it('should have candlestick style', () => {
          const config = CANDLE_CHART_WIDGET_CONFIG('AAPL');
          expect(config.style).toBe(1);
        });
      });

      describe('BASELINE_WIDGET_CONFIG', () => {
        it('should have baseline chart style', () => {
          const config = BASELINE_WIDGET_CONFIG('AAPL');
          expect(config.style).toBe(10);
        });

        it('should convert symbol to uppercase', () => {
          const config = BASELINE_WIDGET_CONFIG('msft');
          expect(config.symbol).toBe('MSFT');
        });
      });

      describe('TECHNICAL_ANALYSIS_WIDGET_CONFIG', () => {
        it('should use 1-hour interval', () => {
          const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('AAPL');
          expect(config.interval).toBe('1h');
        });

        it('should have correct height', () => {
          const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('AAPL');
          expect(config.height).toBe(400);
        });
      });

      describe('COMPANY_PROFILE_WIDGET_CONFIG', () => {
        it('should have correct height', () => {
          const config = COMPANY_PROFILE_WIDGET_CONFIG('AAPL');
          expect(config.height).toBe(440);
        });

        it('should uppercase symbol', () => {
          const config = COMPANY_PROFILE_WIDGET_CONFIG('googl');
          expect(config.symbol).toBe('GOOGL');
        });
      });

      describe('COMPANY_FINANCIALS_WIDGET_CONFIG', () => {
        it('should have regular display mode', () => {
          const config = COMPANY_FINANCIALS_WIDGET_CONFIG('AAPL');
          expect(config.displayMode).toBe('regular');
        });

        it('should have correct height', () => {
          const config = COMPANY_FINANCIALS_WIDGET_CONFIG('AAPL');
          expect(config.height).toBe(464);
        });
      });
    });
  });

  describe('POPULAR_STOCK_SYMBOLS', () => {
    it('should be an array of strings', () => {
      expect(Array.isArray(POPULAR_STOCK_SYMBOLS)).toBe(true);
      POPULAR_STOCK_SYMBOLS.forEach(symbol => {
        expect(typeof symbol).toBe('string');
      });
    });

    it('should include major tech stocks', () => {
      expect(POPULAR_STOCK_SYMBOLS).toContain('AAPL');
      expect(POPULAR_STOCK_SYMBOLS).toContain('MSFT');
      expect(POPULAR_STOCK_SYMBOLS).toContain('GOOGL');
      expect(POPULAR_STOCK_SYMBOLS).toContain('AMZN');
    });

    it('should include Tesla', () => {
      expect(POPULAR_STOCK_SYMBOLS).toContain('TSLA');
    });

    it('should have at least 50 symbols', () => {
      expect(POPULAR_STOCK_SYMBOLS.length).toBeGreaterThanOrEqual(50);
    });

    it('should contain only uppercase symbols', () => {
      POPULAR_STOCK_SYMBOLS.forEach(symbol => {
        expect(symbol).toBe(symbol.toUpperCase());
      });
    });

    it('should not have duplicates', () => {
      const uniqueSymbols = new Set(POPULAR_STOCK_SYMBOLS);
      expect(uniqueSymbols.size).toBe(POPULAR_STOCK_SYMBOLS.length);
    });
  });

  describe('NO_MARKET_NEWS', () => {
    it('should be a string', () => {
      expect(typeof NO_MARKET_NEWS).toBe('string');
    });

    it('should contain HTML paragraph tag', () => {
      expect(NO_MARKET_NEWS).toContain('<p');
      expect(NO_MARKET_NEWS).toContain('</p>');
    });

    it('should have meaningful message', () => {
      expect(NO_MARKET_NEWS).toContain('No market news available');
    });
  });

  describe('WATCHLIST_TABLE_HEADER', () => {
    it('should be an array', () => {
      expect(Array.isArray(WATCHLIST_TABLE_HEADER)).toBe(true);
    });

    it('should contain expected headers', () => {
      expect(WATCHLIST_TABLE_HEADER).toContain('Company');
      expect(WATCHLIST_TABLE_HEADER).toContain('Symbol');
      expect(WATCHLIST_TABLE_HEADER).toContain('Price');
      expect(WATCHLIST_TABLE_HEADER).toContain('Change');
    });

    it('should have at least 6 columns', () => {
      expect(WATCHLIST_TABLE_HEADER.length).toBeGreaterThanOrEqual(6);
    });

    it('should contain only strings', () => {
      WATCHLIST_TABLE_HEADER.forEach(header => {
        expect(typeof header).toBe('string');
      });
    });
  });

  describe('Config consistency', () => {
    it('all widget configs should use dark theme', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.colorTheme).toBe('dark');
      expect(HEATMAP_WIDGET_CONFIG.colorTheme).toBe('dark');
      expect(TOP_STORIES_WIDGET_CONFIG.colorTheme).toBe('dark');
      expect(MARKET_DATA_WIDGET_CONFIG.colorTheme).toBe('dark');
    });

    it('all widget configs should use English locale', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.locale).toBe('en');
      expect(HEATMAP_WIDGET_CONFIG.locale).toBe('en');
      expect(TOP_STORIES_WIDGET_CONFIG.locale).toBe('en');
      expect(MARKET_DATA_WIDGET_CONFIG.locale).toBe('en');
    });

    it('most widgets should be transparent', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.isTransparent).toBe(true);
      expect(HEATMAP_WIDGET_CONFIG.isTransparent).toBe(true);
      expect(TOP_STORIES_WIDGET_CONFIG.isTransparent).toBe(true);
    });

    it('all widgets should use full width', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.width).toBe('100%');
      expect(HEATMAP_WIDGET_CONFIG.width).toBe('100%');
      expect(TOP_STORIES_WIDGET_CONFIG.width).toBe('100%');
    });
  });

  describe('Type consistency', () => {
    it('option arrays should have consistent structure', () => {
      const optionArrays = [
        INVESTMENT_GOALS,
        RISK_TOLERANCE_OPTIONS,
        PREFERRED_INDUSTRIES,
        ALERT_TYPE_OPTIONS,
        CONDITION_OPTIONS,
      ];

      optionArrays.forEach(options => {
        options.forEach(option => {
          expect(option).toHaveProperty('value');
          expect(option).toHaveProperty('label');
          expect(typeof option.value).toBe('string');
          expect(typeof option.label).toBe('string');
        });
      });
    });
  });
});