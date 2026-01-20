import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import Header from '../components/Header';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';
import { Toaster } from '@/components/ui/sonner';

interface MyRouterContext {
	queryClient: QueryClient;
}

const _shouldShowHeader = (pathname: string) => {
	const paths = ['/login', '/register', '/'];
	return !paths.includes(pathname);
};	

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'WanderLog',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{
				rel: 'icon',
				href: '/favicon.png',
				type: 'image/png',
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-warm-white">
				{_shouldShowHeader(useLocation().pathname) && <Header />}
				{children}
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
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}
