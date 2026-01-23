import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
	component: RouteComponent,
});

import Construction from '@/components/Construction';

export function RouteComponent() {
	return (
		<Construction
			title="Your Profile"
			message="Soon you'll be able to manage your account and preferences here."
		/>
	);
}
