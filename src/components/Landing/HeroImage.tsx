import {
	Calendar,
	Camera,
	Coffee,
	MapPin,
	Users,
	Utensils,
	Wallet,
} from 'lucide-react';

export function HeroImage() {
	return (
		<div className="relative mx-auto w-full max-w-4xl perspective-1000">
			{/* Main Container - The "App" */}
			<div className="relative z-10 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-transform duration-700 hover:rotate-x-2">
				{/* App Header Mockup */}
				<div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="flex gap-1.5">
							<div className="h-3 w-3 rounded-full bg-red-400" />
							<div className="h-3 w-3 rounded-full bg-yellow-400" />
							<div className="h-3 w-3 rounded-full bg-green-400" />
						</div>
					</div>
					<div className="flex items-center gap-2 rounded-md bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
						<Calendar className="mr-1 h-3 w-3" />
						Oct 12 - Oct 20
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 bg-background h-[400px]">
					{/* Left Panel: Itinerary Timeline */}
					<div className="col-span-1 border-r border-border p-4 overflow-hidden relative">
						<div className="absolute inset-x-0 top-0 h-8 bg-linear-to-b from-background to-transparent z-10" />
						<div className="space-y-6 pt-2">
							{/* Day Header */}
							<div className="flex items-center justify-between">
								<h3 className="font-semibold">Day 1: Kyoto</h3>
								<span className="text-xs text-muted-foreground">
									Mon, Oct 12
								</span>
							</div>

							{/* Timeline Items */}
							<div className="relative pl-4 border-l-2 border-muted space-y-6">
								<div className="relative hover:translate-x-1 transition-transform cursor-pointer group">
									<div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-primary border-2 border-background ring-4 ring-primary/10" />
									<div className="rounded-lg border border-border bg-card p-3 shadow-sm group-hover:shadow-md transition-shadow">
										<div className="flex justify-between items-start mb-1">
											<span className="text-xs font-mono text-muted-foreground">
												09:00 AM
											</span>
											<Coffee className="h-3 w-3 text-orange-500" />
										</div>
										<p className="font-medium text-sm">
											Arashiyama Bamboo Grove
										</p>
									</div>
								</div>

								<div className="relative hover:translate-x-1 transition-transform cursor-pointer group">
									<div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-primary border-2 border-background ring-4 ring-primary/10" />
									<div className="rounded-lg border border-border bg-card p-3 shadow-sm group-hover:shadow-md transition-shadow">
										<div className="flex justify-between items-start mb-1">
											<span className="text-xs font-mono text-muted-foreground">
												11:30 AM
											</span>
											<Camera className="h-3 w-3 text-blue-500" />
										</div>
										<p className="font-medium text-sm">Tenryu-ji Temple</p>
									</div>
								</div>

								<div className="relative hover:translate-x-1 transition-transform cursor-pointer group">
									<div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-primary border-2 border-background ring-4 ring-primary/10" />
									<div className="rounded-lg border border-border bg-card p-3 shadow-sm group-hover:shadow-md transition-shadow">
										<div className="flex justify-between items-start mb-1">
											<span className="text-xs font-mono text-muted-foreground">
												01:00 PM
											</span>
											<Utensils className="h-3 w-3 text-rose-500" />
										</div>
										<p className="font-medium text-sm">
											Lunch at Yudofu Sagano
										</p>
										<div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 p-1 rounded-sm w-fit">
											<Wallet className="h-3 w-3 mr-1" />
											¥3,500 budget
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Panel: Map Placeholder */}
					<div className="col-span-1 md:col-span-2 bg-muted/20 relative p-4 flex items-center justify-center overflow-hidden">
						{/* Abstract Map UI */}
						<div
							className="absolute inset-0 opacity-20"
							style={{
								backgroundImage:
									'radial-gradient(#cbd5e1 1px, transparent 1px)',
								backgroundSize: '20px 20px',
							}}
						></div>

						{/* Map Nodes connected by dashed lines */}
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none"
							aria-hidden="true"
						>
							<path
								d="M120 150 Q 200 100 280 180 T 400 140"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeDasharray="4 4"
								className="text-primary/40 animate-pulse"
							/>
						</svg>

						{/* Map Pins */}
						<div className="absolute top-[140px] left-[110px] animate-bounce delay-0">
							<div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-lg">
								<MapPin className="h-5 w-5" />
							</div>
							<div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-card text-card-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
								Arashiyama
							</div>
						</div>

						<div className="absolute top-[170px] left-[270px] animate-bounce delay-300">
							<div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg">
								<Camera className="h-5 w-5" />
							</div>
						</div>

						<div className="absolute top-[130px] left-[390px] animate-bounce delay-700">
							<div className="bg-rose-500 text-white p-2 rounded-lg shadow-lg">
								<Utensils className="h-5 w-5" />
							</div>
						</div>

						{/* Floating Trip Stat Card */}
						<div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur border border-border p-3 rounded-lg shadow-xl max-w-[180px]">
							<h4 className="text-xs font-semibold mb-2 flex items-center">
								<Users className="h-3 w-3 mr-1" /> Travelers: 4
							</h4>
							<div className="flex -space-x-2 overflow-hidden">
								<div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-background" />
								<div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-background" />
								<div className="h-6 w-6 rounded-full bg-gray-400 border-2 border-background" />
								<div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[8px] font-medium">
									+1
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Background Decorative Blobs */}
			<div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl -z-10 animate-pulse" />
			<div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl -z-10 animate-pulse delay-500" />
		</div>
	);
}
