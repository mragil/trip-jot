import { Construction as ConstructionIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface ConstructionProps {
	title?: string;
	message?: string;
}

export default function Construction({
	title = 'Under Construction',
	message = "We're working hard to bring you this feature. Check back soon!",
}: ConstructionProps) {
	return (
		<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
			<div className="mb-6 rounded-full bg-primary/10 p-6 ring-1 ring-primary/20">
				<ConstructionIcon className="h-12 w-12 text-primary" />
			</div>
			<h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
			<p className="mb-8 max-w-md text-muted-foreground">{message}</p>
			<Link to="/trips" className={cn(buttonVariants({ variant: 'default' }))}>
				Back to Dashboard
			</Link>
		</div>
	);
}
