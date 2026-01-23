import { Link } from '@tanstack/react-router';
import { FileQuestion } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
	return (
		<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
			<div className="mb-6 rounded-full bg-destructive/10 p-6 ring-1 ring-destructive/20">
				<FileQuestion className="h-12 w-12 text-destructive" />
			</div>
			<h1 className="mb-2 text-3xl font-bold tracking-tight">Page Not Found</h1>
			<p className="mb-8 max-w-md text-muted-foreground">
				Sorry, we couldn't find the page you're looking for. It might have been
				removed or doesn't exist.
			</p>
			<Link to="/trips" className={cn(buttonVariants({ variant: 'default' }))}>
				Back to Dashboard
			</Link>
		</div>
	);
}
