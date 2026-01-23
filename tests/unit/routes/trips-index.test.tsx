import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Route } from '@/routes/trips.index';
import { useTrips } from '@/hooks/useTrips';
import { useUserStore } from '@/store/user';

vi.mock('@/hooks/useTrips', () => ({
    useTrips: vi.fn(),
}));

vi.mock('@/store/user', () => ({
    useUserStore: vi.fn(),
}));

vi.mock('@/components/Trip/TripCard', () => ({
    default: ({ trip }: any) => <div data-testid="trip-card">{trip.name}</div>
}));

vi.mock('@/components/Trip/EmptyTripCard', () => ({
    default: () => <div data-testid="empty-trip-card">No trips</div>
}));

vi.mock('@/components/Trip/TripCardSkeleton', () => ({
    default: () => <div data-testid="trip-skeleton">Skeleton</div>
}));

vi.mock('@/components/Trip/TripErrorState', () => ({
    default: ({ onRetry }: any) => <button onClick={onRetry} data-testid="retry-button">Retry</button>
}));

vi.mock('@tanstack/react-router', () => ({
    createFileRoute: () => (config: any) => ({
        component: config.component,
    }),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>
}));

describe('Trips Index Route', () => {
    const TripsIndexComponent = (Route as any).component;

    beforeEach(() => {
        vi.clearAllMocks();
        (useTrips as any).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });
        (useUserStore as any).mockImplementation((selector: any) => selector({ user: { name: 'John Doe' } }));
    });

    it('renders loading state', () => {
        (useTrips as any).mockReturnValue({ isLoading: true });

        render(<TripsIndexComponent />);

        expect(screen.getAllByTestId('trip-skeleton').length).toBeGreaterThan(0);
    });

    it('renders error state', () => {
        (useTrips as any).mockReturnValue({ isError: true });

        render(<TripsIndexComponent />);

        expect(screen.getByTestId('retry-button')).toBeTruthy();
        expect(screen.getByText('Hi, User')).toBeTruthy();
    });

    it('renders success state with trips', () => {
        (useTrips as any).mockReturnValue({ 
            data: [{ id: 1, name: 'Trip 1' }],
            isLoading: false
        });

        render(<TripsIndexComponent />);

        expect(screen.getByText('Hi, John Doe')).toBeTruthy();
        expect(screen.getByTestId('trip-card')).toBeTruthy();
        expect(screen.getByText('Trip 1')).toBeTruthy();
    });

    it('renders success state with no trips', () => {
        (useTrips as any).mockReturnValue({ 
            data: [],
            isLoading: false
        });

        render(<TripsIndexComponent />);

        expect(screen.getByTestId('empty-trip-card')).toBeTruthy();
    });

    it('renders default User name when user has no name', () => {
         (useUserStore as any).mockImplementation((selector: any) => selector({ user: { name: null } }));

         render(<TripsIndexComponent />);

         expect(screen.getByText('Hi, User')).toBeTruthy();
    });
});
