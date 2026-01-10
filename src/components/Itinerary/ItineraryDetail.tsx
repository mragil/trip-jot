import { Plus } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ActivityCard from './ActivityCard';

interface ItineraryDetailProps {
	addActivity: () => void;
	selectedDay: number;
}

export default function ItineraryDetail({
	selectedDay,
	addActivity,
}: ItineraryDetailProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold">Day {selectedDay} Details</h3>
				<Button
					onClick={addActivity}
					className="bg-white text-primary border border-gray-200 hover:bg-gray-50"
				>
					<Plus className="h-4 w-4 mr-1" />
					Add Activity
				</Button>
			</div>
			<Card className="flex items-centerr">
				<CardContent className="flex flex-col gap-4">
					<ActivityCard
						id={useId()}
						type="attraction"
						title="Sample Activity"
						time="10:00 AM"
						location="Sample Location"
						onDelete={() => console.log('Delete')}
						onNavigate={() => console.log('Navigate')}
					/>
					<ActivityCard
						id={useId()}
						type="restaurant"
						title="Sample Activity"
						time="12:00 PM"
						location="Sample Location"
						onDelete={() => console.log('Delete')}
						onNavigate={() => console.log('Navigate')}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
