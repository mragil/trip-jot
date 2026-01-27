import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ItineraryDetail from '@/components/Itinerary/ItineraryDetail';
import { useDeleteActivity } from '@/hooks/useTrips';

// Mock dependencies
vi.mock('@/hooks/useTrips', () => ({
	useDeleteActivity: vi.fn(),
}));

// Mock ActivityCard to easily find the delete button without icon issues
vi.mock('@/components/Itinerary/ActivityCard', () => ({
	default: ({ onDelete, title, cost, currency }: any) => (
		<div data-testid="activity-card">
			<span>{title}</span>
            {cost && <span>{currency} {cost}</span>}
			<button onClick={onDelete} data-testid="delete-btn">Delete</button>
		</div>
	),
}));

describe('ItineraryDetail', () => {
    const mockMutate = vi.fn();
    const mockTripId = 123;
    const mockActivities = [
        { id: 1, name: 'Activity 1', type: 'attraction', startTime: '2024-01-01T10:00:00', location: 'Loc 1', cost: 50, currency: 'USD' },
    ];

    beforeEach(() => {
        (useDeleteActivity as any).mockReturnValue({ mutate: mockMutate });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

	it('renders activities and handles delete', () => {
        render(
            <ItineraryDetail
                selectedDay={1}
                date={new Date('2024-01-01')}
                addActivity={vi.fn()}
                activities={mockActivities as any}
                tripId={mockTripId}
            />
        );

        expect(screen.getByText('Activity 1')).toBeTruthy();
        expect(screen.getByText('USD 50')).toBeTruthy();
        
        const deleteBtn = screen.getByTestId('delete-btn');
        fireEvent.click(deleteBtn);

        expect(mockMutate).toHaveBeenCalledWith({ id: '1', tripId: mockTripId });
	});
});
