import { useForm, ValidationError } from '@tanstack/react-form';
import { z } from 'zod';
import { Bed, Loader2, MapPin, MoreHorizontal, Train, Utensils } from 'lucide-react';
import { useId } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateActivity } from '@/hooks/useTrips';
import { setHours, setMinutes } from 'date-fns';


interface ActivityFormProps {
	tripId: number;
	date: Date;
	onCancel?: () => void;
}

const activityTypes = [
	{ value: 'attraction', label: 'Attraction', icon: MapPin },
	{ value: 'restaurant', label: 'Restaurant', icon: Utensils },
	{ value: 'accommodation', label: 'Accommodation', icon: Bed },
	{ value: 'transportation', label: 'Transportation', icon: Train },
	{ value: 'other', label: 'Other', icon: MoreHorizontal },
];

function FieldInfo({
	field,
}: {
	field: {
		state: {
			meta: {
				isTouched: boolean;
				errors: ValidationError[];
			};
		};
	};
}) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em className="text-destructive text-sm">
					{field.state.meta.errors
						.map((e) => {
							if (!e) return null;
							return typeof e === 'object' && e !== null && 'message' in e
								? (e as { message: string }).message
								: String(e);
						})
						.filter(Boolean)
						.join(', ')}
				</em>
			) : null}
		</>
	);
}

const formSchema = z.object({
	tripId: z.number(),
	name: z.string().min(1, 'Name is required'),
	location: z.string().min(1, 'Location is required'),
	type: z.enum(['attraction', 'restaurant', 'accommodation', 'transportation', 'other']),
	startTime: z.string().min(1, 'Start time is required'),
	endTime: z.string().min(1, 'End time is required'),
	cost: z.number().min(0, 'Cost must be positive'),
	currency: z.string().min(1, 'Currency is required'),
	notes: z.string(),
	isCompleted: z.boolean(),
});

export default function ActivityForm({
	tripId,
	date,
	onCancel,
}: ActivityFormProps) {
	const createActivity = useCreateActivity();
	const nameId = useId();
	const locationId = useId();
	const typeId = useId();
	const startTimeId = useId();
	const endTimeId = useId();
	const costId = useId();
	const currencyId = useId();
	const notesId = useId();

	const form = useForm({
		defaultValues: {
			tripId,
			name: '',
			location: '',
			type: 'attraction' as 'attraction' | 'restaurant' | 'accommodation' | 'transportation' | 'other',
			startTime: '',
			endTime: '',
			cost: 0,
			currency: 'IDR',
			notes: '',
			isCompleted: false,
		},

		validators: {
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			const [startTimeHour, startTimeMinute] = value.startTime.split(':');
			const [endTimeHour, endTimeMinute] = value.endTime.split(':');

			const fullDateStart = setHours(setMinutes(date, parseInt(startTimeMinute)), parseInt(startTimeHour));
			const fullDateEnd = setHours(setMinutes(date, parseInt(endTimeMinute)), parseInt(endTimeHour));

			console.log({ date, fullDateStart, fullDateEnd });

			await createActivity.mutateAsync({
				...value,
				startTime: fullDateStart.toISOString(),
				endTime: fullDateEnd.toISOString(),
			});
			onCancel?.();
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-6 p-4"
		>
			<h2 className="text-xl font-semibold">Add Activity</h2>

			<form.Field
				name="name"
				children={(field) => (
					<Field>
						<FieldContent>
							<FieldLabel htmlFor={nameId}>Name</FieldLabel>
							<Input
								id={nameId}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Activity name"
							/>
							<FieldInfo field={field} />
						</FieldContent>
					</Field>
				)}
			/>

			<form.Field
				name="location"
				children={(field) => (
					<Field>
						<FieldContent>
							<FieldLabel htmlFor={locationId}>Location</FieldLabel>
							<Input
								id={locationId}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Activity location"
							/>
							<FieldInfo field={field} />
						</FieldContent>
					</Field>
				)}
			/>

			<div className="grid grid-cols-2 gap-4">
				<form.Field
					name="type"
					children={(field) => (
						<Field>
							<FieldContent>
								<FieldLabel htmlFor={typeId}>Type</FieldLabel>
								<Select
									value={field.state.value}
									onValueChange={(value: any) => field.handleChange(value)}
								>
									<SelectTrigger id={typeId} className="w-full">
										<SelectValue>
											{(() => {
												const selectedType = activityTypes.find(
													(t) => t.value === field.state.value,
												);
												if (selectedType) {
													const Icon = selectedType.icon;
													return (
														<>
															<Icon className="size-4" />
															{selectedType.label}
														</>
													);
												}
												return null;
											})()}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{activityTypes.map((t) => {
											const Icon = t.icon;
											return (
												<SelectItem key={t.value} value={t.value}>
													<Icon className="size-4" />
													{t.label}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								<FieldInfo field={field} />
							</FieldContent>
						</Field>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<form.Field
					name="startTime"
					children={(field) => (
						<Field>
							<FieldContent>
								<FieldLabel htmlFor={startTimeId}>Start Time</FieldLabel>
								<Input
									id={startTimeId}
									type="time"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<FieldInfo field={field} />
							</FieldContent>
						</Field>
					)}
				/>
				<form.Field
					name="endTime"
					children={(field) => (
						<Field>
							<FieldContent>
								<FieldLabel htmlFor={endTimeId}>End Time</FieldLabel>
								<Input
									id={endTimeId}
									type="time"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<FieldInfo field={field} />
							</FieldContent>
						</Field>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<form.Field
					name="cost"
					children={(field) => (
						<Field>
							<FieldContent>
								<FieldLabel htmlFor={costId}>Cost</FieldLabel>
								<Input
									id={costId}
									type="number"
									min={0}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number(e.target.value))}
									placeholder="0"
								/>
								<FieldInfo field={field} />
							</FieldContent>
						</Field>
					)}
				/>
                <form.Field
					name="currency"
					children={(field) => (
						<Field>
							<FieldContent>
								<FieldLabel htmlFor={currencyId}>Currency</FieldLabel>
								<Input
									id={currencyId}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="JPY"
								/>
								<FieldInfo field={field} />
							</FieldContent>
						</Field>
					)}
				/>
			</div>

			<form.Field
				name="notes"
				children={(field) => (
					<Field>
						<FieldContent>
							<FieldLabel htmlFor={notesId}>Notes</FieldLabel>
							<Textarea
								id={notesId}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Additional notes"
								rows={3}
							/>
							<FieldInfo field={field} />
						</FieldContent>
					</Field>
				)}
			/>

			<div className="pt-4">
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button type="submit" disabled={!canSubmit || isSubmitting} className="w-full">
							{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Add Activity
						</Button>
					)}
				/>
			</div>
		</form>
	);
}
