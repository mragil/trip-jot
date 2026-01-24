import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from '@/hooks/useAuth';
import { useUserStore } from '@/store/user';
import api from '@/lib/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


vi.mock('@/lib/api', () => ({
	default: {
		post: vi.fn(),
	},
}));


vi.mock('@/store/user', () => ({
	useUserStore: {
		getState: vi.fn(),
	}
}));


const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
	useNavigate: () => mockNavigate,
}));


const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useAuth', () => {
    const mockSetUser = vi.fn();
    const mockLogout = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useUserStore.getState as any).mockReturnValue({
            setUser: mockSetUser,
            logout: mockLogout,
        });
    });

	describe('useLoginMutation', () => {
		it('successfully logs in', async () => {
            const mockUser = { id: 1, email: 'test@example.com' };
            (api.post as any).mockResolvedValue({ data: { user: mockUser } });

			const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper() });

            await result.current.mutateAsync({ email: 'test@example.com', password: 'password' });

            expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'password' });
            expect(mockSetUser).toHaveBeenCalledWith(mockUser);
		});
	});

    describe('useRegisterMutation', () => {
        it('successfully registers', async () => {
            const mockUser = { id: 1, email: 'new@example.com' };
             (api.post as any).mockResolvedValue({ data: { user: mockUser } });

            const { result } = renderHook(() => useRegisterMutation(), { wrapper: createWrapper() });

            await result.current.mutateAsync({ name: 'New User', email: 'new@example.com', password: 'password' });

            expect(api.post).toHaveBeenCalledWith('/auth/register', { name: 'New User', email: 'new@example.com', password: 'password' });
            expect(mockSetUser).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('useLogoutMutation', () => {
        it('successfully logs out', async () => {
             (api.post as any).mockResolvedValue({});

            const { result } = renderHook(() => useLogoutMutation(), { wrapper: createWrapper() });

            await result.current.mutateAsync();

            expect(api.post).toHaveBeenCalledWith('/auth/logout');
            expect(mockLogout).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/login' });
        });
    });
});
