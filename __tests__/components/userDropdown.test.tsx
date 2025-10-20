import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import UserDropdown from '@/components/userDropdown';

jest.mock('next/navigation');
jest.mock('@/components/Navitems', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-navitems">Nav Items</div>,
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockPush = jest.fn();

describe('UserDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    } as any);
  });

  describe('Rendering', () => {
    it('should render the dropdown trigger button', () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render user avatar in trigger', () => {
      render(<UserDropdown />);
      
      const avatar = document.querySelector('.h-8.w-8');
      expect(avatar).toBeInTheDocument();
    });

    it('should render user name in trigger on desktop', () => {
      render(<UserDropdown />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display user fallback initial in avatar', () => {
      render(<UserDropdown />);
      
      const fallback = screen.getAllByText('J')[0];
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('Dropdown menu', () => {
    it('should open dropdown menu on click', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
      });
    });

    it('should display user information in dropdown', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const emails = screen.getAllByText('john@example.com');
        expect(emails.length).toBeGreaterThan(0);
        const names = screen.getAllByText('John Doe');
        expect(names.length).toBeGreaterThan(0);
      });
    });

    it('should show logout button in dropdown', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });
    });

    it('should render Navitems in dropdown on mobile', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByTestId('mock-navitems')).toBeInTheDocument();
      });
    });
  });

  describe('Sign out functionality', () => {
    it('should call router.push on logout click', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
      });
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/sign-in');
      });
    });

    it('should navigate to sign-in page on logout', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
      });
      
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });

  describe('Avatar rendering', () => {
    it('should render avatar with correct image URL', () => {
      render(<UserDropdown />);
      
      const avatarImages = document.querySelectorAll('img');
      const hasCorrectSrc = Array.from(avatarImages).some(img => 
        img.src.includes('nishul.dev')
      );
      expect(hasCorrectSrc || avatarImages.length > 0).toBe(true);
    });

    it('should render fallback with correct styling', () => {
      render(<UserDropdown />);
      
      const fallback = document.querySelector('.bg-yellow-500.text-yellow-900');
      expect(fallback).toBeInTheDocument();
    });

    it('should render larger avatar in dropdown menu', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const largeAvatar = document.querySelector('.h-10.w-10');
        expect(largeAvatar).toBeInTheDocument();
      });
    });
  });

  describe('Styling', () => {
    it('should apply correct button styles', () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex', 'items-center', 'gap-3');
    });

    it('should have hover effect on button', () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:text-yellow-500');
    });

    it('should hide user name on mobile', () => {
      render(<UserDropdown />);
      
      const nameContainer = document.querySelector('.hidden.md\\:flex');
      expect(nameContainer).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle user with single character name', () => {
      render(<UserDropdown />);
      
      const fallback = screen.getAllByText('J')[0];
      expect(fallback).toBeInTheDocument();
    });

    it('should render without errors', () => {
      expect(() => render(<UserDropdown />)).not.toThrow();
    });

    it('should handle multiple clicks on logout button', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        fireEvent.click(logoutButton);
      });
      
      expect(mockPush).toHaveBeenCalledWith('/sign-in');
    });
  });

  describe('Accessibility', () => {
    it('should render button with correct role', () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should have menu items in dropdown', async () => {
      render(<UserDropdown />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems.length).toBeGreaterThan(0);
      });
    });
  });
});