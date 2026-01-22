import { createFileRoute, redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { GalleryVerticalEnd } from 'lucide-react';
import { toast } from 'sonner';
import { LoginForm } from '@/components/login-form';
import { useLoginMutation } from '@/hooks/useAuth';
import { useUserStore } from '@/store/user';

export const Route = createFileRoute('/login')({
	beforeLoad: () => {
		if (useUserStore.getState().user) {
			throw redirect({
				to: '/trips',
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const loginMutation = useLoginMutation();

	const handleLogin = (data: { email: string; password?: string }) => {
		loginMutation.mutate(data, {
			onSuccess: () => {
				navigate({ to: '/trips' });
			},
			onError: (error) => {
				if (error instanceof AxiosError && error.response?.data?.message) {
					toast.error(error.response.data.message);
				} else {
					toast.error('Invalid email or password');
				}
			},
		});
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					WanderLog
				</a>
				<LoginForm onSubmit={handleLogin} isPending={loginMutation.isPending} />
			</div>
		</div>
	);
}
