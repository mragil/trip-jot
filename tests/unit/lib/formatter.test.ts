import { describe, expect, it } from 'vitest';
import { formatCurrency, formatNumber } from '@/lib/formatter';

describe('formatter', () => {
	describe('formatNumber', () => {
		it('formats number with dots as thousands separators', () => {
			expect(formatNumber(1000)).toBe('1.000');
			expect(formatNumber(1000000)).toBe('1.000.000');
			expect(formatNumber(1234.56)).toBe('1.234,56');
		});

		it('formats small numbers correctly', () => {
			expect(formatNumber(0)).toBe('0');
			expect(formatNumber(50)).toBe('50');
		});
	});

	describe('formatCurrency', () => {
		it('formats currency with default IDR', () => {
			expect(formatCurrency(100000)).toBe('IDR 100.000');
		});

		it('formats currency with custom code', () => {
			expect(formatCurrency(50, 'USD')).toBe('USD 50');
			expect(formatCurrency(1234.56, 'EUR')).toBe('EUR 1.234,56');
		});
	});
});
