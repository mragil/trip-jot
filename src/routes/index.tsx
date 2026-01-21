import { createFileRoute, Link } from '@tanstack/react-router';
import {
	ArrowRight,
	FileText,
	Map,
	Navigation,
	Users,
	Wallet,
	Zap,
} from 'lucide-react';
import { HeroImage } from '@/components/Landing/HeroImage';

export const Route = createFileRoute('/')({
	component: LandingPage,
});

function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-primary/20">
			{/* Hero Section */}
			<section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
				<div className="container relative mx-auto px-4 text-center z-10">
					<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
						<span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
						Now available in beta
					</div>
					<h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl text-pretty">
						Plan Less, <br className="hidden md:block" />
						<span className="text-primary relative inline-block">
							Wander More.
							<svg
								className="absolute -bottom-2 left-0 w-full h-3 text-primary/30 -z-10"
								viewBox="0 0 100 10"
								preserveAspectRatio="none"
							>
								<path
									d="M0 5 Q 50 10 100 5"
									stroke="currentColor"
									strokeWidth="8"
									fill="none"
								/>
							</svg>
						</span>
					</h1>
					<p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground md:text-2xl text-pretty leading-relaxed">
						Turn chaotic travel notes into effortless, visual itineraries. Access
						everything offline and focus on the journey, not the logistics.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link
							to="/login"
							className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
						>
							Start Planning Free
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
						<a
							href="#how-it-works"
							className="inline-flex h-14 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							See How It Works
						</a>
					</div>
				</div>
				
				{/* Abstract Background Elements */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
				<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
			</section>

			{/* Problem/Solution Section */}
			<section className="py-24 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-16 items-center">
						<div className="order-2 md:order-1 relative">
							<HeroImage />
							{/* Floating Element */}
							<div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
								<div className="flex items-center gap-4 mb-3">
									<div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
										<Zap className="h-5 w-5" />
									</div>
									<div>
										<p className="font-semibold text-sm">Route Optimized</p>
										<p className="text-xs text-muted-foreground">Saved 2.5 hours</p>
									</div>
								</div>
							</div>
						</div>
						<div className="order-1 md:order-2">
							<h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
								Stop wrestling with spreadsheets.
							</h2>
							<div className="space-y-6 text-lg text-muted-foreground">
								<p>
									You know the feeling: five browser tabs open, a messy Google Doc, 
									and screenshots buried in your camera roll. Planning meant 
									stress before the trip even started.
								</p>
								<p>
									<strong className="text-foreground">WanderLog changes that.</strong> We bring your maps, 
									bookings, and schedules into one beautiful, offline-ready 
									timeline. So you can be present in the moment, not stuck in 
									your phone.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Grid */}
			<section id="features" className="py-24">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
							Everything you need to <span className="text-primary">travel smarter</span>
						</h2>
						<p className="text-xl text-muted-foreground">
							Powerful features that handle the details, so you can handle the adventure.
						</p>
					</div>
					
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<FeatureCard
							icon={<Map className="h-8 w-8 text-primary" />}
							title="Visual Route Planning"
							description="See your entire trip on an interactive map. Drag and drop to reorder stops and find the smartest route instantly."
						/>
						<FeatureCard
							icon={<FileText className="h-8 w-8 text-primary" />}
							title="Offline Document Vault"
							description="No service? No problem. Access your tickets, confirmations, and IDs without an internet connection."
						/>
						<FeatureCard
							icon={<Navigation className="h-8 w-8 text-primary" />}
							title="Navigate Like a Local"
							description="One-click export to Google Maps with all your stops pre-loaded. Never copy-paste an address again."
						/>
						<FeatureCard
							icon={<Zap className="h-8 w-8 text-primary" />}
							title="Smart Optimization"
							description="Our algorithms calculate travel times between stops so you don't overbook your day."
						/>
						<FeatureCard
							icon={<Wallet className="h-8 w-8 text-primary" />}
							title="Budget Control"
							description="Track expenses as you go. Categorize spending and stay on budget without the math anxiety."
						/>
						<FeatureCard
							icon={<Users className="h-8 w-8 text-primary" />}
							title="Collaborate Live"
							description="Invite friends to plan with you. See changes in real-time and build the perfect group itinerary."
						/>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section id="how-it-works" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
				<div className="container mx-auto px-4 relative z-10">
					<h2 className="text-3xl font-bold tracking-tight md:text-4xl text-center mb-16">
						From idea to departure in minutes
					</h2>
					<div className="grid md:grid-cols-3 gap-12">
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto backdrop-blur-sm border border-white/20">1</div>
							<h3 className="text-xl font-bold">Add Your Stops</h3>
							<p className="text-primary-foreground/80">Search and add places you want to visit. We'll automatically fetch photos and details.</p>
						</div>
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto backdrop-blur-sm border border-white/20">2</div>
							<h3 className="text-xl font-bold">Optimize Flow</h3>
							<p className="text-primary-foreground/80">Drag to reorder or let our smart optimizer arrange visits by location to save travel time.</p>
						</div>
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto backdrop-blur-sm border border-white/20">3</div>
							<h3 className="text-xl font-bold">Go Explore</h3>
							<p className="text-primary-foreground/80">Hit the road with offline maps and documents. Navigate with one tap.</p>
						</div>
					</div>
				</div>
				{/* Background patterning */}
				<div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
			</section>

			{/* Final CTA */}
			<section className="py-32 container mx-auto px-4 text-center">
				<div className="max-w-4xl mx-auto space-y-8">
					<h2 className="text-4xl font-bold tracking-tight md:text-6xl text-primary">
						Your next adventure is waiting.
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Join thousands of travelers who have ditched the spreadsheets for WanderLog.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
						<Link
							to="/login"
							className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground shadow-xl transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
						>
							Start Your Free Trip
						</Link>
					</div>
					<p className="text-sm text-muted-foreground">
						No credit card required • Free forever plan available
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-muted/30 py-12 border-t border-border mt-auto">
				<div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-2 font-bold text-xl">
						<div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">W</div>
						WanderLog
					</div>
					<div className="text-sm text-muted-foreground text-center md:text-right">
						<p>&copy; {new Date().getFullYear()} WanderLog. Built for explorers.</p>
						<div className="flex gap-6 justify-center md:justify-end mt-4">
							<a href="#" className="hover:text-foreground transition-colors">Privacy</a>
							<a href="#" className="hover:text-foreground transition-colors">Terms</a>
							<a href="#" className="hover:text-foreground transition-colors">Support</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
			<div className="mb-4 h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10">
				{icon}
			</div>
			<h3 className="mb-2 text-xl font-semibold text-card-foreground">
				{title}
			</h3>
			<p className="text-muted-foreground">{description}</p>
		</div>
	);
}
