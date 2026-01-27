import { format } from 'date-fns';

/**
 * Formats a start and end date into a string range.
 * Format: "MMM dd - MMM dd, yyyy"
 * Example: "Jan 01 - Jan 05, 2024"
 *
 * @param start - The start date
 * @param end - The end date
 * @returns A formatted string representing the date range.
 */
export function formatDateRange(
	start: Date | string | number,
	end: Date | string | number,
): string {
	const startDate = new Date(start);
	const endDate = new Date(end);

	return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`;
}

/**
 * Formats a date into a standard string.
 * Format: "MMM dd, yyyy"
 * Example: "Jan 01, 2024"
 */
export function formatDate(date: Date | string | number): string {
	return format(new Date(date), 'MMM dd, yyyy');
}

/**
 * Formats a date into a day and month string.
 * Format: "MMM dd"
 * Example: "Jan 01"
 */
export function formatDayMonth(date: Date | string | number): string {
	return format(new Date(date), 'MMM dd');
}

/**
 * Formats a date into a long string.
 * Format: "PPP" (localized text)
 * Example: "January 1st, 2024"
 */
export function formatDateLong(date: Date | string | number): string {
	return format(new Date(date), 'PPP');
}
