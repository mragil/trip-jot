import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useUserStore } from '@/store/user';

interface LoginCredentials {
	email: string;
	password?: string;
}

interface LoginResponse {
	user: {
		email: string;
		id: number;
		name: string;
	};
}

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (credentials: LoginCredentials) => {
			const response = await api.post<LoginResponse>(
				'/auth/login',
				credentials,
			);
			useUserStore.getState().setUser(response.data.user);
			return response.data.user;
		},
	});
};

export const useLogoutMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async () => {
			await api.post('/auth/logout');
			useUserStore.getState().logout();
			navigate({ to: '/login' });
		},
	});
};

interface RegisterCredentials {
	email: string;
	password?: string;
	name: string;
}

export const useRegisterMutation = () => {
	return useMutation({
		mutationFn: async (credentials: RegisterCredentials) => {
			const response = await api.post<LoginResponse>(
				'/auth/register',
				credentials,
			);
			useUserStore.getState().setUser(response.data.user);
			return response.data.user;
		},
	});
};
