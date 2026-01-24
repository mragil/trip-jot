import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '@/store/user';

describe('User Store', () => {
    beforeEach(() => {
        
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
        
        
        useUserStore.getState().setUser(mockUser);
        expect(useUserStore.getState().user).not.toBeNull();
        
        
        useUserStore.getState().logout();
        
        expect(useUserStore.getState().user).toBeNull();
    });
    
    it('persists state (mock check)', () => {
        
        
        
        
        const mockUser = { id: 1, name: 'Persisted User', email: 'p@example.com' };
        useUserStore.getState().setUser(mockUser);
        
        
        
        
        (useUserStore as any).persist?.getOptions?.() || { name: 'user-storage' };
        
        
        const stored = localStorage.getItem('user-storage');
        
        expect(stored).toContain('Persisted User');
    });
});
