import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import EmptyTripCard from '@/components/Trip/EmptyTripCard';
import TripCard from '@/components/Trip/TripCard';
import TripCardSkeleton from '@/components/Trip/TripCardSkeleton';
import TripErrorState from '@/components/Trip/TripErrorState';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrips } from '@/hooks/useTrips';
import { useUserStore } from '@/store/user';

export const Route = createFileRoute('/trips/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: trips, isLoading, isError, refetch } = useTrips();
	const user = useUserStore((state) => state.user);

	if (isLoading) {
		return (
			<div className="p-4 grid grid-cols-1 gap-6">
				<div className="space-y-2">
					<Skeleton className="h-10 w-48" />
					<Skeleton className="h-8 w-96" />
				</div>
				<div className="flex flex-wrap justify-center gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Skeletons do not have stable IDs
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
			<h1 className="text-4xl font-bold">Hi, {user?.name || 'User'}</h1>
			<p className="text-gray-700 text-2xl">Ready for your next adventure?</p>

			{trips && trips.length > 0 ? (
				<>
					{/* Desktop/Tablet Button - Hidden on Mobile */}
					<div className="hidden md:flex justify-start w-full">
						<Link to="/trips/new-trip" className="w-fit">
							<Button className="w-fit px-6">
								<Plus className="mr-2 h-4 w-4" />
								New Trip
							</Button>
						</Link>
					</div>

					{/* Mobile FAB - Hidden on Desktop/Tablet */}
					<Link
						to="/trips/new-trip"
						className="md:hidden fixed bottom-6 right-6 z-50"
					>
						<Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
							<Plus className="h-6 w-6" />
						</Button>
					</Link>

					{/* Grid for Tablet/Desktop, Centered Flex for Mobile */}
					<div className="flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
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
