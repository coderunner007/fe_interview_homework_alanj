import { writable, type Writable } from 'svelte/store';
import { getTasks, type ApiTask } from './api';

export enum TaskStatus {
	IN_PROGRESS = 'in_progress',
	TO_DO = 'to-do',
	BLOCKED = 'blocked',
	DONE = 'done',
	NO_STATUS = 'no_status',
}

export type Task = {
	id: number;
	assignee: string;
	endDate: Date;
	startDate: Date;
	status: TaskStatus;
	color: number;
};

export const tasks: Writable<Array<Task>> = writable([]);

export async function populateTasks(since: Date, until: Date) {
	const tasksFromApi = await getTasks(since, until);

	tasks.update(function populateStoreAfterResponse(currentTasksInStore) {
		return [...currentTasksInStore, ...tasksFromApi.map(fromApi)];
	});
}

function fromApi(apiTask: ApiTask): Task {
	return {
		id: apiTask.id,
		assignee: apiTask.name,
		startDate: new Date(apiTask.start_date),
		endDate: new Date(apiTask.end_date),
		status: apiTask.status,
		color: apiTask.color,
	};
}
