import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useUserStore } from '@/store/user';
import type {
	LoginCredentials,
	LoginResponse,
	RegisterCredentials,
} from '@/types/auth';

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

export const useRegisterMutation = () => {
	return useMutation({
		mutationFn: async (credentials: RegisterCredentials) => {
			console.log('useAuth: Calling register API', credentials);
			const response = await api.post<LoginResponse>(
				'/auth/register',
				credentials,
			);
			useUserStore.getState().setUser(response.data.user);
			return response.data.user;
		},
	});
};
