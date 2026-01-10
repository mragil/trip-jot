import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export default function EmptyTripCard() {
	return (
		<Card className="w-full border-4 border-dashed py-12">
			<div className="flex flex-col items-center gap-6 px-6">
				<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
					<Plus className="h-10 w-10 text-gray-400" />
				</div>
				<CardTitle className="text-xl text-center">
					No trips planned yet
				</CardTitle>
				<CardDescription className="text-center">
					Your travel journal is waiting for its first entry. Start by creating
					a new trip to track your itinerary and documents.
				</CardDescription>
				<Link to="/trips/new-trip">
					<Button className="px-6">Get Started</Button>
				</Link>
			</div>
		</Card>
	);
}
