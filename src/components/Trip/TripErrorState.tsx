import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

interface TripErrorStateProps {
	message?: string;
	onRetry?: () => void;
}

export default function TripErrorState({
	message = 'Something went wrong while loading your trips.',
	onRetry,
}: TripErrorStateProps) {
	return (
		<Card className="border-destructive/50 bg-destructive/5 w-full py-12">
			<div className="flex flex-col items-center gap-6 px-6 text-center">
				<div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
					<AlertTriangle className="text-destructive h-10 w-10" />
				</div>
				<div className="space-y-2">
					<CardTitle className="text-xl">Error Loading Trips</CardTitle>
					<CardDescription className="max-w-md">
						{message}
						<br />
						<span className="text-xs opacity-70">
							Check your connection or try again later.
						</span>
					</CardDescription>
				</div>
				{onRetry && (
					<Button onClick={onRetry} variant="outline" className="gap-2">
						<RefreshCw className="h-4 w-4" />
						Try Again
					</Button>
				)}
			</div>
		</Card>
	);
}
