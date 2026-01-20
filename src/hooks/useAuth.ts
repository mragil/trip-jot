import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import api from '@/lib/api';

interface LoginCredentials {
	email: string;
	password?: string;
}

interface LoginResponse {
	user: {
		email: string;
		id: number;
		name: string;
	}
}

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (credentials: LoginCredentials) => {
			const response = await api.post<LoginResponse>(
				'/auth/login',
				credentials,
			);
			return response.data.user;
		},
	});
};

export const useLogoutMutation = () => {
	const navigate = useNavigate();
	
	return useMutation({
		mutationFn: async () => {
			await api.post('/auth/logout');
			
			navigate({ to: '/login' });
		},
	});
};
