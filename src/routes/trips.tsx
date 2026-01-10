import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/trips')({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
