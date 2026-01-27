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
import { formatCurrency } from '@/lib/formatter';
import type { ActivityType } from '@/types/trip';

interface ActivityCardProps {
	id: string;
	title: string;
	type: ActivityType;
	time?: string;
	location?: string;
	cost?: number;
	currency?: string;
	onDelete?: (id: string) => void;
	onNavigate?: (id: string) => void;
}

const typeIcons: Record<string, typeof Utensils> = {
	restaurant: Utensils,
	attraction: Camera,
	accommodation: Bed,
	transportation: Navigation,
	other: Landmark,
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
	cost,
	currency,
	onDelete,
	onNavigate,
}: ActivityCardProps) {
	const Icon = typeIcons[type] || Landmark;
	const iconColor = typeColors[type] || 'text-gray-500';

	return (
		<div className="group relative">
			<div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:translate-x-1 hover:shadow-md">
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

					<div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity absolute top-2 right-2 bg-card/80 backdrop-blur rounded-md p-0.5 border border-border">
						{onNavigate && (
							<Button
								variant="ghost"
								size="icon-xs"
								className="h-6 w-6"
								onClick={() => onNavigate(id)}
								aria-label="Navigate to location"
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
								aria-label="Delete activity"
							>
								<Trash2 className="h-3 w-3" />
							</Button>
						)}
					</div>

					<Icon className={`h-4 w-4 ${iconColor}`} />
				</div>

				<h3 className="font-medium text-sm text-foreground line-clamp-2 leading-tight">
					{title}
				</h3>

				{location && (
					<div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
						<MapPin className="h-3 w-3 shrink-0" />
						<span className="truncate">{location}</span>
					</div>
				)}

				{(cost ?? 0) > 0 && (
					<div className="mt-1.5 flex items-center justify-end">
						<span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
							{formatCurrency(cost ?? 0, currency)}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
