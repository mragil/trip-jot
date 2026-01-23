import { createRouter } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import NotFound from '@/components/NotFound';
import { routeTree } from './routeTree.gen';

export const getRouter = (queryClient: QueryClient) => {
	const router = createRouter({
		routeTree,
		context: {
			queryClient,
		},
		defaultNotFoundComponent: NotFound,

		defaultPreload: 'intent',
	});

	return router;
};
