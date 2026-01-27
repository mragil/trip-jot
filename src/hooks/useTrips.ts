import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Activity, Trip } from '@/types/trip';

export const useTrips = () => {
	return useQuery({
		queryKey: ['trips'],
		queryFn: async () => {
			const response = await api.get<{ trips: Trip[] }>('/trips');
			return response.data.trips;
		},
	});
};

export const useTrip = (id: string) => {
	return useQuery({
		queryKey: ['trips', id],
		queryFn: async () => {
			const response = await api.get<Trip>(`/trips/${id}`);
			return response.data;
		},
		enabled: !!id,
	});
};

export const useCreateActivity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newActivity: Omit<Activity, 'id'>) => {
			const response = await api.post<Activity>('/activities', newActivity);
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['trips', String(data.tripId)],
			});
		},
	});
};

export const useDeleteActivity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			tripId,
		}: {
			id: string;
			tripId: string | number;
		}) => {
			const response = await api.delete<Activity>(
				`/activities/${id}?tripId=${tripId}`,
			);
			return response.data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['trips', String(variables.tripId)],
			});
		},
	});
};
