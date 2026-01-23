import { redirect, createFileRoute } from '@tanstack/react-router';
import { useUserStore } from '@/store/user';

export const Route = createFileRoute('/profile')({
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
			title="Your Profile"
			message="Soon you'll be able to manage your account and preferences here."
		/>
	)
}
