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

export const activitySchema = z
	.object({
		tripId: z.number(),
		name: z.string().min(1, 'Name is required'),
		type: z.enum([
			'attraction',
			'restaurant',
			'accommodation',
			'transportation',
			'other',
		]),
		notes: z.string().optional().default(''),
		location: z.string().min(1, 'Location is required'),
		startTime: z.string().datetime({ message: 'Invalid start time' }),
		endTime: z.string().datetime({ message: 'Invalid end time' }),
		cost: z.number().min(0, 'Cost must be positive'),
		currency: z.string().min(1, 'Currency is required').default('JPY'),
		isCompleted: z.boolean().default(false),
	})
	.refine((data) => new Date(data.endTime) >= new Date(data.startTime), {
		message: 'End time must be after start time',
		path: ['endTime'],
	});

export type ActivitySchema = z.infer<typeof activitySchema>;
