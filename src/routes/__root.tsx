import * as React from 'react';
import {
	createRootRouteWithContext,
	Outlet,
	useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import NotFound from '@/components/NotFound';
import { Toaster } from '@/components/ui/sonner';
import Header from '../components/Header';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

interface MyRouterContext {
	queryClient: QueryClient;
}

const _shouldShowHeader = (pathname: string) => {
	const paths = ['/login', '/register', '/'];
	return !paths.includes(pathname);
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	const [showDevtools, setShowDevtools] = React.useState(
		import.meta.env.VITE_SHOW_TANSTACK_DEVTOOLS !== 'false',
	);

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.altKey && e.key === 't') {
				setShowDevtools((prev) => !prev);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<>
			{_shouldShowHeader(useLocation().pathname) && <Header />}
			<Outlet />
			{showDevtools && (
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
			)}
			<Toaster position="top-center" />
		</>
	);
}
