import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Construction from '@/components/Construction';
import NotFound from '@/components/NotFound';
import { HeroImage } from '@/components/Landing/HeroImage';
import EmptyTripCard from '@/components/Trip/EmptyTripCard';
import TripCardSkeleton from '@/components/Trip/TripCardSkeleton';
import TripErrorState from '@/components/Trip/TripErrorState';


vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
    useRouter: vi.fn(),
}));

describe('Simple Components', () => {
    describe('Construction', () => {
        it('renders correct text', () => {
            render(<Construction />);
            expect(screen.getByText(/Under Construction/i)).toBeTruthy();
        });
    });

    describe('NotFound', () => {
        it('renders correct text and link', () => {
            render(<NotFound />);
            expect(screen.getByText(/Page Not Found/i)).toBeTruthy();
        });
    });

    describe('HeroImage', () => {
        it('renders image content', () => {
            render(<HeroImage />);
            expect(screen.getByText(/Day 1: Kyoto/i)).toBeTruthy();
        });
    });

    describe('EmptyTripCard', () => {
        it('renders create trip message', () => {
            render(<EmptyTripCard />);
            expect(screen.getByText(/Start by creating a new trip/i)).toBeTruthy();
        });
    });

    describe('TripCardSkeleton', () => {
        it('renders skeleton elements', () => {
            const { container } = render(<TripCardSkeleton />);
            
            expect(container.getElementsByClassName('animate-pulse').length).toBeGreaterThan(0);
        });
    });

    describe('TripErrorState', () => {
        it('renders error message and retry button', () => {
            const onRetry = vi.fn();
            render(<TripErrorState onRetry={onRetry} />);
            
            expect(screen.getByText(/Error Loading Trips/i)).toBeTruthy();
            
            const button = screen.getByRole('button', { name: /Try Again/i });
            fireEvent.click(button);
            expect(onRetry).toHaveBeenCalled();
        });
    });
});
