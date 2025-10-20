import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navitems from '@/components/Navitems';
import { NAV_ITEMS } from '@/lib/constants';

jest.mock('next/navigation');

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navitems', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all navigation items', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<Navitems />);
      
      NAV_ITEMS.forEach(item => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    it('should render correct number of navigation items', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<Navitems />);
      
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(NAV_ITEMS.length);
    });

    it('should render as an unordered list', () => {
      mockUsePathname.mockReturnValue('/');
      
      const { container } = render(<Navitems />);
      
      expect(container.querySelector('ul')).toBeInTheDocument();
    });

    it('should apply correct CSS classes to the list', () => {
      mockUsePathname.mockReturnValue('/');
      
      const { container } = render(<Navitems />);
      
      const list = container.querySelector('ul');
      expect(list).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-3', 'sm:gap-10');
    });
  });

  describe('Active state', () => {
    it('should highlight home link when on home page', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<Navitems />);
      
      const homeLink = screen.getByText('Dashboard');
      expect(homeLink).toHaveClass('text-gray-100');
    });

    it('should highlight search link when on search page', () => {
      mockUsePathname.mockReturnValue('/search');
      
      render(<Navitems />);
      
      const searchLink = screen.getByText('Search');
      expect(searchLink).toHaveClass('text-gray-100');
    });

    it('should not highlight home link when on search page', () => {
      mockUsePathname.mockReturnValue('/search');
      
      render(<Navitems />);
      
      const homeLink = screen.getByText('Dashboard');
      expect(homeLink).not.toHaveClass('text-gray-100');
    });

    it('should highlight link when on nested path', () => {
      mockUsePathname.mockReturnValue('/search/results');
      
      render(<Navitems />);
      
      const searchLink = screen.getByText('Search');
      expect(searchLink).toHaveClass('text-gray-100');
    });

    it('should only highlight home when exactly on home page', () => {
      mockUsePathname.mockReturnValue('/other-page');
      
      render(<Navitems />);
      
      const homeLink = screen.getByText('Dashboard');
      expect(homeLink).not.toHaveClass('text-gray-100');
    });
  });

  describe('Link attributes', () => {
    it('should set correct href for each link', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<Navitems />);
      
      NAV_ITEMS.forEach(item => {
        const link = screen.getByText(item.label).closest('a');
        expect(link).toHaveAttribute('href', item.href);
      });
    });

    it('should apply hover classes to all links', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<Navitems />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('hover:text-yellow-500', 'transition-colors');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined pathname', () => {
      mockUsePathname.mockReturnValue(undefined as any);
      
      expect(() => render(<Navitems />)).not.toThrow();
    });

    it('should handle empty string pathname', () => {
      mockUsePathname.mockReturnValue('');
      
      render(<Navitems />);
      
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(NAV_ITEMS.length);
    });

    it('should handle pathname with trailing slash', () => {
      mockUsePathname.mockReturnValue('/search/');
      
      render(<Navitems />);
      
      const searchLink = screen.getByText('Search');
      expect(searchLink).toHaveClass('text-gray-100');
    });

    it('should handle pathname with query parameters', () => {
      mockUsePathname.mockReturnValue('/search?q=test');
      
      render(<Navitems />);
      
      const searchLink = screen.getByText('Search');
      expect(searchLink).toHaveClass('text-gray-100');
    });
  });

  describe('Accessibility', () => {
    it('should render semantic list items', () => {
      mockUsePathname.mockReturnValue('/');
      
      const { container } = render(<Navitems />);
      
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(NAV_ITEMS.length);
    });

    it('should have proper link structure', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<Navitems />);
      
      const links = screen.getAllByRole('link');
      links.forEach((link, index) => {
        expect(link).toHaveTextContent(NAV_ITEMS[index].label);
        expect(link).toHaveAttribute('href');
      });
    });
  });
});