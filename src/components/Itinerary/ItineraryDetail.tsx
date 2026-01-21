import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Activity } from '@/hooks/useTrips';
import ActivityCard from './ActivityCard';

interface ItineraryDetailProps {
	activities: Activity[];
	date: Date;
	addActivity: (date: Date) => void;
	selectedDay: number;
}

export default function ItineraryDetail({
	selectedDay,
	date,
	addActivity,
	activities,
}: ItineraryDetailProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold">Day {selectedDay} Details</h3>
				<Button
					onClick={() => addActivity(date)}
					className="bg-white text-primary border border-gray-200 hover:bg-gray-50"
				>
					<Plus className="h-4 w-4 mr-1" />
					Add Activity
				</Button>
			</div>
			{activities.length === 0 ? (
				<Card>
					<CardContent className="p-6 text-center text-gray-500">
						No activities planned for this day.
					</CardContent>
				</Card>
			) : (
				<Card className="flex items-centerr">
					<CardContent className="flex flex-col gap-4 pt-6">
						{activities.map((activity) => (
							<ActivityCard
								key={activity.id}
								id={String(activity.id)}
								type={
									[
										'attraction',
										'restaurant',
										'accommodation',
										'transportation',
									].includes(activity.type)
										? (activity.type as any)
										: 'other'
								}
								title={activity.name}
								time={format(new Date(activity.startTime), 'h:mm a')}
								location={activity.location}
								onDelete={() => console.log('Delete', activity.id)}
								onNavigate={() => console.log('Navigate', activity.id)}
							/>
						))}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
