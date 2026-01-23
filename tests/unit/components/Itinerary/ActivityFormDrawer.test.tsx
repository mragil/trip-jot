import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ActivityFormDrawer from '@/components/Itinerary/ActivityFormDrawer';
import * as useMediaQueryHook from '@/hooks/useMediaQuery';

vi.mock('@/components/Itinerary/ActivityForm', () => ({
  default: ({ onCancel }: { onCancel: () => void }) => (
    <div data-testid="activity-form">
      Activity Form Content
      <button onClick={onCancel} data-testid="cancel-button">Cancel</button>
    </div>
  ),
}));

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
    open ? <div data-testid="dialog">{children}</div> : null
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
}));

vi.mock('@/components/ui/drawer', () => ({
  Drawer: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
    open ? <div data-testid="drawer">{children}</div> : null
  ),
  DrawerContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-content">{children}</div>
  ),
  DrawerFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-footer">{children}</div>
  ),
  DrawerClose: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-close">{children}</div>
  ),
}));

describe('ActivityFormDrawer', () => {
  const defaultProps = {
    isFormOpen: true,
    setIsFormOpen: vi.fn(),
    tripId: 1,
    date: new Date('2023-01-01'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Dialog on desktop', () => {
    vi.spyOn(useMediaQueryHook, 'default').mockReturnValue(true);

    render(<ActivityFormDrawer {...defaultProps} />);

    expect(screen.getByTestId('dialog')).toBeTruthy();
    expect(screen.getByTestId('activity-form')).toBeTruthy();
    expect(screen.queryByTestId('drawer')).toBeNull();
  });

  it('renders Drawer on mobile', () => {
    vi.spyOn(useMediaQueryHook, 'default').mockReturnValue(false);

    render(<ActivityFormDrawer {...defaultProps} />);

    expect(screen.getByTestId('drawer')).toBeTruthy();
    expect(screen.getByTestId('activity-form')).toBeTruthy();
    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  it('does not render content when closed', () => {
    vi.spyOn(useMediaQueryHook, 'default').mockReturnValue(true);

    render(<ActivityFormDrawer {...defaultProps} isFormOpen={false} />);

    expect(screen.queryByTestId('dialog')).toBeNull();
    expect(screen.queryByTestId('drawer')).toBeNull();
  });

  it('calls setIsFormOpen(false) when cancelled from form', () => {
     vi.spyOn(useMediaQueryHook, 'default').mockReturnValue(true);
     render(<ActivityFormDrawer {...defaultProps} />);
     const cancelButton = screen.getByTestId('cancel-button');
     
     fireEvent.click(cancelButton);
     
     expect(defaultProps.setIsFormOpen).toHaveBeenCalledWith(false);
  });
});
