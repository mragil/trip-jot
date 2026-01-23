import { redirect, createFileRoute } from '@tanstack/react-router';
import { useUserStore } from '@/store/user';

export const Route = createFileRoute('/explore')({
	beforeLoad: () => {
		if (!useUserStore.getState().user) {
			throw redirect({
				to: '/login',
			})
		}
	},
	component: RouteComponent,
});

import Construction from '@/components/Construction';

export function RouteComponent() {
	return (
		<Construction
			title="Explore"
			message="We're building a way for you to discover amazing trips."
		/>
	)
}
