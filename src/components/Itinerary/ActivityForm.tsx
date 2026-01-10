import { Bed, MapPin, MoreHorizontal, Train, Utensils } from 'lucide-react';
import { useId, useState } from 'react';
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

interface ActivityFormProps {
	date?: string;
	onSubmit?: (data: ActivityFormData) => void;
	onCancel?: () => void;
}

export interface ActivityFormData {
	name: string;
	location: string;
	type: string;
	time: string;
	budget: string;
	notes: string;
}

const activityTypes = [
	{ value: 'attraction', label: 'Attraction', icon: MapPin },
	{ value: 'restaurant', label: 'Restaurant', icon: Utensils },
	{ value: 'accommodation', label: 'Accommodation', icon: Bed },
	{ value: 'transportation', label: 'Transportation', icon: Train },
	{ value: 'other', label: 'Other', icon: MoreHorizontal },
];

export default function ActivityForm({ date = 'Apr 1' }: ActivityFormProps) {
	const nameId = useId();
	const locationId = useId();
	const typeId = useId();
	const timeId = useId();
	const budgetId = useId();
	const notesId = useId();

	const [formData, setFormData] = useState<ActivityFormData>({
		name: '',
		location: '',
		type: 'attraction',
		time: '',
		budget: '',
		notes: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleChange = (field: keyof ActivityFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
			<h2 className="text-xl font-semibold">Add Activity to {date}</h2>
			<Field>
				<FieldContent>
					<FieldLabel htmlFor={nameId}>Name</FieldLabel>
					<Input
						id={nameId}
						value={formData.name}
						onChange={(e) => handleChange('name', e.target.value)}
						placeholder="Activity name"
					/>
				</FieldContent>
			</Field>

			<Field>
				<FieldContent>
					<FieldLabel htmlFor={locationId}>Location</FieldLabel>
					<Input
						id={locationId}
						value={formData.location}
						onChange={(e) => handleChange('location', e.target.value)}
						placeholder="Activity location"
					/>
				</FieldContent>
			</Field>

			<div className="grid grid-cols-2 gap-4">
				<Field>
					<FieldContent>
						<FieldLabel htmlFor={typeId}>Type</FieldLabel>
						<Select
							value={formData.type}
							onValueChange={(value) => value && handleChange('type', value)}
						>
							<SelectTrigger id={typeId} className="w-full">
								<SelectValue>
									{(() => {
										const selectedType = activityTypes.find(
											(type) => type.value === formData.type,
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
								{activityTypes.map((type) => {
									const Icon = type.icon;
									return (
										<SelectItem key={type.value} value={type.value}>
											<Icon className="size-4" />
											{type.label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					</FieldContent>
				</Field>

				<Field>
					<FieldContent>
						<FieldLabel htmlFor={timeId}>Time</FieldLabel>
						<div className="relative">
							<Input
								id={timeId}
								type="time"
								value={formData.time}
								onChange={(e) => handleChange('time', e.target.value)}
								placeholder="--:--"
								className="pr-10"
							/>
						</div>
					</FieldContent>
				</Field>
			</div>

			<Field>
				<FieldContent>
					<FieldLabel htmlFor={budgetId}>Budget Estimation (¥)</FieldLabel>
					<Input
						id={budgetId}
						type="text"
						value={formData.budget}
						onChange={(e) => handleChange('budget', e.target.value)}
						placeholder="e.g. 2000"
					/>
				</FieldContent>
			</Field>

			<Field>
				<FieldContent>
					<FieldLabel htmlFor={notesId}>Notes</FieldLabel>
					<Textarea
						id={notesId}
						value={formData.notes}
						onChange={(e) => handleChange('notes', e.target.value)}
						placeholder="Additional notes"
						rows={3}
					/>
				</FieldContent>
			</Field>
		</form>
	);
}
