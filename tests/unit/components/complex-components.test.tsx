import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DynamicBreadcrumbs from '@/components/DynamicBreadcrumbs';
import ItineraryMap from '@/components/Itinerary/ItineraryMap';
import ItineraryDetail from '@/components/Itinerary/ItineraryDetail';
import ItineraryView from '@/components/Itinerary/ItineraryView';
import { Activity } from '@/types/trip';


vi.mock('@tanstack/react-router', () => {
    const mockLocation = { pathname: '/trips/1' };
    return {
        useRouterState: () => ({ location: mockLocation }),
        Link: ({ children, to }: any) => <a href={to}>{children}</a>,
        redirect: vi.fn(),
    };
});

// Mock sub-components
vi.mock('@/components/Itinerary/ActivityCard', () => ({ 
    default: ({ title, onDelete, onNavigate }: any) => (
        <div>
            ActivityCard: {title}
            <button onClick={onDelete}>Delete</button>
            <button onClick={onNavigate}>Navigate</button>
        </div>
    ) 
}));

const mockDeleteMutate = vi.fn();

vi.mock('@/hooks/useTrips', () => ({
    useDeleteActivity: () => ({ mutate: mockDeleteMutate })
}));

describe('Complex Components', () => {
    describe('DynamicBreadcrumbs', () => {
        it('renders breadcrumbs based on path', () => {
            render(<DynamicBreadcrumbs />);
            
            expect(screen.getByText('Trips')).toBeTruthy();
            expect(screen.getByText('1')).toBeTruthy();
        });

        it('uses labelMapper', () => {
            const labelMapper = vi.fn((segment) => `Mapped ${segment}`);
            render(<DynamicBreadcrumbs labelMapper={labelMapper} />);
            expect(screen.getByText('Mapped trips')).toBeTruthy();
            expect(screen.getByText('Mapped 1')).toBeTruthy();
        });
    });

    describe('ItineraryDetail', () => {
        const mockActivities: Activity[] = [
            { id: 1, name: 'Activity 1', type: 'restaurant', startTime: new Date().toISOString() } as any
        ];
        const mockAdd = vi.fn();
        
        beforeEach(() => {
            mockDeleteMutate.mockClear();
        });

        it('renders activities', () => {
            render(
                <ItineraryDetail 
                    selectedDay={1} 
                    date={new Date()} 
                    addActivity={mockAdd} 
                    activities={mockActivities} 
                    tripId={1}
                />
            );
            expect(screen.getByText('ActivityCard: Activity 1')).toBeTruthy();
            expect(screen.getByText('Day 1')).toBeTruthy();
        });

        it('renders empty state', () => {
            render(
                <ItineraryDetail 
                    selectedDay={1} 
                    date={new Date()} 
                    addActivity={mockAdd} 
                    activities={[]} 
                    tripId={1}
                />
            );
            expect(screen.getByText(/No plans yet/i)).toBeTruthy();
        });

        it('handles activity actions', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            render(
                <ItineraryDetail 
                    selectedDay={1} 
                    date={new Date()} 
                    addActivity={mockAdd} 
                    activities={mockActivities} 
                    tripId={1}
                />
            );
            
            fireEvent.click(screen.getByText('Delete'));
            expect(mockDeleteMutate).toHaveBeenCalledWith({ id: '1', tripId: 1 });

            fireEvent.click(screen.getByText('Navigate'));
            expect(consoleSpy).toHaveBeenCalledWith('Navigate', 1);
            
            consoleSpy.mockRestore();
        });
    });

    describe('ItineraryMap', () => {
        const mockActivities: Activity[] = [
            { id: 1, name: 'Activity 1', type: 'restaurant', startTime: new Date().toISOString() } as any
        ];
        const mockAdd = vi.fn();

        it('renders map elements', () => {
            const { container } = render(
                <ItineraryMap activities={mockActivities} onAddActivity={mockAdd} />
            );
            
            expect(container.querySelector('svg')).toBeTruthy();
            expect(screen.getByText('Activity 1')).toBeTruthy(); 
        });

        it('renders empty map state', () => {
            render(<ItineraryMap activities={[]} onAddActivity={mockAdd} />);
            expect(screen.getByText(/No map data yet/i)).toBeTruthy();
        });
    });

    describe('ItineraryView', () => {
        const tripMock: any = {
            id: 1,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-01-03'),
            activities: [
               { id: 1, name: 'A1', type: 'other', startTime: new Date('2023-01-01T10:00:00').toISOString() }
            ]
        };
        const mockAdd = vi.fn();

        it('renders days and handles selection', () => {
            render(<ItineraryView addActivity={mockAdd} trip={tripMock} />);
            
            expect(screen.getByText(/Jan 01/)).toBeTruthy();
            expect(screen.getByText(/Jan 02/)).toBeTruthy();
            expect(screen.getByText(/Jan 03/)).toBeTruthy();
            
            
            
            
            
            expect(screen.getByText('ActivityCard: A1')).toBeTruthy();
        });

        it('toggles map view (mobile)', { timeout: 10000 }, () => {
            render(<ItineraryView addActivity={mockAdd} trip={tripMock} />);
            
            
            const toggleBtn = screen.getByText('Show Map');
            fireEvent.click(toggleBtn);
            
            expect(screen.getByText('Show List')).toBeTruthy();
        });
    });
});
