import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DynamicTabs from '@/components/DynamicTabs';

describe('DynamicTabs', () => {
  const mockTabs = [
    {
      id: 'tab1',
      title: 'Tab 1',
      content: <div data-testid="content-1">Content 1</div>,
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      content: <div data-testid="content-2">Content 2</div>,
    },
  ];

  it('renders all tab triggers', () => {
    render(<DynamicTabs tabs={mockTabs} />);
    
    expect(screen.getByText('Tab 1')).toBeTruthy();
    expect(screen.getByText('Tab 2')).toBeTruthy();
  });

  it('renders default tab content', () => {
    render(<DynamicTabs tabs={mockTabs} />);
    
    expect(screen.getByTestId('content-1')).toBeTruthy();
  });

  it('switches content when clicking tab', async () => {
    render(<DynamicTabs tabs={mockTabs} />);
    expect(screen.getByTestId('content-1')).toBeTruthy();
    expect(screen.queryByTestId('content-2')).toBeNull();
    
    const tab2 = screen.getByText('Tab 2');

    fireEvent.click(tab2);

    expect(screen.getByTestId('content-2')).toBeTruthy();
    expect(screen.queryByTestId('content-1')).toBeNull();
  });

  it('respects defaultValue prop', () => {
    render(<DynamicTabs tabs={mockTabs} defaultValue="tab2" />);
    
    expect(screen.getByTestId('content-2')).toBeTruthy();
    expect(screen.queryByTestId('content-1')).toBeNull();
  });
});
