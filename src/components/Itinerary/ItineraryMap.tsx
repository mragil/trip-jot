import {
	Bed,
	Camera,
	Landmark,
	MapPin,
	Navigation,
	Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Activity } from '@/types/trip';

interface Props {
	activities: Activity[];
	onAddActivity: () => void;
}

const typeIcons: Record<string, typeof Utensils> = {
	restaurant: Utensils,
	attraction: Camera,
	accommodation: Bed,
	transportation: Navigation,
	other: Landmark,
};

const typeColors: Record<string, string> = {
	restaurant: 'bg-orange-500',
	attraction: 'bg-blue-500',
	accommodation: 'bg-purple-500',
	transportation: 'bg-green-500',
	other: 'bg-gray-500',
};

const getQuadraticBezierPoint = (
	t: number,
	p0: { x: number; y: number },
	p1: { x: number; y: number },
	p2: { x: number; y: number },
) => {
	const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
	const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
	return { x, y };
};

const getPathPoint = (t: number) => {
	const s1 = {
		p0: { x: 100, y: 200 },
		p1: { x: 256, y: 100 },
		p2: { x: 400, y: 200 },
	};

	const s2 = {
		p0: { x: 400, y: 200 },
		p1: { x: 544, y: 300 },
		p2: { x: 700, y: 150 },
	};

	const point =
		t <= 0.5
			? getQuadraticBezierPoint(t * 2, s1.p0, s1.p1, s1.p2)
			: getQuadraticBezierPoint((t - 0.5) * 2, s2.p0, s2.p1, s2.p2);

	return {
		left: `${(point.x / 800) * 100}%`,
		top: `${(point.y / 400) * 100}%`,
	};
};

export default function ItineraryMap({ activities, onAddActivity }: Props) {
	return (
		<div className="w-full h-full bg-muted/20 relative p-4 flex items-center justify-center overflow-hidden rounded-xl border border-border">
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}
			/>

			{activities.length > 0 && (
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none"
					viewBox="0 0 800 400"
					preserveAspectRatio="xMidYMid meet"
				>
					<title>Itinerary Route Path</title>
					<path
						d="M100 200 Q 256 100 400 200 T 700 150"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeDasharray="8 8"
						className="text-primary/30"
					/>
				</svg>
			)}

			{activities.length === 0 ? (
				<div className="z-10 text-center p-8 bg-background/80 backdrop-blur rounded-xl border border-border shadow-sm max-w-[320px] mx-4">
					<MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
					<p className="font-semibold text-base mb-2">No map data yet</p>
					<p className="text-sm text-muted-foreground mb-4">
						Add activities to see them appear on your route.
					</p>
					<div className="lg:hidden">
						<Button size="sm" variant="outline" onClick={onAddActivity}>
							Add First Activity
						</Button>
					</div>
				</div>
			) : (
				activities.map((activity, index) => {
					const t =
						activities.length === 1 ? 0 : index / (activities.length - 1);

					const position = getPathPoint(t);
					const Icon = typeIcons[activity.type] || Landmark;
					const bgColor = typeColors[activity.type] || 'bg-gray-500';

					return (
						<div
							key={activity.id}
							className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
							style={{ top: position.top, left: position.left }}
						>
							<div
								className={`${bgColor} text-white p-2 rounded-lg shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer ring-2 ring-white dark:ring-background`}
							>
								<Icon className="h-5 w-5" />
							</div>

							<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-popover text-popover-foreground text-xs font-bold px-3 py-1.5 rounded-md shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-border pointer-events-none z-20">
								{activity.name}

								<div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-t border-l border-border rotate-45" />
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}
