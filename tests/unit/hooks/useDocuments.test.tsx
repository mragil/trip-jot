import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDocuments } from '../../../src/hooks/useDocuments';
import { useUserStore } from '../../../src/store/user';
import { addDocument, deleteDocument, getDocumentsByTripId } from '../../../src/lib/db';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { toast } from 'sonner';

// Mock dependencies
vi.mock('../../../src/lib/db', () => ({
  addDocument: vi.fn(),
  deleteDocument: vi.fn(),
  getDocumentsByTripId: vi.fn(),
}));

vi.mock('../../../src/store/user', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Setup QueryClient wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useDocuments', () => {
  const mockTripId = 'trip-123';
  const mockUser = { id: 'user-123', name: 'Test User' };

  beforeEach(() => {
    vi.clearAllMocks();
    (useUserStore as any).mockImplementation((selector: any) => selector({ user: mockUser }));
  });

  describe('query', () => {
    it('should fetch documents when user is logged in', async () => {
      const mockDocs = [{ id: 'doc-1', name: 'test.pdf' }];
      (getDocumentsByTripId as any).mockResolvedValue(mockDocs);

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getDocumentsByTripId).toHaveBeenCalledWith(mockTripId, mockUser.id);
      expect(result.current.documents).toEqual(mockDocs);
    });

    it('should not fetch documents when user is not logged in', async () => {
      (useUserStore as any).mockImplementation((selector: any) => selector({ user: null }));

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getDocumentsByTripId).not.toHaveBeenCalled();
      expect(result.current.documents).toEqual([]);
    });

    it('should handle fetch errors', async () => {
      (getDocumentsByTripId as any).mockRejectedValue(new Error('Fetch error'));

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.documents).toEqual([]);
    });
  });

  describe('upload', () => {
    it('should upload a valid file', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      (addDocument as any).mockResolvedValue({ id: 'new-doc', name: 'test.pdf' });

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      result.current.upload(file);

      await waitFor(() => expect(result.current.isUploading).toBe(false));

      expect(addDocument).toHaveBeenCalledWith({
        tripId: mockTripId,
        userId: mockUser.id,
        file,
      });
      expect(toast.success).toHaveBeenCalledWith('Document saved to vault');
    });

    it('should show error if user is not logged in', async () => {
       (useUserStore as any).mockImplementation((selector: any) => selector({ user: null }));
       const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

       const { result } = renderHook(() => useDocuments(mockTripId), {
          wrapper: createWrapper(),
        });

      result.current.upload(file);

      await waitFor(() => expect(result.current.isUploading).toBe(false));
      
      expect(addDocument).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('You must be logged in to upload documents');
    });

    it('should validate file size', async () => {
      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
      
      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      result.current.upload(largeFile);
       await waitFor(() => expect(result.current.isUploading).toBe(false));

      expect(addDocument).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('File size exceeds 5MB limit');
    });

    it('should validate file type', async () => {
      const invalidFile = new File(['content'], 'test.txt', { type: 'text/plain' });

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      result.current.upload(invalidFile);
      await waitFor(() => expect(result.current.isUploading).toBe(false));

      expect(addDocument).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Invalid file type. Only PDF and images are allowed');
    });

    it('should handle upload errors', async () => {
       const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      (addDocument as any).mockRejectedValue(new Error('Upload failed'));

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      result.current.upload(file);
      await waitFor(() => expect(result.current.isUploading).toBe(false));

      expect(toast.error).toHaveBeenCalledWith('Upload failed');
    });
  });

  describe('delete', () => {
    it('should delete a document', async () => {
      (deleteDocument as any).mockResolvedValue(undefined);

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      result.current.remove('doc-1');
      await waitFor(() => expect(result.current.isDeleting).toBe(false));

      expect(deleteDocument).toHaveBeenCalledWith('doc-1');
      expect(toast.success).toHaveBeenCalledWith('Document deleted');
    });

    it('should handle delete errors', async () => {
      (deleteDocument as any).mockRejectedValue(new Error('Delete failed'));

      const { result } = renderHook(() => useDocuments(mockTripId), {
        wrapper: createWrapper(),
      });

      result.current.remove('doc-1');
      await waitFor(() => expect(result.current.isDeleting).toBe(false));

      expect(toast.error).toHaveBeenCalledWith('Failed to delete document');
    });
  });
});
