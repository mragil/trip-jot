import { useState } from 'react';
import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Trip } from '@/hooks/useTrips';
import ItineraryDetail from './ItineraryDetail';

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
			date: format(date, 'eee, MMM dd'),
			fullDate: date,
			places: dayActivities.length,
			activities: dayActivities,
		};
	});

	const currentDayData = days.find((d) => d.day === selectedDay) || days[0];

	return (
		<div className="flex flex-col gap-4">
			<div className="md:hidden">
				<ScrollArea className="w-full">
					<div className="flex gap-2 pb-2">
						{days.map((dayInfo) => (
							<Button
								key={dayInfo.day}
								onClick={() => setSelectedDay(dayInfo.day)}
								className={`shrink-0 px-4 py-3 rounded-lg border-2 transition-all text-center h-auto ${
									selectedDay === dayInfo.day
										? 'bg-primary text-primary-foreground border-primary'
										: 'bg-background border-border hover:border-primary/50'
								}`}
							>
								<div className="flex flex-col items-center">
									<p
										className={`text-xs font-medium whitespace-nowrap ${
											selectedDay === dayInfo.day
												? 'text-primary-foreground'
												: 'text-primary'
										}`}
									>
										Day {dayInfo.day}
									</p>
									<p
										className={`text-sm font-bold whitespace-nowrap ${
											selectedDay === dayInfo.day
												? 'text-primary-foreground'
												: 'text-primary'
										}`}
									>
										{dayInfo.date}
									</p>
									<p
										className={`text-xs whitespace-nowrap ${
											selectedDay === dayInfo.day
												? 'text-primary-foreground/70'
												: 'text-gray-500'
										}`}
									>
										{dayInfo.places} Places
									</p>
								</div>
							</Button>
						))}
					</div>
				</ScrollArea>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="hidden md:block md:col-span-1">
					<ScrollArea className="h-150 w-full rounded-md border p-4">
						<div className="flex flex-col gap-3">
							{days.map((dayInfo) => (
								<Card
									key={dayInfo.day}
									onClick={() => setSelectedDay(dayInfo.day)}
									className={`cursor-pointer transition-colors ${
										selectedDay === dayInfo.day
											? 'bg-primary text-primary-foreground'
											: 'hover:bg-accent'
									}`}
								>
									<CardContent className="p-4">
										<p className="text-sm">Day {dayInfo.day}</p>
										<p
											className={`text-base font-bold ${selectedDay === dayInfo.day ? 'text-primary-foreground' : 'text-gray-700'}`}
										>
											{dayInfo.date}
										</p>
										<p
											className={`text-xs ${selectedDay === dayInfo.day ? 'text-primary-foreground/70' : 'text-gray-500'}`}
										>
											{dayInfo.places} Places
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</ScrollArea>
				</div>
				<div className="md:col-span-2">
					<ItineraryDetail
						selectedDay={selectedDay}
						date={currentDayData.fullDate}
						addActivity={addActivity}
						activities={currentDayData ? currentDayData.activities : []}
					/>
				</div>
			</div>
		</div>
	);
}
