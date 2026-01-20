import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Map,
  Calendar,
  Search,
  Navigation,
  FileText,
  Wallet,
  Zap,
  Users,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center md:py-32">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl text-primary">
          WanderLog: Your Personal Travel Journal
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          A web app that helps travelers create day-by-day itineraries, visualize optimized routes on maps, and organize documents securely with full offline access.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/login"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Start Planning
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="User Accounts"
              description="Sign up easily. Manage your profile and travel preferences securely."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Trip Creation"
              description="Start new trips with multiple destinations and flexible dates."
            />
            <FeatureCard
              icon={<Search className="h-10 w-10 text-primary" />}
              title="Smart Destination Search"
              description="Autocomplete for locations. Add multiple places easily."
            />
            <FeatureCard
              icon={<Map className="h-10 w-10 text-primary" />}
              title="Time Scheduling"
              description="Drag-and-drop reordering for perfect flow and specific visit times."
            />
            <FeatureCard
              icon={<Navigation className="h-10 w-10 text-primary" />}
              title="One-Click Navigation"
              description="Generate Google Maps links with all destinations as waypoints."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Offline Document Vault"
              description="Access bookings and tickets instantly without uploading to servers."
            />
            <FeatureCard
              icon={<Wallet className="h-10 w-10 text-primary" />}
              title="Budget Tracking"
              description="Monitor costs by category with totals and helpful alerts."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Route Optimization"
              description="Automatic travel time calculations for efficient itineraries."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Collaboration Ready"
              description="Share trips with friends/family for real-time planning (MVP)."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Emergency Info"
              description="Built-in contacts for embassies and hospitals per destination."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl bg-primary/5 p-8 md:p-12 lg:p-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Why Choose Itinerary Planner?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
            Your trips, your documents, your data stored locally. Perfect for your trips. Focus on experiences, not logistics.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to plan your next adventure?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Sign up free and start your first trip today.
          </p>
          <Link
            to="/login"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Itinerary Planner. All rights reserved.
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
      <h3 className="mb-2 text-xl font-semibold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
