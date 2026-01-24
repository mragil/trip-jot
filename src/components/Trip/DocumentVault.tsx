import { useRef } from 'react';
import { format } from 'date-fns';
import {
	Download,
	Eye,
	File as FileIcon,
	Loader2,
	Trash2,
	Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDocuments } from '@/hooks/useDocuments';

interface DocumentVaultProps {
	tripId: string;
}

export default function DocumentVault({ tripId }: DocumentVaultProps) {
	const { documents, isLoading, upload, isUploading, remove, isDeleting } =
		useDocuments(tripId);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			upload(file);
			
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleOpen = (doc: { blob: Blob }) => {
		
		const url = URL.createObjectURL(doc.blob);
		window.open(url, '_blank');

		
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	};

	const handleDownload = (doc: { blob: Blob; name: string }) => {
		const url = URL.createObjectURL(doc.blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = doc.name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Document Vault</h2>
					<p className="text-muted-foreground text-sm">
						Store tickets, confirmations, and IDs offline (Max 5MB).
					</p>
				</div>
				<div>
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileChange}
						accept=".pdf,image/*"
					/>
					<Button
						onClick={() => fileInputRef.current?.click()}
						disabled={isUploading}
					>
						{isUploading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Upload className="mr-2 h-4 w-4" />
						)}
						Upload Document
					</Button>
				</div>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Skeletons do not have stable IDs
						<div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
					))}
				</div>
			) : documents.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
						<FileIcon className="h-6 w-6 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">No documents yet</h3>
					<p className="text-muted-foreground text-sm max-w-sm mt-2 mb-4">
						Upload PDFs or images to keep them safe and accessible offline.
					</p>
					<Button
						variant="outline"
						onClick={() => fileInputRef.current?.click()}
					>
						Browse Files
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{documents.map((doc) => (
						<Card
							key={doc.id}
							className="overflow-hidden group hover:shadow-md transition-all"
						>
							<CardContent className="p-4">
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-center gap-3 min-w-0">
										<div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
											<FileIcon className="h-5 w-5 text-primary" />
										</div>
										<div className="min-w-0">
											<p className="font-medium truncate" title={doc.name}>
												{doc.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{(doc.size / 1024 / 1024).toFixed(2)} MB •{' '}
												{format(doc.createdAt, 'MMM d, yyyy')}
											</p>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2 mt-4 pt-4 border-t">
									<Button
										variant="ghost"
										size="sm"
										className="flex-1 h-8 text-xs"
										onClick={() => handleOpen(doc)}
									>
										<Eye className="mr-2 h-3 w-3" />
										View
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="flex-1 h-8 text-xs"
										onClick={() => handleDownload(doc)}
									>
										<Download className="mr-2 h-3 w-3" />
										Save
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 w-8 px-0 text-destructive hover:text-destructive hover:bg-destructive/10"
										onClick={() => remove(doc.id)}
										disabled={isDeleting}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
