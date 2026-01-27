import type * as React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import api from '@/lib/api';
import { formatDateLong } from '@/lib/date-utils';
import { tripSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';

export default function TripForm({ className }: React.ComponentProps<'form'>) {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			name: '',
			destination: '',
			startDate: undefined as Date | undefined,
			endDate: undefined as Date | undefined,
		},
		validators: {
			onChange: tripSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await api.post('/trips', value);
				navigate({ to: '/trips' });
			} catch {
				toast.error('Failed to create trip');
			}
		},
	});

	return (
		<Card>
			<CardContent className="pt-6">
				<form
					className={cn('grid items-start gap-6', className)}
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<form.Field name="name">
						{(field) => (
							<div className="grid gap-3">
								<Label htmlFor={field.name}>Trip name</Label>
								<Input
									id={field.name}
									type="text"
									placeholder="e.g. Summer in Japan"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors ? (
									<p className="text-sm text-destructive">
										{field.state.meta.errors
											.map((e) => String(e?.message))
											.join(', ')}
									</p>
								) : null}
							</div>
						)}
					</form.Field>

					<form.Field name="destination">
						{(field) => (
							<div className="grid gap-3">
								<Label htmlFor={field.name}>Destination</Label>
								<Input
									id={field.name}
									type="text"
									placeholder="e.g. Tokyo, Japan"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors ? (
									<p className="text-sm text-destructive">
										{field.state.meta.errors
											.map((e) => String(e?.message))
											.join(', ')}
									</p>
								) : null}
							</div>
						)}
					</form.Field>

					<div className="grid grid-cols-2 gap-4">
						<form.Field name="startDate">
							{(field) => (
								<div className="grid gap-3">
									<Label>Start Date</Label>
									<Popover modal={true}>
										<PopoverTrigger
											className={cn(
												buttonVariants({ variant: 'outline' }),
												'w-full justify-start text-left font-normal',
												!field.state.value && 'text-muted-foreground',
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.state.value ? (
												formatDateLong(field.state.value)
											) : (
												<span>Pick a date</span>
											)}
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.state.value}
												onSelect={(newDate) => field.handleChange(newDate)}
												autoFocus
											/>
										</PopoverContent>
									</Popover>
									{field.state.meta.errors ? (
										<p className="text-sm text-destructive">
											{field.state.meta.errors
												.map((e) => String(e?.message))
												.join(', ')}
										</p>
									) : null}
								</div>
							)}
						</form.Field>

						<form.Field name="endDate">
							{(field) => (
								<div className="grid gap-3">
									<Label>End Date</Label>
									<Popover modal={true}>
										<PopoverTrigger
											className={cn(
												buttonVariants({ variant: 'outline' }),
												'w-full justify-start text-left font-normal',
												!field.state.value && 'text-muted-foreground',
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.state.value ? (
												formatDateLong(field.state.value)
											) : (
												<span>Pick a date</span>
											)}
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.state.value}
												onSelect={(newDate) => field.handleChange(newDate)}
												autoFocus
											/>
										</PopoverContent>
									</Popover>
									{field.state.meta.errors ? (
										<p className="text-sm text-destructive">
											{field.state.meta.errors
												.map((e) => String(e?.message))
												.join(', ')}
										</p>
									) : null}
								</div>
							)}
						</form.Field>
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<div className="flex flex-col gap-2">
								<Button type="submit" disabled={!canSubmit}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Create Trip
								</Button>
								<Button
									type="button"
									variant="outline"
									className="w-full"
									onClick={() => navigate({ to: '/trips' })}
									disabled={isSubmitting}
								>
									Cancel
								</Button>
							</div>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	);
}
