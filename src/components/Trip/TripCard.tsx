import { Link } from '@tanstack/react-router';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
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
				<div className="relative z-20 aspect-video w-full bg-linear-to-br from-primary to-primary/60 p-6 flex items-center justify-center">
					<MapPin className="h-16 w-16 text-primary-foreground/20 absolute -bottom-2 -right-2 rotate-[-15deg]" />
					<Calendar className="h-12 w-12 text-primary-foreground/20 absolute top-4 left-4" />
				</div>
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
