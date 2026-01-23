import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Activity } from '@/types/trip';
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
		<div className="h-full flex flex-col">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-2xl font-bold tracking-tight">
						Day {selectedDay}
					</h3>
					<p className="text-muted-foreground">
						{format(date, 'EEEE, MMMM do')}
					</p>
				</div>
				{activities.length > 0 && (
					<Button
						onClick={() => addActivity(date)}
						size="sm"
						className="rounded-full shadow-sm"
					>
						<Plus className="h-4 w-4 mr-1.5" />
						Add Activity
					</Button>
				)}
			</div>

			<div className="relative pl-6 border-l-2 border-muted space-y-8 pb-10">
				{activities.length === 0 ? (
					<div className="relative">
						<div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-muted border-4 border-background" />
						<div className="rounded-xl border border-dashed border-muted p-8 text-center">
							<p className="text-muted-foreground text-sm mb-2">
								No plans yet for this day.
							</p>
							<Button variant="link" onClick={() => addActivity(date)}>
								Add your first stop
							</Button>
						</div>
					</div>
				) : (
					activities.map((activity) => (
						<div key={activity.id} className="relative">
							<div className="absolute -left-[33px] top-4 h-4 w-4 rounded-full bg-primary border-4 border-background ring-1 ring-border shadow-sm z-10" />

							<ActivityCard
								id={String(activity.id)}
								type={activity.type}
								title={activity.name}
								time={format(new Date(activity.startTime), 'h:mm a')}
								location={activity.location}
								onDelete={() => console.log('Delete', activity.id)}
								onNavigate={() => console.log('Navigate', activity.id)}
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}
