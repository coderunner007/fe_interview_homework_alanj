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

const tasks = writable([]);

function getTasks() {}
