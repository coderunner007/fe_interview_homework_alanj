import type { TaskStatus } from './stores';

async function mockResponse() {
	return Promise.resolve([
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: null,
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588623,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 0',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:01:05.514997',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-12',
			start_date: '2024-02-09',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 0.6119395546716062,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: null,
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588622,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 8',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:58.754602',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-11',
			start_date: '2024-02-11',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.0025521204436112,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T22:01:32.659889',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588621,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Testh',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:52.712636',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-11',
			start_date: '2024-02-11',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 0.005530213839718856,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T22:04:26.244451',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588620,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 7',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:48.620680',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-13',
			start_date: '2024-02-13',
			status: 'done',
			comments: [],
			estimate_skips_weekend: true,
			done: true,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.470458410309963,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T22:01:31.025280',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588619,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 6',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:44.832279',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-14',
			start_date: '2024-02-08',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 2.3283882023484477,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T22:01:37.367560',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588618,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 5',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:38.076360',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-17',
			start_date: '2024-02-10',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.8994233063292052,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: null,
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588617,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 3',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:20.359481',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-01-14',
			start_date: '2024-01-09',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.386344472252096,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: null,
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588616,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 2',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T22:00:12.164055',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-01-08',
			start_date: '2024-01-04',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.5078629797277436,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T19:37:15.786145',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588615,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'asdfasf',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T19:37:04.625103',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-02-18',
			start_date: '2024-02-18',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.404334811825127,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: null,
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588614,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'asdf;adlskf',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T18:31:56.413641',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2023-12-30',
			start_date: '2023-12-27',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.826655191569031,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T18:31:39.067454',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588613,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 3',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T18:22:47.554537',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-01-10',
			start_date: '2024-01-10',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.4797043386970363,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T18:23:01.195697',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588612,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test 2',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T18:22:43.883556',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2023-12-27',
			start_date: '2023-12-27',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 0.6168376158344084,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T20:05:56.764356',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588611,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Test',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T18:22:37.602528',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2024-01-02',
			start_date: '2023-12-30',
			status: 'done',
			comments: [7232],
			estimate_skips_weekend: true,
			done: true,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: true,
			weight: 1.3196559149521732,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T18:22:50.851060',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588610,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Hello',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T18:19:59.208584',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2023-12-27',
			start_date: '2023-12-27',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 1.024568193802425,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
		{
			daily_estimated_minutes: null,
			created_by: 7160699,
			is_last_repetition: false,
			color_id: 30,
			updated_at: '2024-02-15T20:46:33.923588',
			repetition_rule: null,
			tag_ids: [],
			visible_properties: ['estimate', 'notes'],
			plan_id: null,
			folder_id: null,
			id: 20588609,
			end_time: null,
			task_type: 'user_created',
			estimate_type: 'daily',
			name: 'Alan',
			original_repeated_task_id: null,
			estimated_minutes: 0,
			attachments: [],
			workspace_members: [7160699],
			created_at: '2024-02-15T18:19:18.314719',
			parent_id: null,
			total_checklist_items_count: 0,
			end_date: '2023-12-29',
			start_date: '2023-12-29',
			status: 'to-do',
			comments: [],
			estimate_skips_weekend: true,
			done: false,
			done_checklist_items_count: 0,
			timeline_segment_id: null,
			color: 30,
			tracked: false,
			plan_status_position: null,
			has_notes: false,
			weight: 0.9885583931638506,
			start_time: null,
			updated_by: 7160699,
			tracking: null,
		},
	]);
}

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
			`https://api.plan.toggl.space/api/v6-rc1/${detailsForAPIRequest.workspaceId}/tasks?since=${getFormattedDateString(since)}&until=${getFormattedDateString(until)}&short=true&team=${detailsForAPIRequest.teamId}`,
			{
				method: 'GET',
				headers,
			}
		);

		if (response.status > 299) {
			throw Error(
				`Request failed with status: ${response.status} & message: ${response.statusText}`
			);
		}
		return response.json();
	} catch (e) {
		throw Error(`API call failed: ${e.message}`);
	}
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
	// weight: number;
	// start_time: null;
	// updated_by: 7160699;
	// tracking: null;
};
