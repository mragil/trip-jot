import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Route } from '@/routes/trips';
import { useUserStore } from '@/store/user';
import { redirect } from '@tanstack/react-router';

vi.mock('@/store/user', () => ({
    useUserStore: {
        getState: vi.fn(),
    }
}));

vi.mock('@tanstack/react-router', () => ({
    createFileRoute: () => (options: any) => options,
    Outlet: () => null,
    redirect: vi.fn(),
}));

describe('Trips Route', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('redirects to login if no user', () => {
        (useUserStore.getState as any).mockReturnValue({ user: null });

        try {
            (Route as any).beforeLoad!({} as any);
        } catch (e) {
        }

        expect(redirect).toHaveBeenCalledWith({ to: '/login' });
    });

    it('proceeds if user exists', () => {
        (useUserStore.getState as any).mockReturnValue({ user: { id: 1 } });

        const result = (Route as any).beforeLoad!({} as any);

        expect(redirect).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
    });
});
