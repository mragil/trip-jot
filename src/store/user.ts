import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface UserState {
	user: User | null;
	setUser: (user: User) => void;
	logout: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			logout: () => set({ user: null }),
		}),
		{
			name: 'user-storage',
		},
	),
);
