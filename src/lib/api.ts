import type { TaskStatus } from './stores';

export async function getTasks(
	since: Date,
	until: Date
): Promise<Array<ApiTask>> {
	const headers = new Headers();
	const detailsForAPIRequest = getDetailsForAPIRequest();

	if (
		!detailsForAPIRequest.teamId ||
		!detailsForAPIRequest.token ||
		!detailsForAPIRequest.workspaceId
	) {
		throw Error(
			'teamId, workspaceId & auth token should be present in localStorage'
		);
	}

	headers.append('Content-Type', 'application/json; charset=utf-8');
	headers.append('authorization', detailsForAPIRequest.token);

	const response = await fetch(
		`https://api.plan.toggl.space/api/v6-rc1/${detailsForAPIRequest.workspaceId}/tasks?since=${getFormattedDateString(since)}&until=${getFormattedDateString(until)}&short=true&team=${detailsForAPIRequest.teamId}`,
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

function getDetailsForAPIRequest(): DetailsForAPIRequest {
	return {
		token: localStorage.getItem('token'),
		teamId: localStorage.getItem('teamId'),
		workspaceId: localStorage.getItem('workspaceId'),
	};
}

type DetailsForAPIRequest = {
	token: string | null;
	teamId: string | null;
	workspaceId: string | null;
};
export type ApiTask = {
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
	// weight: number;
	// start_time: null;
	// updated_by: 7160699;
	// tracking: null;
};
