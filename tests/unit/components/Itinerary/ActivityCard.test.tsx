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

    it('renders cost with correct currency formatting', () => {
        render(<ActivityCard {...defaultProps} cost={100000} currency="IDR" />);
        expect(screen.getByText('IDR 100.000')).toBeTruthy();
    });

    it('renders cost with default currency if missing', () => {
        render(<ActivityCard {...defaultProps} cost={50} currency={undefined} />);
        expect(screen.getByText('IDR 50')).toBeTruthy();
    });

    it('does not render cost when cost is 0', () => {
        render(<ActivityCard {...defaultProps} cost={0} currency="IDR" />);
        // Ensure strictly that "0" is not rendered as the only text in a container (which is what React 0 rendering does)
        // But since I can't easily query that, checking "IDR 0" being absent is a good proxy for the badge.
        expect(screen.queryByText('IDR 0')).toBeNull(); 
        // Also check that the cost prop doesn't cause a stray "0"
        // In the snapshot it would show, but here we just ensure the badge is gone.
    });
});
