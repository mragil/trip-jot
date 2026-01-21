import { MapPin, Camera, Utensils, Users } from 'lucide-react';

export default function ItineraryMap() {
	return (
		<div className="w-full h-full bg-muted/20 relative p-4 flex items-center justify-center overflow-hidden rounded-xl border border-border">
			{/* Abstract Map UI */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}
			/>

			{/* Map Nodes connected by dashed lines */}
			<svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
				<path
					d="M100 200 Q 300 50 400 250 T 700 150"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeDasharray="8 8"
					className="text-primary/40 animate-pulse"
				/>
			</svg>

			{/* Map Pins */}
			<div className="absolute top-[50%] left-[12.5%] -translate-x-1/2 -translate-y-1/2 animate-bounce delay-0 z-10">
				<div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
					<MapPin className="h-5 w-5" />
				</div>
				<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card text-card-foreground text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
					Arashiyama
				</div>
			</div>

			<div className="absolute top-[62.5%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-bounce delay-300 z-10">
				<div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
					<Camera className="h-5 w-5" />
				</div>
			</div>

			<div className="absolute top-[37.5%] left-[87.5%] -translate-x-1/2 -translate-y-1/2 animate-bounce delay-700 z-10">
				<div className="bg-rose-500 text-white p-2 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
					<Utensils className="h-5 w-5" />
				</div>
			</div>

			{/* Floating Trip Stat Card */}
			<div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur border border-border p-4 rounded-xl shadow-xl max-w-[200px]">
				<h4 className="text-xs font-semibold mb-3 flex items-center">
					<Users className="h-3 w-3 mr-1.5" /> Travelers: 4
				</h4>
				<div className="flex -space-x-3 overflow-hidden pl-1">
					<div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-background ring-1 ring-border" />
					<div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-background ring-1 ring-border" />
					<div className="h-8 w-8 rounded-full bg-gray-400 border-2 border-background ring-1 ring-border" />
					<div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-bold ring-1 ring-border">
						+1
					</div>
				</div>
			</div>
		</div>
	);
}
