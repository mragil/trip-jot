import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addDocument, getDocumentsByTripId, deleteDocument, getDocument } from '../../../src/lib/db';
import { openDB } from 'idb';

vi.mock('idb', () => ({
  openDB: vi.fn(),
}));

describe('db', () => {
  const mockDb = {
    add: vi.fn(),
    getAllFromIndex: vi.fn(),
    delete: vi.fn(),
    get: vi.fn(),
    createObjectStore: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (openDB as any).mockResolvedValue(mockDb);
  });

  describe('addDocument', () => {
    it('should add a document to the database', async () => {
      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const document = {
        tripId: 'trip-123',
        userId: 'user-123',
        file,
      };

      const result = await addDocument(document);

      expect(openDB).toHaveBeenCalledWith('wanderlog-db', 2, expect.any(Object));
      expect(mockDb.add).toHaveBeenCalledWith('documents', expect.objectContaining({
        tripId: 'trip-123',
        userId: 'user-123',
        name: 'test.pdf',
        type: 'application/pdf',
        blob: file,
      }));
      expect(result).toMatchObject({
        tripId: 'trip-123',
        userId: 'user-123',
        name: 'test.pdf',
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('getDocumentsByTripId', () => {
    it('should get documents by trip id and user id', async () => {
      const mockDocs = [{ id: '1', name: 'test.pdf' }];
      mockDb.getAllFromIndex.mockResolvedValue(mockDocs);

      const result = await getDocumentsByTripId('trip-123', 'user-123');

      expect(mockDb.getAllFromIndex).toHaveBeenCalledWith('documents', 'by-user-trip', ['user-123', 'trip-123']);
      expect(result).toEqual(mockDocs);
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document by id', async () => {
      await deleteDocument('doc-123');

      expect(mockDb.delete).toHaveBeenCalledWith('documents', 'doc-123');
    });
  });

  describe('getDocument', () => {
    it('should get a document by id', async () => {
      const mockDoc = { id: 'doc-123', name: 'test.pdf' };
      mockDb.get.mockResolvedValue(mockDoc);

      const result = await getDocument('doc-123');

      expect(mockDb.get).toHaveBeenCalledWith('documents', 'doc-123');
      expect(result).toEqual(mockDoc);
    });
  });
});
