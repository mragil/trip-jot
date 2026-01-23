import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Route as RegisterRoute } from '@/routes/register';
import { useRegisterMutation } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Mock Hooks
vi.mock('@/hooks/useAuth', () => ({
    useRegisterMutation: vi.fn(),
}));

vi.mock('@/store/user', () => ({
    useUserStore: {
        getState: vi.fn(() => ({ user: null })), // Default to no user
    }
}));

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    }
}));

// Mock Router
const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
    createFileRoute: () => (options: any) => ({
        ...options,
        useNavigate: () => mockNavigate,
    }),
    redirect: vi.fn(),
}));

// Mock Components
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

        expect(toast.error).toHaveBeenCalled();
    });
});
