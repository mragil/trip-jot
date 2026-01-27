/**
 * Formats a number using ID/IDR locale (dots as thousands separators).
 * Example: 10000 -> "10.000"
 */
export function formatNumber(value: number): string {
	return new Intl.NumberFormat('id-ID').format(value);
}

/**
 * Formats a currency amount with the currency code.
 * Example: 10000, "IDR" -> "IDR 10.000"
 */
export function formatCurrency(value: number, currency = 'IDR'): string {
	return `${currency} ${formatNumber(value)}`;
}
