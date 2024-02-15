import { writable, type Writable } from 'svelte/store';
import { getTasks, type APITask } from './api';
import { mergeDateRanges } from './dates';

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
};

type IdToTask = Record<string, Task>;

export type DateRange = {
	since: Date;
	until: Date;
};

export type TasksFromAPI = {
	dateRange: DateRange;
};

export const tasks: Writable<TasksFromAPI | undefined> = writable();

export async function populateTasks(dateRange: DateRange) {
	try {
		const tasksResponse = await getTasks(dateRange.since, dateRange.until);

		tasks.update(function populateStoreAfterResponse(
			currentTasksFromAPI: TasksFromAPI | undefined
		) {
			return {
				...(currentTasksFromAPI || {}),
				...fromAPI(tasksResponse),
				dateRange: mergeDateRanges(
					dateRange,
					currentTasksFromAPI?.dateRange
				) as DateRange,
			};
		});
	} catch (e) {
		throw e;
	}
}

function fromAPI(apiTasks: Array<APITask>): IdToTask {
	return apiTasks.reduce(function updateStoreAfterAPIResponse(
		storeUpdate: IdToTask,
		apiTask: APITask
	) {
		return {
			...storeUpdate,
			[apiTask.id]: {
				id: apiTask.id,
				name: apiTask.name,
				startDate: new Date(apiTask.start_date),
				endDate: new Date(apiTask.end_date),
				status: apiTask.status as TaskStatus,
				color: apiTask.color,
			},
		};
	}, {} as IdToTask);
}
