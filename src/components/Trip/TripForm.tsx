import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function TripForm({ className }: React.ComponentProps<'form'>) {
	const [date, setDate] = React.useState<DateRange | undefined>();
	const [isOpen, setIsOpen] = React.useState(false);
	console.log({ date, isOpen });

	return (
		<Card>
			<CardContent className="pt-6">
				<form className={cn('grid items-start gap-6', className)}>
					<div className="grid gap-3">
						<Label>Trip name</Label>
						<Input type="text" placeholder="e.g. Summer in Japan" />
					</div>
					<div className="grid gap-3">
						<Label>Destination</Label>
						<Input type="text" placeholder="e.g. Tokyo, Japan" />
					</div>
					<div className="grid gap-3">
						<Label>Select start and end date</Label>
						<Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
							<PopoverTrigger>
								<Button
									variant="outline"
									className={cn(
										'w-full justify-start text-left font-normal',
										!date && 'text-muted-foreground',
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date?.from ? (
										date.to ? (
											<>
												{format(date.from, 'LLL dd, y')} -{' '}
												{format(date.to, 'LLL dd, y')}
											</>
										) : (
											format(date.from, 'LLL dd, y')
										)
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="range"
									selected={date}
									onSelect={(newDate) => {
										setDate(newDate);
										if (newDate?.from && newDate?.to) {
											setIsOpen(false);
										}
									}}
									numberOfMonths={1}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<Button type="submit">Create Trip</Button>
					<Link to="/trips">
						<Button variant="outline" className="w-full">
							Cancel
						</Button>
					</Link>
				</form>
			</CardContent>
		</Card>
	);
}
