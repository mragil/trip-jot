import { Link } from '@tanstack/react-router';
import { Compass, LogOut, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogoutMutation } from '@/hooks/useAuth';
import { useUserStore } from '@/store/user';

export default function Header() {
	const user = useUserStore((state) => state.user);
	const logoutMutation = useLogoutMutation();

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	const userInitials = user?.name
		? user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: 'U';

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container flex h-14 items-center justify-between">
				<div className="flex items-center gap-6">
					<Link
						to="/trips"
						className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity"
					>
						<div className="bg-primary/10 p-1.5 rounded-lg">
							<img
								src="/favicon.png"
								alt="Logo"
								className="h-5 w-5 object-contain"
							/>
						</div>
						<span className="bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
							TripJot
						</span>
					</Link>

					<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
						<Link
							to="/trips"
							className="transition-colors hover:text-primary text-foreground/80 [&.active]:text-primary"
						>
							Dashboard
						</Link>
						<Link
							to="/explore"
							className="transition-colors hover:text-primary text-foreground/80 [&.active]:text-primary"
						>
							Explore
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger
							className="relative h-9 w-9  cursor-pointer rounded-full ring-offset-background selection:focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center justify-center hover:opacity-90 transition-opacity"
							data-testid="user-menu-trigger"
						>
							<Avatar className="h-9 w-9 border">
								<AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
								<AvatarFallback className="bg-primary/10 text-primary font-medium">
									{userInitials}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end">
							<DropdownMenuGroup>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none truncate">
											{user?.name || 'User'}
										</p>
										<p className="text-xs leading-none text-muted-foreground truncate">
											{user?.email || 'user@example.com'}
										</p>
									</div>
								</DropdownMenuLabel>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link
									to="/profile"
									className="cursor-pointer w-full flex items-center"
								>
									<UserIcon className="mr-2 h-4 w-4" />
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="md:hidden">
								<Link
									to="/explore"
									className="cursor-pointer w-full flex items-center"
								>
									<Compass className="mr-2 h-4 w-4" />
									Explore
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer"
								onClick={handleLogout}
								disabled={logoutMutation.isPending}
								data-testid="logout-button"
							>
								<LogOut className="mr-2 h-4 w-4" />
								{logoutMutation.isPending ? 'Logging out...' : 'Log out'}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
