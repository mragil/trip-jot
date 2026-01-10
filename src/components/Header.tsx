import { Link } from '@tanstack/react-router';
import { GalleryVerticalEnd } from 'lucide-react';

export default function Header() {
	return (
		<header className="p-4 flex items-center justify-between bg-white text-black shadow-lg">
			<div className="flex items-center gap-2">
				<Link to="/">
					<GalleryVerticalEnd className="size-4" />
				</Link>
			</div>

			<h1 className="text-xl font-semibold">Profile</h1>
		</header>
	);
}
