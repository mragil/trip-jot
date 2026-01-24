import { type DBSchema, openDB } from 'idb';

interface WanderLogDB extends DBSchema {
	documents: {
		key: string;
		value: {
			id: string;
			userId: string;
			tripId: string;
			name: string;
			type: string;
			size: number;
			createdAt: number;
			blob: Blob;
		};
		indexes: { 'by-trip': string; 'by-user-trip': [string, string] };
	};
}

const DB_NAME = 'wanderlog-db';
const STORE_NAME = 'documents';

async function getDB() {
	return openDB<WanderLogDB>(DB_NAME, 2, {
		upgrade(db, oldVersion, _newVersion, tx) {
			if (oldVersion < 1) {
				const store = db.createObjectStore(STORE_NAME, {
					keyPath: 'id',
				});
				store.createIndex('by-trip', 'tripId');
			}

			if (oldVersion < 2) {
				const store = tx.objectStore(STORE_NAME);
				store.createIndex('by-user-trip', ['userId', 'tripId']);
			}
		},
	});
}

export async function addDocument(document: {
	tripId: string;
	userId: string;
	file: File;
}) {
	const db = await getDB();
	const id = crypto.randomUUID();
	const doc = {
		id,
		userId: document.userId,
		tripId: document.tripId,
		name: document.file.name,
		type: document.file.type,
		size: document.file.size,
		createdAt: Date.now(),
		blob: document.file,
	};
	await db.add(STORE_NAME, doc);
	return doc;
}

export async function getDocumentsByTripId(tripId: string, userId: string) {
	const db = await getDB();

	return db.getAllFromIndex(STORE_NAME, 'by-user-trip', [userId, tripId]);
}

export async function deleteDocument(id: string) {
	const db = await getDB();
	await db.delete(STORE_NAME, id);
}

export async function getDocument(id: string) {
	const db = await getDB();
	return db.get(STORE_NAME, id);
}
