import { writable } from 'svelte/store';

enum TaskStatus {
	IN_PROGRESS = 'in_progress',
	TO_DO = 'to-do',
	BLOCKED = 'blocked',
	DONE = 'done',
	NO_STATUS = 'no_status',
}

export type Task = {
	// daily_estimated_minutes: null;
	// created_by: 7160699;
	// is_last_repetition: false;
	// color_id: 30;
	// updated_at: '2024-02-15T18:22:53.336949';
	// repetition_rule: null;
	// tag_ids: [];
	// visible_properties: ['estimate', 'notes'];
	// plan_id: null;
	// folder_id: null;
	// id: 20588609;
	// end_time: null;
	// task_type: 'user_created';
	// estimate_type: 'daily';
	// name: 'Alan';
	// original_repeated_task_id: null;
	// estimated_minutes: 0;
	// attachments: [];
	// workspace_members: [7160699];
	// created_at: '2024-02-15T18:19:18.314719';
	// parent_id: null;
	// total_checklist_items_count: 0;
	end_date: string;
	start_date: string;
	status: TaskStatus;
	// comments: [];
	// estimate_skips_weekend: true;
	done: boolean;
	// done_checklist_items_count: 0;
	timeline_segment_id: null;
	color: 30;
	tracked: false;
	// plan_status_position: null;
	// has_notes: boolean;
	// weight: number;
	// start_time: null;
	// updated_by: 7160699;
	// tracking: null;
};

export const tasks = writable([]);

async function getTasks(
	workspaceId: number,
	teamId: number,
	since: Date,
	until: Date
) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	headers.append(
		'authorization',
		'Bearer eyJhbGciOiJFZERTQSIsImtpZCI6IjIwMjMtMDctMjUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsicGxhbiJdLCJleHAiOjE3MDgwMzc3NzcsImlhdCI6MTcwODAzNDE3NywiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy50b2dnbC5zcGFjZSIsImp0aSI6ImMyZjYwMGZiZTFjZmFmMzM1MTYxNmM4ZTM0MjgzOWVhIiwibmJmIjoxNzA4MDMzODc3LCJzdWIiOiJESDg3UzJrU25KUFZtRXNqckxHMkNMIn0.WbLd6dhCl69WS2aN5DsBKkw0qcDSSvh1MLAvoIYa71FPVpfish_IHLqgdP9v_-tBuJLZMDEa0OM8LJG4wSPwDA'
	);

	const response = await fetch(
		`https://api.plan.toggl.space/api/v6-rc1/${workspaceId}/tasks?since=${getFormattedDateString(since)}&until=${getFormattedDateString(until)}&short=true&team=${teamId}`,
		{
			method: 'GET',
			headers,
		}
	);

	return response.json();
}

function getFormattedDateString(date: Date) {
	return [
		date.getFullYear(),
		`${date.getMonth() + 1}`.padStart(2, '0'),
		`${date.getDate()}`.padStart(2, '0'),
	].join('-');
}

function getDateAfterNumberOfDays(date: Date, noOfDays: number) {
	const newDate = new Date(date.getTime());
	newDate.setDate(newDate.getDate() + noOfDays);

	return newDate;
}

getTasks(
	733259,
	715990,
	getDateAfterNumberOfDays(new Date(Date.now()), -7),
	getDateAfterNumberOfDays(new Date(Date.now()), 7)
).then(function updateStoreAfterFetch(responseJson) {
	tasks.update((value) => {
		return [...value, ...responseJson];
	});
});
