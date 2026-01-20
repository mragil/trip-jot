import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { Trip } from '@/hooks/useTrips';

interface TripCardProps {
	trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<Link to="/trips/$id" params={{ id: trip.id.toString() }} className="block">
			<Card className="w-full max-w-sm overflow-hidden pt-0 transition-all hover:shadow-lg">
				<div className="bg-primary absolute aspect-video opacity-50 mix-blend-color" />
				<img
					src="/trip-placeholder.png"
					alt={trip.destination}
					className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
				/>
				<CardHeader>
					<CardTitle>{trip.name}</CardTitle>
					<CardDescription>
						<MapPin className="mr-1 inline h-4 w-4" />
						{trip.destination}
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex items-center justify-between">
					<Badge variant="secondary">
						<Calendar className="mr-1 inline h-4 w-4" />
						{formatDate(trip.startDate)} - {formatDate(trip.endDate)}
					</Badge>
					<Button size="icon" variant="secondary" className="rounded-full">
						<ArrowRight className="h-4 w-4" />
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
