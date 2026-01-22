import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useUserStore } from '@/store/user';

export const Route = createFileRoute('/trips')({
	beforeLoad: () => {
		const user = useUserStore.getState().user;
		if (!user) {
			throw redirect({
				to: '/login',
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
