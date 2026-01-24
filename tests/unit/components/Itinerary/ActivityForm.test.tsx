import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ActivityForm from '@/components/Itinerary/ActivityForm';
import { useCreateActivity } from '@/hooks/useTrips';


vi.mock('@/hooks/useTrips', () => ({
	useCreateActivity: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
	useNavigate: () => mockNavigate,
}));

describe('ActivityForm', () => {
    const mockMutateAsync = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
        (useCreateActivity as any).mockReturnValue({
            mutateAsync: mockMutateAsync,
            isPending: false,
        });
	});

    const defaultProps = {
        tripId: 1,
        date: new Date('2023-01-01T00:00:00Z'),
        onCancel: vi.fn(),
    };

	it('renders form fields', () => {
		render(<ActivityForm {...defaultProps} />);
		expect(screen.getByLabelText('Name')).toBeTruthy();
		expect(screen.getByLabelText('Location')).toBeTruthy();
        expect(screen.getByLabelText('Type')).toBeTruthy();
        expect(screen.getByLabelText('Start Time')).toBeTruthy();
        expect(screen.getByLabelText('End Time')).toBeTruthy();
        expect(screen.getByLabelText('Cost')).toBeTruthy();
        expect(screen.getByLabelText('Currency')).toBeTruthy();
        expect(screen.getByLabelText('Notes')).toBeTruthy();
	});

	it('submits form with valid data', async () => {
		render(<ActivityForm {...defaultProps} />);

		fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Lunch' } });
        fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Restaurant A' } });
        
        fireEvent.change(screen.getByLabelText('Start Time'), { target: { value: '12:00' } });
        fireEvent.change(screen.getByLabelText('End Time'), { target: { value: '13:00' } });
        fireEvent.change(screen.getByLabelText('Cost'), { target: { value: '5000' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Add Activity' }));

        await waitFor(() => {
             expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
                tripId: 1,
                name: 'Lunch',
                location: 'Restaurant A',
                cost: 5000,
            }));
            
            expect(defaultProps.onCancel).toHaveBeenCalled();
        });
	});
});
