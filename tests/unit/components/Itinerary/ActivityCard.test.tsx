import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActivityCard from '@/components/Itinerary/ActivityCard';

describe('ActivityCard', () => {
	const defaultProps = {
		id: '1',
		title: 'Visit Eiffel Tower',
		type: 'attraction' as const,
		time: '10:00',
		location: 'Paris, France',
	};

	it('renders activity details correctly', () => {
		render(<ActivityCard {...defaultProps} />);

		expect(screen.getByText('Visit Eiffel Tower')).toBeTruthy();
		expect(screen.getByText('10:00')).toBeTruthy();
		expect(screen.getByText('Paris, France')).toBeTruthy();
	});
    
    it('renders empty time when time is missing', () => {
        render(<ActivityCard {...defaultProps} time={undefined} />);
        expect(screen.getByText('--:--')).toBeTruthy();
    });
    
    it('does not render location when missing', () => {
        render(<ActivityCard {...defaultProps} location={undefined} />);
        // MapPin is typically inside a div with the text. 
        // We can check that the text is not present.
        expect(screen.queryByText('Paris, France')).toBeNull();
    });

	it('renders delete button when onDelete is provided', () => {
		const onDelete = vi.fn();
		render(<ActivityCard {...defaultProps} onDelete={onDelete} />);

		const deleteBtn = screen.getAllByRole('button')[0]; 
		expect(deleteBtn).toBeTruthy();
        
        fireEvent.click(deleteBtn);
        expect(onDelete).toHaveBeenCalledWith('1');
	});

    it('does not render delete button when not provided', () => {
        render(<ActivityCard {...defaultProps} onDelete={undefined} />);
        const btns = screen.queryAllByRole('button');
        // Might be 0 buttons
        expect(btns.length).toBe(0);
    });

	it('renders navigate button when onNavigate is provided', () => {
		const onNavigate = vi.fn();
		render(<ActivityCard {...defaultProps} onNavigate={onNavigate} />);

		const navBtn = screen.getAllByRole('button')[0];
		expect(navBtn).toBeTruthy();
        
        fireEvent.click(navBtn);
        expect(onNavigate).toHaveBeenCalledWith('1');
	});
    
    it('does not render navigate button when not provided', () => {
         render(<ActivityCard {...defaultProps} onNavigate={undefined} />);
         const btns = screen.queryAllByRole('button');
         expect(btns.length).toBe(0);
    });
    
    it('renders correct icon for type', () => {
        render(<ActivityCard {...defaultProps} type="restaurant" />);
        expect(screen.getByText('Visit Eiffel Tower')).toBeTruthy();
    });
});
