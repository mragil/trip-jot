import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TripCardSkeleton() {
	return (
		<Card className="w-full max-w-sm overflow-hidden pt-0">
			<Skeleton className="aspect-video w-full rounded-b-none" />
			<CardHeader className="space-y-2">
				<Skeleton className="h-6 w-3/4" />
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-4 rounded-full" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			</CardHeader>
			<CardFooter className="flex items-center justify-between">
				<Skeleton className="h-5 w-32 rounded-full" />
				<Skeleton className="h-8 w-8 rounded-full" />
			</CardFooter>
		</Card>
	);
}
