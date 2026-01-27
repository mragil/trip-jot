import { describe, expect, it } from 'vitest';
import { formatDate, formatDateLong, formatDateRange, formatDayMonth } from '@/lib/date-utils';

describe('date-utils', () => {
	const start = new Date('2024-01-01T10:00:00');
	const end = new Date('2024-01-05T10:00:00');

	it('formatDateRange formats correctly', () => {
		expect(formatDateRange(start, end)).toBe('Jan 01 - Jan 05, 2024');
	});

	it('formatDate formats correctly', () => {
		expect(formatDate(start)).toBe('Jan 01, 2024');
	});

	it('formatDayMonth formats correctly', () => {
		expect(formatDayMonth(start)).toBe('Jan 01');
	});

	it('formatDateLong formats correctly', () => {
		// PPP format depends on locale, but usually 'January 1st, 2024' or 'Jan 1, 2024'
		// We'll check it contains the year and month
		const result = formatDateLong(start);
		expect(result).toContain('2024');
		expect(result).toContain('Jan');
	});
});
