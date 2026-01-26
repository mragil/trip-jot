import { z } from 'zod';

export const tripSchema = z.object({
	name: z
		.string()
		.min(1, 'Trip name is required')
		.max(100, 'Trip name is too long'),
	destination: z.string().min(1, 'Destination is required'),
	startDate: z.date({ required_error: 'Start date is required' }),
	endDate: z.date({ required_error: 'End date is required' }),
});

export type TripSchema = z.infer<typeof tripSchema>;

export const activitySchema = z.object({
	tripId: z.number(),
	name: z.string().min(1, 'Name is required'),
	location: z.string().min(1, 'Location is required'),
	type: z.enum([
		'attraction',
		'restaurant',
		'accommodation',
		'transportation',
		'other',
	]),
	startTime: z.string().min(1, 'Start time is required'),
	endTime: z.string().min(1, 'End time is required'),
	cost: z.number().min(0, 'Cost must be positive'),
	currency: z.string().min(1, 'Currency is required'),
	notes: z.string(),
	isCompleted: z.boolean(),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
