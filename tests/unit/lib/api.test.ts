import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import api from '@/lib/api';


describe('API Client', () => {
    const originalLocation = window.location;
    
    beforeEach(() => {
        vi.resetAllMocks();
        delete (window as any).location;
        (window as any).location = { href: '' };
        
        
        vi.spyOn(api, 'post').mockResolvedValue({} as any);
    });
    
    afterEach(() => {
        (window as any).location = originalLocation;
    });

    it('is configured correctly', () => {
        expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL);
        expect(api.defaults.withCredentials).toBe(true);
    });

    it('handles successful responses', () => {
        
        
        const interceptor = (api.interceptors.response as any).handlers[0];
        const response = { data: 'success' };
        
        
        const result = interceptor.fulfilled(response);
        expect(result).toBe(response);
    });

    it('handles 401 errors by refreshing token', async () => {
        
        const interceptor = (api.interceptors.response as any).handlers[0];
        
        const originalRequest = { url: '/data', _retry: false };
        const error = {
            response: { status: 401 },
            config: originalRequest,
        };

        try {
           await interceptor.rejected(error);
        } catch (e) {
           
        }
        
        expect(api.post).toHaveBeenCalledWith('/auth/refresh');
        expect(originalRequest._retry).toBe(true);
    });

    it('redirects to login on refresh failure', async () => {
        
        const interceptor = (api.interceptors.response as any).handlers[0];
        
        const error = {
            response: { status: 401 },
            config: { url: '/data', _retry: false },
        };
        
        
        (api.post as Mock).mockRejectedValue(new Error('Refresh failed'));
        
        try {
            await interceptor.rejected(error);
        } catch (e) {
            expect(e).toBeDefined();
        }
        
        expect(api.post).toHaveBeenCalledWith('/auth/refresh');
        expect(window.location.href).toBe('/login');
    });

    it('does not retry if already retried', async () => {
        
        const interceptor = (api.interceptors.response as any).handlers[0];
        
        const error = {
            response: { status: 401 },
            config: { url: '/data', _retry: true }, 
        };
        
        try {
            await interceptor.rejected(error);
        } catch (e) {
             expect(e).toBe(error);
        }
        
        expect(api.post).not.toHaveBeenCalled();
    });

    it('does not retry for refresh endpoint failure', async () => {
        
        const interceptor = (api.interceptors.response as any).handlers[0];
        
        const error = {
            response: { status: 401 },
            config: { url: '/auth/refresh', _retry: false }, 
        };
        
        try {
            await interceptor.rejected(error);
        } catch (e) {
             expect(e).toBe(error);
        }
        
        expect(api.post).not.toHaveBeenCalled();
    });
    
    it('passes through other errors', async () => {
        
        const interceptor = (api.interceptors.response as any).handlers[0];
        
        const error = {
            response: { status: 500 },
            config: { url: '/data' },
        };
        
         try {
            await interceptor.rejected(error);
        } catch (e) {
             expect(e).toBe(error);
        }
        
        expect(api.post).not.toHaveBeenCalled();
    });
});
