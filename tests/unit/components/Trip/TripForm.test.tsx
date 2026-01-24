import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TripForm from '@/components/Trip/TripForm';
import api from '@/lib/api';
import { toast } from 'sonner';


vi.mock('@/lib/api', () => ({
    default: {
        post: vi.fn(),
    },
}));

const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
	useNavigate: () => mockNavigate,
}));

vi.mock('sonner', () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock('date-fns', async (importOriginal) => {
    const actual = await importOriginal<typeof import('date-fns')>();
    return {
        ...actual,
        format: (date: Date, _fmt: string) => date ? date.toISOString() : '',
    };
});


vi.mock('@/lib/schemas', () => ({
    tripSchema: {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
}));








vi.mock('@/lib/schemas', async () => {
    const { z } = await import('zod');
    return {
        tripSchema: z.object({
             name: z.string().optional(),
             destination: z.string().optional(),
             startDate: z.any().optional(),
             endDate: z.any().optional(),
        })
    }
});

describe('TripForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders form fields correctly', () => {
		render(<TripForm />);
		expect(screen.getByLabelText('Trip name')).toBeTruthy();
	});

    it('cancels navigation', () => {
        render(<TripForm />);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        expect(mockNavigate).toHaveBeenCalledWith({ to: '/trips' });
    });

	it('submits form with data (Happy Path)', async () => {
        (api.post as any).mockResolvedValue({ data: { id: 1 } });
		render(<TripForm />);

        
		fireEvent.change(screen.getByLabelText('Trip name'), { target: { value: 'Japan' } });
		fireEvent.change(screen.getByLabelText('Destination'), { target: { value: 'Tokyo' } });
        
        
        
		fireEvent.click(screen.getByRole('button', { name: 'Create Trip' }));

		await waitFor(() => {
			expect(api.post).toHaveBeenCalled(); 
            
		});
        
        expect(mockNavigate).toHaveBeenCalledWith({ to: '/trips' });
	});

    it('handles API errors', async () => {
        (api.post as any).mockRejectedValue(new Error('Fail'));
		render(<TripForm />);

		fireEvent.click(screen.getByRole('button', { name: 'Create Trip' }));

		await waitFor(() => {
			expect(api.post).toHaveBeenCalled();
		});
        
        await waitFor(() => {
             expect(toast.error).toHaveBeenCalledWith('Failed to create trip');
        });
    });
});
