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
