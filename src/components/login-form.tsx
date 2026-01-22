import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { LoginCredentials } from '@/types/auth';

interface LoginFormProps extends Omit<React.ComponentProps<'div'>, 'onSubmit'> {
	onSubmit?: (data: LoginCredentials) => void;
	isPending?: boolean;
}

export function LoginForm({
	className,
	onSubmit,
	isPending,
	...props
}: LoginFormProps) {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		onSubmit?.({ email, password });
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="mail@example.com"
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<a
										href="#"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input id="password" name="password" type="password" required />
							</Field>
							<Field>
								<Button type="submit" disabled={isPending}>
									{isPending ? 'Logging in...' : 'Login'}
								</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account? <a href="/register">Sign up</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
