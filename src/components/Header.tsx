import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useLogoutMutation } from '@/hooks/useAuth';


export default function Header() {

	const logout = useLogoutMutation();

	return (
		<header className="p-6 flex items-center justify-between bg-white text-black shadow-lg">
			<div className="flex items-center gap-2">
				<Link to="/">
					<img src="/logo.png" alt="WanderLog" className="h-16 w-auto object-contain" />
				</Link>
			</div>

			<Button variant={'ghost'} className='text-md' onClick={() => logout.mutate()}	>Logout</Button>
		</header>
	);
}
