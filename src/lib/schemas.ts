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

// Helper to check if string is HH:mm format
const isTimeFormat = (val: string) =>
	/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val);

export const activitySchema = z
	.object({
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
		startTime: z
			.string()
			.min(1, 'Start time is required')
			.refine(
				(val) => isTimeFormat(val) || !Number.isNaN(Date.parse(val)),
				'Invalid start time',
			),
		endTime: z
			.string()
			.min(1, 'End time is required')
			.refine(
				(val) => isTimeFormat(val) || !Number.isNaN(Date.parse(val)),
				'Invalid end time',
			),
		cost: z.number().min(0, 'Cost must be positive'),
		currency: z.string().min(1, 'Currency is required'),
		notes: z.string(),
		isCompleted: z.boolean(),
	})
	.refine(
		(data) => {
			const startIsTime = isTimeFormat(data.startTime);
			const endIsTime = isTimeFormat(data.endTime);

			if (startIsTime && endIsTime) {
				// Compare time strings directly (works for HH:mm)
				return data.endTime > data.startTime;
			}

			const start = new Date(data.startTime).getTime();
			const end = new Date(data.endTime).getTime();

			if (Number.isNaN(start) || Number.isNaN(end)) return true;
			return end > start;
		},
		{
			message: 'End time must be after start time',
			path: ['endTime'],
		},
	);

export type ActivitySchema = z.infer<typeof activitySchema>;
