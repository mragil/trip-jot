export interface Activity {
	id: number;
	tripId: number;
	name: string;
	type: string;
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
