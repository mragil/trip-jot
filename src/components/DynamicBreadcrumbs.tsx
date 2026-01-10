import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LabelMapper = (segment: string, path: string, index: number) => string;

interface DynamicBreadcrumbsProps {
	labelMapper?: LabelMapper;
}

export default function DynamicBreadcrumbs({
	labelMapper,
}: DynamicBreadcrumbsProps) {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;

	const segments = pathname.split('/').filter((segment) => segment !== '');

	if (segments.length === 0) {
		return null;
	}

	if (segments.length === 1) {
		return (
			<Link to="/trips">
				<Button variant="ghost" className="gap-2 p-0 h-auto font-normal">
					<ArrowLeft className="h-4 w-4" />
					Back to Dashboard
				</Button>
			</Link>
		);
	}

	const breadcrumbs = segments.map((segment, index) => {
		const path = `/${segments.slice(0, index + 1).join('/')}`;

		const defaultLabel = segment
			.replace(/[-_]/g, ' ')
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		const label = labelMapper
			? labelMapper(segment, path, index)
			: defaultLabel;

		return {
			label,
			path,
			isLast: index === segments.length - 1,
		};
	});

	return (
		<div className="flex items-center gap-2">
			{breadcrumbs.map((crumb, index) => {
				if (crumb.isLast) {
					return (
						<div key={crumb.path} className="flex items-center gap-2">
							<span className="text-gray-600">{crumb.label}</span>
						</div>
					);
				}

				return (
					<div key={crumb.path} className="flex items-center gap-2">
						{index === 0 && <ArrowLeft className="h-4 w-4" />}
						<Link to={crumb.path}>
							<Button variant="ghost" className="p-0 h-auto font-normal">
								{crumb.label}
							</Button>
						</Link>
						<ChevronRight className="h-4 w-4" />
					</div>
				);
			})}
		</div>
	);
}
