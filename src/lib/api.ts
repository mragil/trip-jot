import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const isRefreshRequest = originalRequest.url === '/auth/refresh';

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!isRefreshRequest
		) {
			originalRequest._retry = true;
			try {
				await api.post('/auth/refresh');
				return api(originalRequest);
			} catch {
				window.location.href = '/login';
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);

export default api;
