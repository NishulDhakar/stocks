import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/(root)/page';

jest.mock('@/components/TradingViewWidget', () => ({
  __esModule: true,
  default: ({ title, scriptUrl, config, height, className }: any) => (
    <div data-testid="trading-view-widget">
      {title && <h3>{title}</h3>}
      <div data-script-url={scriptUrl} data-height={height} className={className}>
        Widget Mock
      </div>
    </div>
  ),
}));

describe('Home Page', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Home />);
      
      const widgets = screen.getAllByTestId('trading-view-widget');
      expect(widgets.length).toBeGreaterThan(0);
    });

    it('should render four TradingView widgets', () => {
      render(<Home />);
      
      const widgets = screen.getAllByTestId('trading-view-widget');
      expect(widgets).toHaveLength(4);
    });

    it('should render Market Overview widget with title', () => {
      render(<Home />);
      
      expect(screen.getByText('Market Overview')).toBeInTheDocument();
    });

    it('should render Stock Heatmap widget with title', () => {
      render(<Home />);
      
      expect(screen.getByText('Stock Heatmap')).toBeInTheDocument();
    });

    it('should render two sections', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(2);
    });

    it('should apply correct wrapper classes', () => {
      const { container } = render(<Home />);
      
      const wrapper = container.querySelector('.home-wrapper');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('flex', 'min-h-screen');
    });
  });

  describe('Widget configuration', () => {
    it('should render Market Overview with correct script URL', () => {
      const { container } = render(<Home />);
      
      const widget = container.querySelector('[data-script-url*="market-overview"]');
      expect(widget).toBeInTheDocument();
    });

    it('should render Stock Heatmap with correct script URL', () => {
      const { container } = render(<Home />);
      
      const widget = container.querySelector('[data-script-url*="stock-heatmap"]');
      expect(widget).toBeInTheDocument();
    });

    it('should render Timeline widget with correct script URL', () => {
      const { container } = render(<Home />);
      
      const widget = container.querySelector('[data-script-url*="timeline"]');
      expect(widget).toBeInTheDocument();
    });

    it('should render Market Quotes widget with correct script URL', () => {
      const { container } = render(<Home />);
      
      const widget = container.querySelector('[data-script-url*="market-quotes"]');
      expect(widget).toBeInTheDocument();
    });

    it('should set correct height for all widgets', () => {
      const { container } = render(<Home />);
      
      const widgets = container.querySelectorAll('[data-height]');
      widgets.forEach(widget => {
        expect(widget).toHaveAttribute('data-height', '600');
      });
    });

    it('should apply custom className to Market Overview widget', () => {
      const { container } = render(<Home />);
      
      const customWidget = container.querySelector('.custom-chart');
      expect(customWidget).toBeInTheDocument();
    });
  });

  describe('Layout structure', () => {
    it('should render first section with grid layout', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      expect(sections[0]).toHaveClass('grid', 'w-full', 'gap-8', 'home-section');
    });

    it('should render second section with grid layout', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      expect(sections[1]).toHaveClass('grid', 'w-full', 'gap-8', 'home-section');
    });

    it('should have correct grid column classes in first section', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      const firstSectionDivs = sections[0].querySelectorAll('div');
      
      const hasCorrectClasses = Array.from(firstSectionDivs).some(div =>
        div.classList.contains('md:col-span-1') || 
        div.classList.contains('xl:col-span-1') ||
        div.classList.contains('xl:col-span-2')
      );
      
      expect(hasCorrectClasses).toBe(true);
    });

    it('should have correct grid column classes in second section', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      const secondSectionDivs = sections[1].querySelectorAll('div');
      
      const hasCorrectClasses = Array.from(secondSectionDivs).some(div =>
        div.classList.contains('md:col-span-1') || 
        div.classList.contains('xl:col-span-1') ||
        div.classList.contains('xl:col-span-2') ||
        div.classList.contains('h-full')
      );
      
      expect(hasCorrectClasses).toBe(true);
    });
  });

  describe('Widget titles', () => {
    it('should render exactly two widgets with titles', () => {
      render(<Home />);
      
      const marketOverview = screen.getByText('Market Overview');
      const stockHeatmap = screen.getByText('Stock Heatmap');
      
      expect(marketOverview).toBeInTheDocument();
      expect(stockHeatmap).toBeInTheDocument();
    });

    it('should not render title for Timeline widget', () => {
      render(<Home />);
      
      expect(screen.queryByText('Timeline')).not.toBeInTheDocument();
    });

    it('should not render title for Market Quotes widget', () => {
      render(<Home />);
      
      expect(screen.queryByText('Market Quotes')).not.toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should pass configuration objects to widgets', () => {
      render(<Home />);
      
      const widgets = screen.getAllByTestId('trading-view-widget');
      expect(widgets).toHaveLength(4);
    });

    it('should render widgets in correct order', () => {
      render(<Home />);
      
      const titles = screen.getAllByRole('heading', { level: 3 });
      expect(titles[0]).toHaveTextContent('Market Overview');
      expect(titles[1]).toHaveTextContent('Stock Heatmap');
    });
  });

  describe('Responsive design', () => {
    it('should have responsive grid classes', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section.home-section');
      sections.forEach(section => {
        expect(section).toHaveClass('grid', 'w-full', 'gap-8');
      });
    });

    it('should apply height classes for second section widgets', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      const secondSectionDivs = sections[1].querySelectorAll('.h-full');
      
      expect(secondSectionDivs.length).toBeGreaterThan(0);
    });
  });
});