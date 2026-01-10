import { createFileRoute } from '@tanstack/react-router';
import { Plane } from 'lucide-react';
import DynamicBreadcrumbs from '@/components/DynamicBreadcrumbs';
import TripForm from '@/components/Trip/TripForm';

export const Route = createFileRoute('/trips/new-trip')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col p-4 gap-4 text-gray-700">
			<DynamicBreadcrumbs />
			<div className="flex flex-col gap-2">
				<h1 className="text-4xl font-bold">Create a New Trip</h1>
				<p className="text-gray-700 text-lg">
					Start planning your next adventure by filling out the details below.
				</p>
			</div>
			<div className="flex flex-col gap-4 mt-6 p-4 border rounded-lg bg-white shadow">
				<div className="flex gap-4 items-start">
					<div className="p-3 bg-primary border border-primary rounded-lg">
						<Plane className="h-6 w-6 text-primary-foreground" />
					</div>
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold">Trip Details</h2>
						<p className="text-gray-600">
							Fill in the basics to start planning your itinerary.
						</p>
					</div>
				</div>
				<TripForm />
			</div>
		</div>
	);
}
