import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Route } from '@/routes/index';

vi.mock('@/components/Landing/LandingPage', () => ({
    LandingPage: () => <div data-testid="landing-page">Landing Page Content</div>
}));

vi.mock('@tanstack/react-router', () => ({
    createFileRoute: () => (config: any) => ({
        component: config.component,
    }),
}));

describe('Index Route', () => {
    const IndexRouteComponent = (Route as any).component;

    it('renders landing page', () => {
        render(<IndexRouteComponent />);
        expect(screen.getByTestId('landing-page')).toBeTruthy();
    });
});
