import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/explore')({
	component: RouteComponent,
});

import Construction from '@/components/Construction';

export function RouteComponent() {
	return (
		<Construction
			title="Explore"
			message="We're building a way for you to discover amazing trips."
		/>
	);
}
