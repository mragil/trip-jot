import {
	Bed,
	Camera,
	Landmark,
	MapPin,
	Navigation,
	Trash2,
	Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import type { ActivityType } from '@/types/trip';

interface ActivityCardProps {
	id: string;
	title: string;
	type: ActivityType;
	time?: string;
	location?: string;
	onDelete?: (id: string) => void;
	onNavigate?: (id: string) => void;
}

const typeIcons: Record<string, typeof Utensils> = {
	restaurant: Utensils,
	attraction: Camera,
	accommodation: Bed,
	transportation: Navigation,
	other: Landmark, // simplified default
};

const typeColors: Record<string, string> = {
	attraction: 'text-blue-500',
	restaurant: 'text-orange-500',
	accommodation: 'text-purple-500',
	transportation: 'text-green-500',
	other: 'text-gray-500',
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
	const Icon = typeIcons[type] || Landmark;
	const iconColor = typeColors[type] || 'text-gray-500';

	return (
		<div className="group relative">
			{/* Timeline Dot connector handled by parent/layout, but we style the Card itself here */}
			<div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:translate-x-1 hover:shadow-md">
				{/* Top Row: Time & Icon */}
				<div className="flex justify-between items-start mb-2">
					{time ? (
						<span className="text-xs font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
							{time}
						</span>
					) : (
						<span className="text-xs font-mono text-muted-foreground">
							--:--
						</span>
					)}

					{/* Actions (hidden by default, show on hover) */}
					<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 bg-card/80 backdrop-blur rounded-md p-0.5 border border-border">
						{onNavigate && (
							<Button
								variant="ghost"
								size="icon-xs"
								className="h-6 w-6"
								onClick={() => onNavigate(id)}
							>
								<Navigation className="h-3 w-3" />
							</Button>
						)}
						{onDelete && (
							<Button
								variant="ghost"
								size="icon-xs"
								className="h-6 w-6 text-destructive hover:text-destructive"
								onClick={() => onDelete(id)}
							>
								<Trash2 className="h-3 w-3" />
							</Button>
						)}
					</div>

					<Icon className={`h-4 w-4 ${iconColor}`} />
				</div>

				{/* Content */}
				<h3 className="font-medium text-sm text-foreground line-clamp-2 leading-tight">
					{title}
				</h3>

				{location && (
					<div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
						<MapPin className="h-3 w-3 shrink-0" />
						<span className="truncate">{location}</span>
					</div>
				)}
			</div>
		</div>
	);
}
