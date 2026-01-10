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

export default function TripCard() {
	return (
		<Card className="w-full max-w-sm overflow-hidden pt-0">
			<div className="bg-primary absolute aspect-video opacity-50 mix-blend-color" />
			<img
				src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Trip"
				title="Photo by mymind on Unsplash"
				className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
			/>
			<CardHeader>
				<CardTitle>Lembang Adventure</CardTitle>
				<CardDescription>
					<MapPin className="mr-1 inline h-4 w-4" />
					Lembang, Bandung, Indonesia
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex items-center justify-between">
				<Badge variant="secondary">
					<Calendar className="mr-1 inline h-4 w-4" />
					Apr 1 - Ap 5, 2026
				</Badge>
				<Button size="icon" variant="secondary" className="rounded-full">
					<ArrowRight className="h-4 w-4" />
				</Button>
			</CardFooter>
		</Card>
	);
}
