import { render, screen } from '@testing-library/react';
import { RouteComponent, Route } from '@/routes/explore';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUserStore } from '@/store/user';

// Mock the Construction component
vi.mock('@/components/Construction', () => ({
    default: ({ title, message }: { title: string; message: string }) => (
        <div data-testid="construction">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    ),
}));

vi.mock('@/store/user', () => ({
    useUserStore: {
        getState: vi.fn(),
    },
}));

describe('Explore Route', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<RouteComponent />);

        expect(screen.getByTestId('construction')).toBeTruthy();
        expect(screen.getByText('Explore')).toBeTruthy();
        expect(
            screen.getByText("We're building a way for you to discover amazing trips."),
        ).toBeTruthy();
    });

    it('redirects if user is not logged in', () => {
        (useUserStore.getState as any).mockReturnValue({ user: null });
        
        try {
            Route.options.beforeLoad?.({ context: {} as any, location: {} as any, params: {} as any, cause: 'enter' } as any);
        } catch (e: any) {
            expect(e).toMatchObject({ options: { to: '/login' } });
        }
    });

     it('does not redirect if user is logged in', () => {
        (useUserStore.getState as any).mockReturnValue({ user: { id: 1 } });
        
        const result = Route.options.beforeLoad?.({ context: {} as any, location: {} as any, params: {} as any, cause: 'enter' } as any);
        expect(result).toBeUndefined();
    });
});
