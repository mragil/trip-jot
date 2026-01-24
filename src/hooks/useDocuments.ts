import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addDocument, deleteDocument, getDocumentsByTripId } from '@/lib/db';
import { useUserStore } from '@/store/user';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; 
export const ALLOWED_TYPES = [
	'application/pdf',
	'image/jpeg',
	'image/png',
	'image/webp',
];

export type TripDocument = Awaited<ReturnType<typeof addDocument>>;

export function useDocuments(tripId: string) {
	const queryClient = useQueryClient();
	const user = useUserStore((state) => state.user);
	
	const queryKey = ['documents', tripId, user?.id];

	const query = useQuery({
		queryKey,
		enabled: !!user,
		queryFn: () => {
			if (!user) return Promise.resolve([]);
			
			return getDocumentsByTripId(tripId, String(user.id));
		},
	});

	const uploadMutation = useMutation({
		mutationFn: async (file: File) => {
			if (!user) throw new Error('You must be logged in to upload documents');

			if (file.size > MAX_FILE_SIZE) {
				throw new Error('File size exceeds 5MB limit');
			}
			if (!ALLOWED_TYPES.includes(file.type)) {
				throw new Error('Invalid file type. Only PDF and images are allowed');
			}
			return addDocument({ tripId, userId: String(user.id), file });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
			toast.success('Document saved to vault');
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : 'Failed to save document',
			);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			return deleteDocument(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
			toast.success('Document deleted');
		},
		onError: () => {
			toast.error('Failed to delete document');
		},
	});

	return {
		documents: query.data || [],
		isLoading: query.isLoading,
		isError: query.isError,
		upload: uploadMutation.mutate,
		isUploading: uploadMutation.isPending,
		remove: deleteMutation.mutate,
		isDeleting: deleteMutation.isPending,
	};
}
