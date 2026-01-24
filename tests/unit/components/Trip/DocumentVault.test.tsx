import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DocumentVault from '../../../../src/components/Trip/DocumentVault';
import { useDocuments } from '../../../../src/hooks/useDocuments';

vi.mock('../../../../src/hooks/useDocuments');

// Mock URL.createObjectURL and URL.revokeObjectURL
// We will set these in beforeEach to ensure they persist or are reset correctly if restored.
// Actually, if we use vi.restoreAllMocks(), we need to re-mock these.

describe('DocumentVault', () => {
  const mockUpload = vi.fn();
  const mockRemove = vi.fn();
  const mockTripId = 'trip-123';

  beforeEach(() => {
    vi.clearAllMocks();
    // Re-setup global mocks in case they were restored
    global.URL.createObjectURL = vi.fn(() => 'blob:test-url');
    global.URL.revokeObjectURL = vi.fn();
    global.open = vi.fn();

    (useDocuments as any).mockReturnValue({
      documents: [],
      isLoading: false,
      upload: mockUpload,
      isUploading: false,
      remove: mockRemove,
      isDeleting: false,
    });
  });

  afterEach(() => {
      vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    (useDocuments as any).mockReturnValue({
      documents: [],
      isLoading: true,
      upload: mockUpload,
      isUploading: false,
      remove: mockRemove,
      isDeleting: false,
    });

    render(<DocumentVault tripId={mockTripId} />);
    // Skeletons are rendered as divs with 'animate-pulse' class
    // We search by class using querySelector on the container if needed, or by text if they had content.
    // Since they are empty divs, we can check for elements with that class.
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders empty state when no documents', () => {
    render(<DocumentVault tripId={mockTripId} />);
    expect(screen.getByText('No documents yet')).toBeTruthy();
  });

  it('renders list of documents', () => {
    const documents = [
      {
        id: 'doc-1',
        name: 'test.pdf',
        size: 1024 * 1024,
        createdAt: Date.now(),
        blob: new Blob(['test'], { type: 'application/pdf' }),
      },
    ];

    (useDocuments as any).mockReturnValue({
      documents,
      isLoading: false,
      upload: mockUpload,
      isUploading: false,
      remove: mockRemove,
      isDeleting: false,
    });

    render(<DocumentVault tripId={mockTripId} />);
    expect(screen.getByText('test.pdf')).toBeTruthy();
    expect(screen.getByText('1.00 MB • ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))).toBeTruthy();
  });

  it('handles file upload via button', async () => {
    const { container } = render(<DocumentVault tripId={mockTripId} />);

    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    // Select the hidden file input directly
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockUpload).toHaveBeenCalledWith(file);
  });

  it('handles file upload via empty state button', async () => {
    const { container } = render(<DocumentVault tripId={mockTripId} />); // Empty state initially

    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    // Empty state button triggers the same hidden input
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    
    // We simulate the change as if the user selected a file after clicking
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(mockUpload).toHaveBeenCalledWith(file);
  });

  it('handles viewing a document', async () => {
    const documents = [
        {
          id: 'doc-1',
          name: 'test.pdf',
          size: 1024 * 1024,
          createdAt: Date.now(),
          blob: new Blob(['test'], { type: 'application/pdf' }),
        },
      ];
      (useDocuments as any).mockReturnValue({
        documents,
        isLoading: false,
        upload: mockUpload,
        isUploading: false,
        remove: mockRemove,
        isDeleting: false,
      });

    render(<DocumentVault tripId={mockTripId} />);
    
    fireEvent.click(screen.getByText('View'));
    
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(documents[0].blob);
    expect(global.open).toHaveBeenCalledWith('blob:test-url', '_blank');
  });

  it('handles downloading a document', async () => {
    const documents = [
        {
          id: 'doc-1',
          name: 'test.pdf',
          size: 1024 * 1024,
          createdAt: Date.now(),
          blob: new Blob(['test'], { type: 'application/pdf' }),
        },
      ];
      (useDocuments as any).mockReturnValue({
        documents,
        isLoading: false,
        upload: mockUpload,
        isUploading: false,
        remove: mockRemove,
        isDeleting: false,
      });

    render(<DocumentVault tripId={mockTripId} />);
    
    // Creating a spy on createElement and click
    const clickSpy = vi.fn();
    const link = { href: '', download: '', click: clickSpy, style: {} } as any;
    vi.spyOn(document, 'createElement').mockReturnValue(link);
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => link);
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => link);

    fireEvent.click(screen.getByText('Save'));
    
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(documents[0].blob);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(link.download).toBe('test.pdf');
    expect(link.href).toBe('blob:test-url');
    expect(clickSpy).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalledWith(link);
    expect(document.body.removeChild).toHaveBeenCalledWith(link);
  });

  it('handles removing a document', async () => {
     const documents = [
        {
          id: 'doc-1',
          name: 'test.pdf',
          size: 1024 * 1024,
          createdAt: Date.now(),
          blob: new Blob(['test'], { type: 'application/pdf' }),
        },
      ];
      (useDocuments as any).mockReturnValue({
        documents,
        isLoading: false,
        upload: mockUpload,
        isUploading: false,
        remove: mockRemove,
        isDeleting: false,
      });

    render(<DocumentVault tripId={mockTripId} />);
    
    // Find the trash button.
    // The previous test logic found button by role, let's try to be more specific or robust.
    // In strict mode, we might need a test-id. But let's look for the one with the trash icon logic?
    // Or simply the last button in the card?
    const buttons = screen.getAllByRole('button');
    const removeButton = buttons[buttons.length - 1];
    
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith('doc-1');
  });
});
