import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { RegisterCredentials } from '@/types/auth';

interface RegisterFormProps
	extends Omit<React.ComponentProps<'div'>, 'onSubmit'> {
	onSubmit?: (data: RegisterCredentials) => void;
	isPending?: boolean;
}

export function RegisterForm({
	className,
	onSubmit,
	isPending,
	...props
}: RegisterFormProps) {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		onSubmit?.({ email, password, name });
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create an account</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Name</FieldLabel>
								<Input id="name" name="name" placeholder="John Doe" required />
							</Field>
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
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input id="password" name="password" type="password" required />
							</Field>
							<Field>
								<Button type="submit" disabled={isPending}>
									{isPending ? 'Creating account...' : 'Sign Up'}
								</Button>
								<FieldDescription className="text-center">
									Already have an account? <a href="/login">Login</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="/">Terms of Service</a>{' '}
				and <a href="/">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
