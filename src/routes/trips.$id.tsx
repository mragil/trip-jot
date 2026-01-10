import { createFileRoute } from '@tanstack/react-router';
import { Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import DynamicBreadcrumbs from '@/components/DynamicBreadcrumbs';
import DynamicTabs from '@/components/DynamicTabs';
import ActivityFormDrawer from '@/components/Itinerary/ActivityFormDrawer';
import ItineraryView from '@/components/Itinerary/ItineraryView';

export const Route = createFileRoute('/trips/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	console.log('Trip ID:', id);
	const [formOpen, setFormOpen] = useState(false);

	const tripName = 'Tokyo Adventure';
	const location = 'Seoul, South Korea';
	const dateRange = 'Dec 22 - Dec 24, 2026';

	const tabsData = [
		{
			id: 'itinerary',
			title: 'Itinerary',
			content: <ItineraryView addActivity={() => setFormOpen(true)} />,
		},
		{
			id: 'maps',
			title: 'Maps',
			content: <p className="text-gray-600">Maps view content goes here</p>,
		},
		{
			id: 'documents',
			title: 'Documents',
			content: <p className="text-gray-600">Documents content goes here</p>,
		},
	];

	return (
		<>
			<div className="flex flex-col p-2 sm:p-4 md:p-6 gap-3 sm:gap-4 text-gray-700">
				<DynamicBreadcrumbs
					labelMapper={(segment, path) => {
						if (path === `/trips/${id}`) {
							return tripName;
						}
						return segment.charAt(0).toUpperCase() + segment.slice(1);
					}}
				/>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
						{tripName}
					</h1>
					<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 text-gray-700 text-sm sm:text-base md:text-lg">
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
							<span>{location}</span>
						</div>
						<span className="hidden sm:inline">•</span>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
							<span>{dateRange}</span>
						</div>
					</div>
				</div>
				<DynamicTabs tabs={tabsData} tabsTriggerClassName="py-4" />
			</div>
			<ActivityFormDrawer isFormOpen={formOpen} setIsFormOpen={setFormOpen} />
		</>
	);
}
