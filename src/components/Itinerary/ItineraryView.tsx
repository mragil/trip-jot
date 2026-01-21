import { useState } from 'react';
import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { Trip } from '@/hooks/useTrips';
import ItineraryDetail from './ItineraryDetail';
import ItineraryMap from './ItineraryMap';

type Props = {
	addActivity: (date: Date) => void;
	trip: Trip;
};

export default function ItineraryView(props: Props) {
	const { addActivity, trip } = props;
	const [selectedDay, setSelectedDay] = useState<number>(1);

	const daysInterval = eachDayOfInterval({
		start: new Date(trip.startDate),
		end: new Date(trip.endDate),
	});

	const days = daysInterval.map((date, index) => {
		const dayNum = index + 1;
		const dayActivities = trip.activities
			? trip.activities.filter((activity) =>
					isSameDay(new Date(activity.startTime), date),
				)
			: [];

		return {
			day: dayNum,
			date: format(date, 'MMM dd'),
			fullDate: date,
			places: dayActivities.length,
			activities: dayActivities,
		};
	});

	const [showMap, setShowMap] = useState(false);

	const currentDayData = days.find((d) => d.day === selectedDay) || days[0];

	return (
		<div className="flex flex-col h-[calc(100vh-140px)] gap-4 relative">
			{/* Top Navigation / Day Selector */}
			<div className="border rounded-xl bg-card p-1 shadow-sm shrink-0">
				<ScrollArea className="w-full whitespace-nowrap">
					<div className="flex w-max min-w-full justify-center space-x-2 p-1">
						{days.map((dayInfo) => (
							<Button
								key={dayInfo.day}
								variant="ghost"
								onClick={() => setSelectedDay(dayInfo.day)}
								className={`
									rounded-lg px-4 py-2 h-auto flex flex-col items-start gap-1 transition-all
									${
										selectedDay === dayInfo.day
											? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
											: 'hover:bg-muted text-muted-foreground hover:text-foreground'
									}
								`}
							>
								<span className="text-xs font-medium opacity-80">
									Day {dayInfo.day}
								</span>
								<span className="text-sm font-bold flex items-center gap-1.5">
									<Calendar className="h-3 w-3" />
									{dayInfo.date}
								</span>
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>

			{/* Main Split View */}
			<div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
				{/* Left Column: Timeline details - Hidden on mobile if map is shown */}
				<div
					className={`
						lg:col-span-1 overflow-y-auto pr-2 pl-4
						${showMap ? 'hidden lg:block' : 'block'}
					`}
				>
					<ItineraryDetail
						selectedDay={selectedDay}
						date={currentDayData.fullDate}
						addActivity={addActivity}
						activities={currentDayData ? currentDayData.activities : []}
					/>
				</div>

				{/* Right Column: Visual Map - Hidden on mobile unless toggled */}
				<div
					className={`
						lg:block lg:col-span-2 h-full rounded-2xl overflow-hidden border border-border shadow-sm sticky top-0
						${showMap ? 'block' : 'hidden'}
					`}
				>
					<ItineraryMap />
				</div>
			</div>

			{/* Mobile Toggle Button */}
			<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
				<Button
					onClick={() => setShowMap(!showMap)}
					className="rounded-full shadow-xl px-6 py-6 font-semibold"
					size="lg"
				>
					{showMap ? (
						<>
							<span className="mr-2">Show List</span>
							<Calendar className="h-4 w-4" />
						</>
					) : (
						<>
							<span className="mr-2">Show Map</span>
							<MapPin className="h-4 w-4" />
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
