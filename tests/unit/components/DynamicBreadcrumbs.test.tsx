import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DynamicBreadcrumbs from '@/components/DynamicBreadcrumbs';


const mockLocation = { pathname: '/' };
vi.mock('@tanstack/react-router', () => ({
	useRouterState: () => ({
		location: mockLocation,
	}),
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

describe('DynamicBreadcrumbs', () => {
    it('returns null when on root (empty segments)', () => {
        mockLocation.pathname = '/';
        const { container } = render(<DynamicBreadcrumbs />);
        expect(container.innerHTML).toBe('');
    });

	it('renders Back to Dashboard when 1 segment', () => {
        mockLocation.pathname = '/trips';
		render(<DynamicBreadcrumbs />);
		expect(screen.getByText('Back to Dashboard')).toBeTruthy();
	});

    it('renders breadcrumbs for multiple segments', () => {
        mockLocation.pathname = '/trips/1/activities';
        render(<DynamicBreadcrumbs />);
        
        // Should have "Trips" (link), "1" (text/link), "Activities" (text)
        // Implementation: 
        // /trips -> Link
        // /trips/1 -> Link
        // /trips/1/activities -> Last item (Text)
        
        expect(screen.getByText('Trips')).toBeTruthy();
        expect(screen.getByText('Activities')).toBeTruthy(); // Last item
    });

    it('uses label mapper', () => {
        mockLocation.pathname = '/trips/123';
        const mapper = (segment: string) => {
            if (segment === '123') return 'Paris Trip';
            return segment;
        };
        
        render(<DynamicBreadcrumbs labelMapper={mapper} />);
        expect(screen.getByText('Paris Trip')).toBeTruthy();
    });
});
