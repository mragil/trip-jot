import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTrips, useTrip, useCreateActivity } from '@/hooks/useTrips';
import api from '@/lib/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


vi.mock('@/lib/api', () => ({
	default: {
		get: vi.fn(),
		post: vi.fn(),
	},
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useTrips Hooks', () => {
    describe('useTrips', () => {
        it('fetches trips', async () => {
            const mockTrips = [{ id: 1, name: 'Test Trip' }];
            (api.get as any).mockResolvedValue({ data: { trips: mockTrips } });

            const { result } = renderHook(() => useTrips(), { wrapper: createWrapper() });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(mockTrips);
            expect(api.get).toHaveBeenCalledWith('/trips');
        });
    });

    describe('useTrip', () => {
        it('fetches a single trip', async () => {
            const mockTrip = { id: '1', name: 'Test Trip' };
            (api.get as any).mockResolvedValue({ data: mockTrip });

            const { result } = renderHook(() => useTrip('1'), { wrapper: createWrapper() });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(mockTrip);
            expect(api.get).toHaveBeenCalledWith('/trips/1');
        });
    });

    describe('useCreateActivity', () => {
        it('creates an activity and invalidates queries', async () => {
            const mockActivity = { id: 1, name: 'New Activity', tripId: 10 };
            (api.post as any).mockResolvedValue({ data: mockActivity });

             const queryClient = new QueryClient();
             const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
             
             const wrapper = ({ children }: { children: React.ReactNode }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result } = renderHook(() => useCreateActivity(), { wrapper });

            await result.current.mutateAsync({ name: 'New Activity', tripId: 10 } as any);

            expect(api.post).toHaveBeenCalledWith('/activities', { name: 'New Activity', tripId: 10 });
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['trips', '10'] });
        });
    });
});
