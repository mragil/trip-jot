import { render, screen } from '@testing-library/react';
import NotFound from '@/components/NotFound';
import { describe, it, expect, vi } from 'vitest';

// Mock Link from @tanstack/react-router
vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to, className }: any) => (
        <a href={to} className={className}>{children}</a>
    ),
}));

describe('NotFound', () => {
	it('renders correctly', () => {
		render(<NotFound />);

		expect(screen.getByText('Page Not Found')).toBeTruthy();
		expect(
			screen.getByText(
				/Sorry, we couldn't find the page you're looking for/i,
			),
		).toBeTruthy();
		expect(screen.getByText(/back to dashboard/i)).toBeTruthy();
	});
});
