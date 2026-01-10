import { Clock, GripVertical, MapPin, Navigation, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ActivityCardProps {
	id: string;
	title: string;
	type:
		| 'attraction'
		| 'restaurant'
		| 'accommodation'
		| 'transportation'
		| 'other';
	time?: string;
	location?: string;
	onDelete?: (id: string) => void;
	onNavigate?: (id: string) => void;
}

const typeLabels: Record<string, string> = {
	attraction: 'Attraction',
	restaurant: 'Restaurant',
	accommodation: 'Accommodation',
	transportation: 'Transportation',
	other: 'Other',
};

const typeColors: Record<string, string> = {
	attraction: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
	restaurant:
		'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
	accommodation:
		'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
	transportation:
		'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
	other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function ActivityCard({
	id,
	title,
	type,
	time,
	location,
	onDelete,
	onNavigate,
}: ActivityCardProps) {
	return (
		<Card className="flex flex-row justify-start transition-shadow hover:shadow-md">
			<CardContent className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
				<div className="flex items-center gap-4 sm:gap-6 flex-1">
					<button
						type="button"
						className="touch-none cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Drag to reorder"
					>
						<GripVertical className="h-5 w-5" />
					</button>
					<div className="space-y-2 flex-1">
						<div className="flex items-center gap-4">
							<h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
								{title}
							</h3>
							<Badge
								variant="secondary"
								className={`text-xs px-2 py-0.5 ${typeColors[type]}`}
							>
								{typeLabels[type]}
							</Badge>
						</div>
						<div className="flex gap-1.5 text-sm text-gray-600 dark:text-gray-400">
							{time && (
								<div className="flex items-center gap-1.5">
									<Clock className="h-4 w-4 shrink-0" />
									<span className="truncate">{time}</span>
								</div>
							)}
							{location && (
								<div className="flex items-center gap-1.5">
									<MapPin className="h-4 w-4 shrink-0" />
									<span className="truncate">{location}</span>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* ACTION BUTTON */}
				<div className="flex items-center gap-2 justify-end sm:justify-start">
					{onDelete && (
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							onClick={() => onDelete(id)}
							className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
							aria-label="Delete"
						>
							<Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
					)}
					{onNavigate && (
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							onClick={() => onNavigate(id)}
							className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
							aria-label="Navigate"
						>
							<Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
