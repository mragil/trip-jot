import { describe, it, expect } from 'vitest';
import { tripSchema, activitySchema } from '@/lib/schemas';

describe('tripSchema', () => {
  it('validates a valid trip', () => {
    const validTrip = {
      name: 'My Trip',
      destination: 'Tokyo',
      startDate: new Date(),
      endDate: new Date(),
    };

    const result = tripSchema.safeParse(validTrip);

    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const invalidTrip = {
      name: '',
      destination: 'Tokyo',
      startDate: new Date(),
      endDate: new Date(),
    };

    const result = tripSchema.safeParse(invalidTrip);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Trip name is required');
    }
  });

  it('fails when name is too long', () => {
    const invalidTrip = {
      name: 'a'.repeat(101),
      destination: 'Tokyo',
      startDate: new Date(),
      endDate: new Date(),
    };

    const result = tripSchema.safeParse(invalidTrip);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Trip name is too long');
    }
  });

  it('fails when destination is empty', () => {
    const invalidTrip = {
      name: 'My Trip',
      destination: '',
      startDate: new Date(),
      endDate: new Date(),
    };

    const result = tripSchema.safeParse(invalidTrip);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Destination is required');
    }
  });
});

describe('activitySchema', () => {
  const baseValidActivity = {
    tripId: 1,
    name: 'Sushi Dinner',
    type: 'restaurant',
    location: 'Gina',
    startTime: '2023-01-01T18:00:00.000Z',
    endTime: '2023-01-01T20:00:00.000Z',
    cost: 5000,
    currency: 'JPY',
    isCompleted: false,
    notes: 'Yummy',
  };

  it('validates a valid activity', () => {
    const result = activitySchema.safeParse(baseValidActivity);

    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const invalidActivity = { ...baseValidActivity, name: '' };

    const result = activitySchema.safeParse(invalidActivity);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required');
    }
  });

  it('fails when end time is before start time', () => {
    const invalidActivity = {
      ...baseValidActivity,
      startTime: '2023-01-01T20:00:00.000Z',
      endTime: '2023-01-01T18:00:00.000Z',
    };

    const result = activitySchema.safeParse(invalidActivity);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('End time must be after start time');
    }
  });

  it('fails when cost is negative', () => {
    const invalidActivity = { ...baseValidActivity, cost: -100 };

    const result = activitySchema.safeParse(invalidActivity);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Cost must be positive');
    }
  });
  
  it('fails when invalid date format', () => {
      const invalidActivity = { ...baseValidActivity, startTime: 'invalid-date' };

       const result = activitySchema.safeParse(invalidActivity);

      expect(result.success).toBe(false);
      if (!result.success) {
          expect(result.error.issues[0].message).toBe('Invalid start time');
      }
  });
});
