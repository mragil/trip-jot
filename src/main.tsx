import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { getRouter } from './router';
import './styles.css';

const queryClient = new QueryClient();
const router = getRouter(queryClient);

const rootElement = document.getElementById('root');
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
