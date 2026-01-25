import type * as React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/useMediaQuery';
import ActivityForm from './ActivityForm';

type NewTripDrawerProps = {
	isFormOpen: boolean;
	setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
	tripId: number;
	date: Date;
};

export default function ActivityFormDrawer({
	isFormOpen: open,
	setIsFormOpen: setOpen,
	tripId,
	date,
}: NewTripDrawerProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-2xl max-h-[85vh] p-0 flex flex-col overflow-hidden gap-0">
					<ActivityForm
						tripId={tripId}
						date={date}
						onCancel={() => setOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent className="max-h-[90vh] flex flex-col">
				<ActivityForm
					tripId={tripId}
					date={date}
					onCancel={() => setOpen(false)}
				/>
			</DrawerContent>
		</Drawer>
	);
}
