import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import EmptyTripCard from '@/components/Trip/EmptyTripCard';
import TripCard from '@/components/Trip/TripCard';
import TripCardSkeleton from '@/components/Trip/TripCardSkeleton';
import TripErrorState from '@/components/Trip/TripErrorState';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrips } from '@/hooks/use-trips';

export const Route = createFileRoute('/trips/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: trips, isLoading, isError, refetch } = useTrips();

	if (isLoading) {
		return (
			<div className="p-4 grid grid-cols-1 gap-6">
				<div className="space-y-2">
					<Skeleton className="h-10 w-48" />
					<Skeleton className="h-8 w-96" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Skeleton key
						<TripCardSkeleton key={i} />
					))}
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="p-4 grid grid-cols-1 gap-6">
				<h1 className="text-4xl font-bold">Hi, User</h1>
				<p className="text-gray-700 text-2xl">Ready for your next adventure?</p>
				<TripErrorState onRetry={() => refetch()} />
			</div>
		);
	}

	return (
		<div className="p-4 grid grid-cols-1 gap-6">
			<h1 className="text-4xl font-bold">Hi, User</h1>
			<p className="text-gray-700 text-2xl">Ready for your next adventure?</p>

			{trips && trips.length > 0 ? (
				<>
			<Link to="/trips/new-trip">
				<Button className="w-fit px-6">
					<Plus className="mr-2 h-4 w-4" />
					New Trip
				</Button>
			</Link>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{trips.map((trip) => (
						<TripCard key={trip.id} trip={trip} />
					))}
				</div>
				</>
			) : (
				<EmptyTripCard />
			)}
		</div>
	);
}
