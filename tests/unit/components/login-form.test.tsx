import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from '@/components/login-form';

describe('LoginForm', () => {
	it('renders correctly', () => {
		render(<LoginForm />);
		expect(screen.getByLabelText('Email')).toBeTruthy();
		expect(screen.getByLabelText('Password')).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
	});

	it('submits form data', () => {
		const onSubmit = vi.fn();
		render(<LoginForm onSubmit={onSubmit} />);

		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByLabelText('Password'), {
			target: { value: 'password123' },
		});

		fireEvent.click(screen.getByRole('button', { name: 'Login' }));

		expect(onSubmit).toHaveBeenCalledWith({
			email: 'test@example.com',
			password: 'password123',
		});
	});

	it('shows loading state', () => {
		render(<LoginForm isPending={true} />);
		expect(screen.getByRole('button', { name: 'Logging in...' })).toBeTruthy();
        const button = screen.getByRole('button', { name: 'Logging in...' });
        expect(button.getAttribute('disabled')).toBeDefined();
        // Or check property if jsdom supports it well
        expect((button as HTMLButtonElement).disabled).toBe(true);
	});
});
