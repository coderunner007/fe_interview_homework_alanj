import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { fromAPI, getTasks } from './api';
import { getMergedDateRange } from './dates';

export enum TaskStatus {
	IN_PROGRESS = 'in_progress',
	TO_DO = 'to-do',
	BLOCKED = 'blocked',
	DONE = 'done',
	NO_STATUS = 'no_status',
}

export type Task = {
	id: number;
	name: string;
	endDate: Date;
	startDate: Date;
	status: TaskStatus;
	color: number;
	weight: number;
};

export type IdToTask = Record<string, Task>;

export type DateRange = {
	since: Date;
	until: Date;
};

export type AllTasks = {
	tasks: IdToTask;
	dateRange: DateRange;
};

const tasksFromAPIStore: Writable<AllTasks | undefined> = writable();
export const uncommitedTasks: Writable<IdToTask> = writable({});
export const tasksStore: Readable<AllTasks | undefined> = derived(
	[tasksFromAPIStore, uncommitedTasks],
	([$tasksFromAPIStore, $uncommitedTasks], set) => {
		if ($tasksFromAPIStore) {
			set({
				tasks: {
					...$tasksFromAPIStore.tasks,
					...$uncommitedTasks,
				},
				dateRange: $tasksFromAPIStore.dateRange,
			});
		}
	}
);

export async function populateTasks(dateRange: DateRange) {
	try {
		const tasksResponse = await getTasks(dateRange.since, dateRange.until);

		tasksFromAPIStore.update(function populateStoreAfterResponse(
			currentTasksFromAPI: AllTasks | undefined
		) {
			const updatedDateRange = getMergedDateRange(
				dateRange,
				currentTasksFromAPI?.dateRange,
				true
			);

			if (!updatedDateRange) {
				throw Error('API returned non-contiguous date ranges');
			}

			return {
				tasks: {
					...(currentTasksFromAPI?.tasks || {}),
					...fromAPI(tasksResponse),
				},
				dateRange: updatedDateRange,
			};
		});
	} catch (e) {
		throw e;
	}
}
