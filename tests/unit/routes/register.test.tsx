import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosError } from 'axios';
import { Route as RegisterRoute } from '@/routes/register';
import { useRegisterMutation } from '@/hooks/useAuth';
import { useUserStore } from '@/store/user';
import { toast } from 'sonner';


vi.mock('@/hooks/useAuth', () => ({
    useRegisterMutation: vi.fn(),
}));

vi.mock('@/store/user', () => {
    const fn = vi.fn();
    (fn as any).getState = vi.fn(() => ({ user: null }));
    return { useUserStore: fn };
});

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    }
}));


const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
    createFileRoute: () => (options: any) => ({
        ...options,
        options: options,
        component: options.component,
        useNavigate: () => mockNavigate,
    }),
    redirect: vi.fn((opts) => { throw { options: opts }; }),
}));


vi.mock('@/components/register-form', () => ({
    RegisterForm: ({ onSubmit, isPending }: any) => (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name: 'Test', email: 'test@example.com', password: 'password' }); }}>
            <button type="submit" disabled={isPending}>Register</button>
        </form>
    )
}));

describe('Register Route', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly', () => {
        (useRegisterMutation as any).mockReturnValue({
            mutate: vi.fn(),
            isPending: false,
        });
        const Component = (RegisterRoute as any).component;
        render(<Component />);
        expect(screen.getByText('WanderLog')).toBeTruthy();
        expect(screen.getByText('Register')).toBeTruthy();
    });

    it('submits registration form', async () => {
        const mutateMock = vi.fn();
        (useRegisterMutation as any).mockReturnValue({
            mutate: mutateMock,
            isPending: false,
        });

        const Component = (RegisterRoute as any).component;
        render(<Component />);
        
        const button = screen.getByText('Register');
        button.click();

        expect(mutateMock).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Test', email: 'test@example.com' }), 
            expect.anything()
        );
    });

    it('navigates on success', () => {
        const mutateMock = vi.fn((_data, options) => {
             options.onSuccess();
        });
        (useRegisterMutation as any).mockReturnValue({
            mutate: mutateMock,
            isPending: false,
        });

        const Component = (RegisterRoute as any).component;
        render(<Component />);
        
        const button = screen.getByText('Register');
        button.click();

        expect(toast.success).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith({ to: '/trips' });
    });

    it('shows error on failure', () => {
        const mutateMock = vi.fn((_data, options) => {
             options.onError(new Error('Failed'));
        });
        (useRegisterMutation as any).mockReturnValue({
            mutate: mutateMock,
            isPending: false,
        });

        const Component = (RegisterRoute as any).component;
        render(<Component />);
        
        const button = screen.getByText('Register');
        button.click();

        expect(toast.error).toHaveBeenCalledWith('Registration failed. Please try again.');
    });



    it('shows specific axios error message', () => {
        const axiosError = new AxiosError('Axios Error');
        (axiosError as any).response = { data: { message: 'Email taken' } };

        const mutateMock = vi.fn((_data, options) => {
             options.onError(axiosError);
        });
        (useRegisterMutation as any).mockReturnValue({
            mutate: mutateMock,
            isPending: false,
        });

        const Component = (RegisterRoute as any).component;
        render(<Component />);
        
        const button = screen.getByText('Register');
        button.click();

        expect(toast.error).toHaveBeenCalledWith('Email taken');
    });

    it('redirects if user is already logged in', () => {
         
        (useUserStore as any).mockImplementationOnce((_selector: any) => ({ user: { id: 1 } }));
        
        (useUserStore.getState as any).mockReturnValue({ user: { id: 1 } });
        
        try {
            
            
            RegisterRoute.options.beforeLoad?.({ context: {} as any, location: {} as any, params: {} as any, cause: 'enter' } as any);
        } catch (e: any) {
             expect(e).toMatchObject({ options: { to: '/trips' } });
        }
    });

    it('does not redirect if user is not logged in', () => {
        (useUserStore.getState as any).mockReturnValue({ user: null });
        const result = RegisterRoute.options.beforeLoad?.({ context: {} as any, location: {} as any, params: {} as any, cause: 'enter' } as any);
        expect(result).toBeUndefined();
    });
});
