import { z } from 'zod';

export const tripSchema = z.object({
  name: z.string().min(1, 'Trip name is required').max(100, 'Trip name is too long'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
});

export type TripSchema = z.infer<typeof tripSchema>;
