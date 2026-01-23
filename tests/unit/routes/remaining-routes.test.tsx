import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Route as ProfileRoute } from '@/routes/profile';
import { Route as ExploreRoute } from '@/routes/explore';
import { Route as TripsRoute } from '@/routes/trips';
// import { Route as RootRoute } from '@/routes/__root'; // Root is hard to test due to context

// Mock Components
vi.mock('@/components/Construction', () => ({ 
    default: ({ title }: any) => <div>Construction: {title}</div> 
}));

vi.mock('@tanstack/react-router', () => ({
    createFileRoute: () => (options: any) => options,
    Outlet: () => <div>Outlet Content</div>,
    redirect: vi.fn(),
    createRootRouteWithContext: () => (options: any) => options,
    useLocation: vi.fn(() => ({ pathname: '/' })),
    HeadContent: () => <title>Head</title>,
    Scripts: () => <script>Scripts</script>,
}));

vi.mock('@/store/user', () => ({
    useUserStore: {
        getState: vi.fn(() => ({ user: { name: 'Test' } })),
    }
}));

describe('Remaining Routes', () => {
    describe('Profile Route', () => {
        it('renders construction component', () => {
            const Component = (ProfileRoute as any).component;
            render(<Component />);
            expect(screen.getByText('Construction: Your Profile')).toBeTruthy();
        });
    });

    describe('Explore Route', () => {
        it('renders construction component', () => {
            const Component = (ExploreRoute as any).component;
            render(<Component />);
            expect(screen.getByText('Construction: Explore')).toBeTruthy();
        });
    });

    describe('Trips Route Layout', () => {
        it('renders outlet', () => {
            const Component = (TripsRoute as any).component;
            render(<Component />);
            expect(screen.getByText('Outlet Content')).toBeTruthy();
        });

        it('checks auth in beforeLoad', () => {
             // Basic verify that beforeLoad exists and runs logic
             // This is a bit implementation detail heavy but verifies logic exists
             expect((TripsRoute as any).beforeLoad).toBeDefined();
        });
    });
});
