import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TripCard from '@/components/Trip/TripCard';


vi.mock('@tanstack/react-router', () => ({
	Link: ({ to, params, children, className }: any) => (
		<a href={to.replace('$id', params.id)} className={className}>
			{children}
		</a>
	),
}));

describe('TripCard', () => {
	const mockTrip = {
		id: 1,
		name: 'Summer Trip',
		destination: 'Paris, France',
		startDate: new Date('2023-06-01'),
		endDate: new Date('2023-06-10'),
	} as any;

	it('renders trip information correctly', () => {
		render(<TripCard trip={mockTrip} />);

		expect(screen.getByText('Summer Trip')).toBeTruthy();
		expect(screen.getByText('Paris, France')).toBeTruthy();
		expect(screen.getByText('Jun 01 - Jun 10, 2023')).toBeTruthy();
	});

	it('renders link to trip details', () => {
		render(<TripCard trip={mockTrip} />);
        
		const link = screen.getByRole('link');
		expect(link.getAttribute('href')).toBe('/trips/1');
	});
});
