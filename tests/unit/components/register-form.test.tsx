import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RegisterForm } from '@/components/register-form';

describe('RegisterForm', () => {
	it('renders correctly', () => {
		render(<RegisterForm />);
		expect(screen.getByLabelText('Name')).toBeTruthy();
		expect(screen.getByLabelText('Email')).toBeTruthy();
		expect(screen.getByLabelText('Password')).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Sign Up' })).toBeTruthy();
	});

	it('submits form data', () => {
		const onSubmit = vi.fn();
		render(<RegisterForm onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText('Name'), {
			target: { value: 'John Doe' },
		});
		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByLabelText('Password'), {
			target: { value: 'password123' },
		});

		fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

		expect(onSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
			email: 'test@example.com',
			password: 'password123',
		});
	});

	it('shows loading state', () => {
		render(<RegisterForm isPending={true} />);
		expect(screen.getByRole('button', { name: 'Creating account...' })).toBeTruthy();
        
        const button = screen.getByRole('button', { name: 'Creating account...' });
        expect(button.getAttribute('disabled')).toBeDefined();
        
        expect((button as HTMLButtonElement).disabled).toBe(true);
	});
});
