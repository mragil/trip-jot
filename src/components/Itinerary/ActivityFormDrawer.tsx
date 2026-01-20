import type * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
} from '@/components/ui/drawer';
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
		console.log('Rendering Dialog for desktop view');
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-2xl">
					<ActivityForm tripId={tripId} date={date} onCancel={() => setOpen(false)} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent className="max-h-[90vh]">
				<div className="overflow-y-auto px-4">
					<ActivityForm tripId={tripId} date={date} onCancel={() => setOpen(false)} />
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
