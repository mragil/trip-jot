import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useMediaQuery from '@/hooks/useMediaQuery';

describe('useMediaQuery', () => {
    let matchMediaMock: any;
    let listeners: Record<string, (e: any) => void> = {};

    beforeEach(() => {
        listeners = {};
        
        matchMediaMock = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn((type, callback) => {
                listeners[type] = callback;
            }),
            removeEventListener: vi.fn((type) => {
                delete listeners[type];
            }),
            dispatchEvent: vi.fn(),
        }));
        
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: matchMediaMock,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns false by default', () => {
        const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
        expect(result.current).toBe(false);
    });
    
    it('returns initial match state', () => {
        matchMediaMock.mockImplementation((query: string) => ({
             matches: true,
             media: query,
             addEventListener: vi.fn(),
             removeEventListener: vi.fn(),
        }));
        
        const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
        expect(result.current).toBe(true);
    });

    it('updates when media query changes', () => {
         const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
         expect(result.current).toBe(false);

         act(() => {
             // Simulate event
             if (listeners['change']) {
                 listeners['change']({ matches: true } as any);
             }
         });
         
         expect(result.current).toBe(true);
    });
});
