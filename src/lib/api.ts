import type { IdToTask, TaskStatus } from './stores';

export type APITask = {
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
	id: number;
	// end_time: null;
	// task_type: 'user_created';
	// estimate_type: 'daily';
	name: string;
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
	// timeline_segment_id: null;
	color: number;
	// tracked: false;
	// plan_status_position: null;
	// has_notes: boolean;
	weight: number;
	// start_time: null;
	// updated_by: 7160699;
	// tracking: null;
};
export async function getTasks(
	since: Date,
	until: Date
): Promise<Array<APITask>> {
	const headers = new Headers();
	const detailsForAPIRequest = getDetailsForAPIRequest();

	// return mockResponse();
	if (
		!detailsForAPIRequest.teamId ||
		!detailsForAPIRequest.token ||
		!detailsForAPIRequest.workspaceId
	) {
		throw Error('Please set teamId, workspaceId & token in localStorage');
	}

	headers.append('Content-Type', 'application/json; charset=utf-8');
	headers.append('authorization', detailsForAPIRequest.token);

	try {
		const response = await fetch(
			`https://api.plan.toggl.space/api/v6-rc1/${detailsForAPIRequest.workspaceId}/tasks?since=${toAPIDateString(since)}&until=${toAPIDateString(until)}&short=true&team=${detailsForAPIRequest.teamId}`,
			{
				method: 'GET',
				headers,
			}
		);

		if (response.status == 401) {
			throw Error(
				'Unauthorized! Please reset authorization token in localStorage'
			);
		} else if (response.status > 299) {
			throw Error(
				`Request failed with status: ${response.status}${response.statusText ? ` & message: ${response.statusText}` : ''}`
			);
		} else {
			return response.json();
		}
	} catch (e) {
		throw Error(`API call failed: ${(e as Error).message}`);
	}
}

export function toAPIDateString(date: Date): string {
	return [
		date.getFullYear(),
		`${date.getMonth() + 1}`.padStart(2, '0'),
		`${date.getDate()}`.padStart(2, '0'),
	].join('-');
}

export function fromAPI(apiTasks: Array<APITask>): IdToTask {
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
				weight: apiTask.weight,
			},
		};
	}, {} as IdToTask);
}

type DetailsForAPIRequest = {
	token: string | null;
	teamId: string | null;
	workspaceId: string | null;
};

function getDetailsForAPIRequest(): DetailsForAPIRequest {
	return {
		token: localStorage.getItem('token'),
		teamId: localStorage.getItem('teamId'),
		workspaceId: localStorage.getItem('workspaceId'),
	};
}
