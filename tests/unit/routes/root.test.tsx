import { render, screen } from '@testing-library/react';
import { Route } from '@/routes/__root';
import { describe, it, expect, vi } from 'vitest';
import * as router from '@tanstack/react-router';

// Mock dependencies
vi.mock('@tanstack/react-router', () => ({
    createRootRouteWithContext: () => (options: any) => options,
    HeadContent: () => null,
    Scripts: () => null,
    Outlet: () => null,
    useLocation: vi.fn(),
}));

vi.mock('@tanstack/react-router-devtools', () => ({
    TanStackRouterDevtoolsPanel: () => null,
}));

vi.mock('@tanstack/react-devtools', () => ({
    TanStackDevtools: () => null,
}));

vi.mock('@/components/Header', () => ({
    default: () => <div data-testid="header">Header</div>,
}));

vi.mock('@/components/ui/sonner', () => ({
    Toaster: () => null,
}));

describe('Root Route', () => {
    it('renders Header only on appropriate routes', () => {
        const Component = (Route as any).component;
        
        // Mock return value for this test
        (router.useLocation as any).mockReturnValue({ pathname: '/trips' });

        render(<Component><div>Child</div></Component>);
        expect(screen.getByTestId('header')).toBeTruthy();
    });

    it('hides Header on login/register', () => {
        const Component = (Route as any).component;
        
        (router.useLocation as any).mockReturnValue({ pathname: '/login' });

        render(<Component><div>Child</div></Component>);
        expect(screen.queryByTestId('header')).toBeNull();
    });
});
