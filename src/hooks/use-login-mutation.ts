import { useMutation } from '@tanstack/react-query';

import api from '@/lib/api';

interface LoginCredentials {
	email: string;
	password?: string;
}

interface LoginResponse {
	message: string;
}

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (credentials: LoginCredentials) => {
			const response = await api.post<LoginResponse>(
				'/auth/login',
				credentials,
			);
			return response.data;
		},
	});
};
