import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';



vi.mock('axios', async (importOriginal) => {
await importOriginal();
    const mockAxios: any = vi.fn((config) => Promise.resolve({ data: {}, config }));
    
    mockAxios.create = vi.fn(() => mockAxios);
    mockAxios.defaults = { baseURL: '' };
    
    mockAxios.interceptors = {
        response: {
            use: vi.fn(),
            handlers: []
        }
    };
    return {
        default: mockAxios,
    };
});

describe('API Interceptors', () => {
    let api: any;
    let successHandler: any;
    let errorHandler: any;

    beforeEach(async () => {
        vi.clearAllMocks();
        
        
        
        
        vi.resetModules();
        
        api = (await import('@/lib/api')).default;
        
        
        const useCalls = (api.interceptors.response.use as any).mock.calls;
        if (useCalls.length > 0) {
            successHandler = useCalls[0][0];
            errorHandler = useCalls[0][1];
        }
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('passes success response through', () => {
        const response = { data: 'ok' };
        expect(successHandler(response)).toBe(response);
    });

    it('rejects ordinary error', async () => {
        const error = { response: { status: 500 }, config: {} };
        await expect(errorHandler(error)).rejects.toEqual(error);
    });

    it('handles 401 and refreshes token', async () => {
        const originalRequest = { url: '/protected', _retry: false };
        const error = { 
            response: { status: 401 }, 
            config: originalRequest 
        };

        
        api.post = vi.fn().mockResolvedValue({});
        
        
        api.mockResolvedValue('retried');

        const result = await errorHandler(error);
        
        expect(originalRequest._retry).toBe(true);
        expect(api.post).toHaveBeenCalledWith('/auth/refresh');
        expect(result).toBe('retried');
    });

    it('redirects to login if refresh fails', async () => {
        const originalRequest = { url: '/protected', _retry: false };
        const error = { 
            response: { status: 401 }, 
            config: originalRequest 
        };

        
        api.post = vi.fn().mockRejectedValue('refresh failed');

        
        const originalLocation = window.location;
        delete (window as any).location;
        (window as any).location = { href: '' };

        try {
            await errorHandler(error);
        } catch (e) {
            expect(e).toEqual(error);
        }

        expect(window.location.href).toBe('/login');
        
        
        (window as any).location = originalLocation;
    });
});
