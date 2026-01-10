import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import EmptyTripCard from '@/components/Trip/EmptyTripCard';
import TripCard from '@/components/Trip/TripCard';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/trips/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-4 grid grid-cols-1 gap-6">
			<h1 className="text-4xl font-bold">Hi, User</h1>
			<p className="text-gray-700 text-2xl">Ready for your next adventure?</p>
			<Link to="/trips/new-trip">
				<Button className="w-fit px-6">
					<Plus className="mr-2 h-4 w-4" />
					New Trip
				</Button>
			</Link>
			<EmptyTripCard />
			<TripCard />
		</div>
	);
}
