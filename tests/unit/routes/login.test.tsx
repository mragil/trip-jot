import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosError } from 'axios';
import { Route } from '@/routes/login';
import { useLoginMutation } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Suspense } from 'react';

vi.mock('@/hooks/useAuth', () => ({
	useLoginMutation: vi.fn(),
}));

vi.mock('@/store/user', () => {
    const fn = vi.fn();
    (fn as any).getState = () => ({ user: null });
    return { useUserStore: fn };
});

vi.mock('sonner', () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock('@/components/login-form', () => ({
	LoginForm: ({ onSubmit, isPending }: any) => (
		<form
			data-testid="login-form"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit({ email: 'test@example.com', password: 'password' });
			}}
		>
			<button type="submit" disabled={isPending}>
				Sign In
			</button>
		</form>
	),
}));

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@tanstack/react-router')>();
	return {
		...actual,
        redirect: vi.fn(),
        createFileRoute: () => (config: any) => ({
            component: config.component,
            useNavigate: () => mockNavigate,
        }),
	};
});

describe('Login Route', () => {
	const LoginRouteComponent = (Route as any).component;
    const mockMutate = vi.fn();

	beforeEach(async () => {
		vi.clearAllMocks();
        (useLoginMutation as any).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        });
        
        if ((LoginRouteComponent as any).preload) {
            await (LoginRouteComponent as any).preload();
        }
	});

	it('renders login form', async () => {
		render(
            <Suspense fallback="loading">
                <LoginRouteComponent />
            </Suspense>
        );

		await waitFor(() => expect(screen.getByTestId('login-form')).toBeTruthy());
        expect(screen.getByText('WanderLog')).toBeTruthy();
	});

	it('calls login mutation on submit', async () => {
		render(
            <Suspense fallback="loading">
                <LoginRouteComponent />
            </Suspense>
        );
        await waitFor(() => expect(screen.getByTestId('login-form')).toBeTruthy());
        
		fireEvent.submit(screen.getByTestId('login-form'));

		expect(mockMutate).toHaveBeenCalledWith(
			{ email: 'test@example.com', password: 'password' },
			expect.any(Object),
		);
	});

	it('navigates to /trips on success', async () => {
        mockMutate.mockImplementation((_data, { onSuccess }) => {
            onSuccess();
        });
        render(
            <Suspense fallback="loading">
                <LoginRouteComponent />
            </Suspense>
        );
        await waitFor(() => expect(screen.getByTestId('login-form')).toBeTruthy());

		fireEvent.submit(screen.getByTestId('login-form'));
		
        expect(mockNavigate).toHaveBeenCalledWith({ to: '/trips' });
	});

	it('shows error toast on failure', async () => {
         mockMutate.mockImplementation((_data, { onError }) => {
            onError(new Error('Login failed'));
        });

		render(
            <Suspense fallback="loading">
                <LoginRouteComponent />
            </Suspense>
        );
        await waitFor(() => expect(screen.getByTestId('login-form')).toBeTruthy());

		fireEvent.submit(screen.getByTestId('login-form'));
        
        expect(toast.error).toHaveBeenCalledWith('Invalid email or password');
	});

    it('shows specific error message from server', async () => {
         mockMutate.mockImplementation((_data, { onError }) => {
            const error = new AxiosError('Server error');
            error.response = { data: { message: 'Custom server error' } } as any;
            onError(error);
        });

		render(
            <Suspense fallback="loading">
                <LoginRouteComponent />
            </Suspense>
        );
        await waitFor(() => expect(screen.getByTestId('login-form')).toBeTruthy());

		fireEvent.submit(screen.getByTestId('login-form'));
        
        expect(toast.error).toHaveBeenCalledWith('Custom server error');
	});
});
