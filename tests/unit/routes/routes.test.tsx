import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// import { Route as TripsRoute } from '@/routes/trips'; // Layout, maybe skip or basic test
import { Route as TripsIndexRoute } from '@/routes/trips.index';
import { Route as TripDetailRoute } from '@/routes/trips.$id';
import { Route as NewTripRoute } from '@/routes/trips.new-trip';
import { useTrips, useTrip } from '@/hooks/useTrips';
import { useUserStore } from '@/store/user';

// Mock Hooks
vi.mock('@/hooks/useTrips', () => ({
	useTrips: vi.fn(),
    useTrip: vi.fn(),
}));

vi.mock('@/store/user', () => ({
	useUserStore: vi.fn(),
}));

// Mock Router
vi.mock('@tanstack/react-router', () => ({
	createFileRoute: () => (options: any) => ({
        ...options,
        useParams: vi.fn().mockReturnValue({ id: '1' }),
    }),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
    Outlet: () => <div>Outlet Content</div>,
    redirect: vi.fn(),
}));

// Mock Components to avoid deep rendering
// Mock Components to avoid deep rendering
vi.mock('@/components/Landing/HeroImage', () => ({ HeroImage: () => <div>HeroImage</div> }));
vi.mock('@/components/Trip/TripCard', () => ({ default: ({ trip }: any) => <div>Trip: {trip.name}</div> }));
vi.mock('@/components/Trip/EmptyTripCard', () => ({ default: () => <div>EmptyTripCard</div> }));
vi.mock('@/components/Trip/TripForm', () => ({ default: () => <div>TripForm</div> }));

const ItineraryViewSpy = vi.fn();
vi.mock('@/components/Itinerary/ItineraryView', () => ({ default: (props: any) => {
    ItineraryViewSpy(props);
    return <button onClick={() => props.addActivity(new Date())}>Add Activity</button> 
}}));

const ActivityFormDrawerSpy = vi.fn();
vi.mock('@/components/Itinerary/ActivityFormDrawer', () => ({ default: (props: any) => {
    ActivityFormDrawerSpy(props);
    return <div>ActivityFormDrawer</div> 
}}));

const BreadcrumbsSpy = vi.fn();
vi.mock('@/components/DynamicBreadcrumbs', () => ({ default: (props: any) => {
    BreadcrumbsSpy(props);
    return <div>Breadcrumbs</div> 
}}));

vi.mock('@/components/DynamicTabs', () => ({ default: ({ tabs }: any) => (
    <div>
        {tabs.map((tab: any) => <div key={tab.id}>{tab.content}</div>)}
    </div>
)}));

vi.mock('@/components/Trip/TripCardSkeleton', () => ({ default: () => <div>Skeleton</div> }));
vi.mock('@/components/Trip/TripErrorState', () => ({ default: () => <div>ErrorState</div> }));

describe('Routes', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Default user store mock
        (useUserStore as any).mockImplementation((selector: any) => selector ? selector({ user: { name: 'Test User' } }) : { user: { name: 'Test User' }, getState: () => ({ user: { name: 'Test User' } }) });
    });



    describe('Trips Index (/trips/)', () => {
        it('renders loading state', () => {
            (useTrips as any).mockReturnValue({ isLoading: true });
            const Component = (TripsIndexRoute as any).component;
            render(<Component />);
            expect(screen.getAllByText('Skeleton')).toBeTruthy();
        });

        it('renders error state', () => {
            (useTrips as any).mockReturnValue({ isLoading: false, isError: true });
             const Component = (TripsIndexRoute as any).component;
             render(<Component />);
             expect(screen.getByText('ErrorState')).toBeTruthy();
        });

         it('renders empty state', () => {
            (useTrips as any).mockReturnValue({ isLoading: false, isError: false, data: [] });
             const Component = (TripsIndexRoute as any).component;
             render(<Component />);
             expect(screen.getByText('EmptyTripCard')).toBeTruthy();
        });

        it('renders trips list', () => {
             (useTrips as any).mockReturnValue({ 
                isLoading: false, 
                isError: false, 
                data: [{ id: 1, name: 'Trip 1' }] 
            });
             const Component = (TripsIndexRoute as any).component;
             render(<Component />);
             expect(screen.getByText('Trip: Trip 1')).toBeTruthy();
             expect(screen.getByText('Hi, Test User')).toBeTruthy();
        });
    });

    describe('Trip Detail (/trips/$id)', () => {
        it('renders trip details', () => {
            (useTrip as any).mockReturnValue({ 
                isLoading: false, 
                isError: false, 
                data: { 
                    id: 1, 
                    name: 'My Trip', 
                    destination: 'Mars', 
                    startDate: new Date('2023-01-01'), 
                    endDate: new Date('2023-01-05') 
                } 
            });
            const Component = (TripDetailRoute as any).component;
            render(<Component />);
            
            expect(screen.getByText('My Trip')).toBeTruthy();
            expect(screen.getByText('Mars')).toBeTruthy();
        });

        it('renders loading', () => {
             (useTrip as any).mockReturnValue({ isLoading: true });
             const Component = (TripDetailRoute as any).component;
             const { container } = render(<Component />);
             expect(container.querySelector('.animate-spin')).toBeTruthy();
        });

        it('handles breadcrumb labels', () => {
             BreadcrumbsSpy.mockClear();
            (useTrip as any).mockReturnValue({ 
                isLoading: false, 
                isError: false, 
                data: { 
                    id: 1, 
                    name: 'My Trip',
                    startDate: new Date(),
                    endDate: new Date()
                } 
            });
            const Component = (TripDetailRoute as any).component;
             render(<Component />);
             
             expect(BreadcrumbsSpy).toHaveBeenCalled();
             const props = BreadcrumbsSpy.mock.calls[0][0];
             expect(props.labelMapper).toBeDefined();
             
             expect(props.labelMapper('trips', '/trips')).toBe('Trips'); 
             expect(props.labelMapper('1', '/trips/1')).toBe('My Trip');
        });

        it('opens activity form on addActivity', async () => {
             ActivityFormDrawerSpy.mockClear();
            (useTrip as any).mockReturnValue({ 
                isLoading: false, 
                isError: false, 
                data: { id: 1, name: 'My Trip', startDate: new Date(), endDate: new Date() } 
            });
            const Component = (TripDetailRoute as any).component;
             render(<Component />);
             
             // DynamicTabs mock now renders content.
             // Find button from ItineraryView mock
             const addBtn = screen.getByText('Add Activity');
             fireEvent.click(addBtn);
             
             // Check ActivityFormDrawer prop
             await waitFor(() => {
                 expect(ActivityFormDrawerSpy).toHaveBeenCalled();
                 const lastCall = ActivityFormDrawerSpy.mock.calls[ActivityFormDrawerSpy.mock.calls.length - 1][0];
                 expect(lastCall.isFormOpen).toBe(true);
             });
        });
    });

    describe('New Trip (/trips/new-trip)', () => {
        it('renders passed', () => {
             const Component = (NewTripRoute as any).component;
             render(<Component />);
             expect(screen.getByText('Create a New Trip')).toBeTruthy();
             expect(screen.getByText('TripForm')).toBeTruthy();
        });
    });
});
