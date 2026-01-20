import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export interface Activity {
	id: number;
	tripId: number;
	name: string;
	type: string;
	notes: string;
	location: string;
	startTime: string; // ISO date string
	endTime: string; // ISO date string
	cost: number;
	currency: string;
	isCompleted: boolean;
}

export interface Trip {
	name: string;
	id: number;
	createdAt: Date;
	updatedAt: Date;
	destination: string;
	startDate: Date;
	endDate: Date;
	isCompleted: boolean;
	userId: number;
	activities: Activity[];
}

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
