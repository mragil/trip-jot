export type ActivityType =
	| 'attraction'
	| 'restaurant'
	| 'accommodation'
	| 'transportation'
	| 'other';

export interface Activity {
	id: number;
	tripId: number;
	name: string;
	type: ActivityType;
	notes: string;
	location: string;
	startTime: string;
	endTime: string;
	cost: number;
	currency: string;
	isCompleted: boolean;
}

export interface Trip {
	name: string;
	id: number;
	createdAt: Date;
	updatedAt: Date;
	destination: string;
	startDate: Date;
	endDate: Date;
	isCompleted: boolean;
	userId: number;
	activities: Activity[];
}
