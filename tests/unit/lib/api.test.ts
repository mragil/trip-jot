import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import api from '@/lib/api';


describe('API Client', () => {
    const originalLocation = window.location;
    
    beforeEach(() => {
        vi.resetAllMocks();
        delete (window as any).location;
        (window as any).location = { href: '' };
        
        // Spy on api.post for refresh
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
        // Access the response interceptor
        // @ts-ignore - handlers is internal but accessible for testing
        const interceptor = api.interceptors.response.handlers[0];
        const response = { data: 'success' };
        
        // success handler is the first argument
        const result = interceptor.fulfilled(response);
        expect(result).toBe(response);
    });

    it('handles 401 errors by refreshing token', async () => {
        // @ts-ignore
        const interceptor = api.interceptors.response.handlers[0];
        
        const originalRequest = { url: '/data', _retry: false };
        const error = {
            response: { status: 401 },
            config: originalRequest,
        };

        try {
           await interceptor.rejected(error);
        } catch (e) {
           // It might fail at `api(originalRequest)` which is expected since we didn't mock the recursive call return fully
        }
        
        expect(api.post).toHaveBeenCalledWith('/auth/refresh');
        expect(originalRequest._retry).toBe(true);
    });

    it('redirects to login on refresh failure', async () => {
        // @ts-ignore
        const interceptor = api.interceptors.response.handlers[0];
        
        const error = {
            response: { status: 401 },
            config: { url: '/data', _retry: false },
        };
        
        // Make refresh fail
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
        // @ts-ignore
        const interceptor = api.interceptors.response.handlers[0];
        
        const error = {
            response: { status: 401 },
            config: { url: '/data', _retry: true }, // Already retried
        };
        
        try {
            await interceptor.rejected(error);
        } catch (e) {
             expect(e).toBe(error);
        }
        
        expect(api.post).not.toHaveBeenCalled();
    });

    it('does not retry for refresh endpoint failure', async () => {
        // @ts-ignore
        const interceptor = api.interceptors.response.handlers[0];
        
        const error = {
            response: { status: 401 },
            config: { url: '/auth/refresh', _retry: false }, // It IS the refresh endpoint
        };
        
        try {
            await interceptor.rejected(error);
        } catch (e) {
             expect(e).toBe(error);
        }
        
        expect(api.post).not.toHaveBeenCalled();
    });
    
    it('passes through other errors', async () => {
        // @ts-ignore
        const interceptor = api.interceptors.response.handlers[0];
        
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
