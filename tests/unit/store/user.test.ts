import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '@/store/user';

describe('User Store', () => {
    beforeEach(() => {
        // Reset store state
        useUserStore.setState({ user: null });
        localStorage.clear();
    });

    it('initializes with null user', () => {
        const { user } = useUserStore.getState();
        expect(user).toBeNull();
    });

    it('sets user correctly', () => {
        const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
        
        useUserStore.getState().setUser(mockUser);
        
        expect(useUserStore.getState().user).toEqual(mockUser);
    });

    it('logs out correctly', () => {
        const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
        
        // Setup initial logged in state
        useUserStore.getState().setUser(mockUser);
        expect(useUserStore.getState().user).not.toBeNull();
        
        // Logout
        useUserStore.getState().logout();
        
        expect(useUserStore.getState().user).toBeNull();
    });
    
    it('persists state (mock check)', () => {
        // Verify that the persist middleware name matches
        // We can't easily test actual localStorage interaction without mocking it effectively or assuming jsdom works.
        // Jsdom supports localStorage, so we can check if it wrote to it.
        
        const mockUser = { id: 1, name: 'Persisted User', email: 'p@example.com' };
        useUserStore.getState().setUser(mockUser);
        
        // Zustand persist writes to localStorage async/sync depending on config. default is sync I believe for localStorage?
        // Actually usually it wraps.
        // Let's check if the item endpoint exists in storage
        (useUserStore as any).persist?.getOptions?.() || { name: 'user-storage' };
        
        // Manually check if data is in localStorage
        const stored = localStorage.getItem('user-storage');
        // Note: Zustand wraps state in { state: ..., version: ... }
        expect(stored).toContain('Persisted User');
    });
});
