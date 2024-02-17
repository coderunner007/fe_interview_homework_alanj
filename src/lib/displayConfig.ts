import { TaskStatus } from './stores';

export const TASK_STATUS_TO_STATUS_EMOJI = {
	[TaskStatus.BLOCKED as string]: '🚫',
	[TaskStatus.DONE as string]: '✅',
	[TaskStatus.IN_PROGRESS as string]: '🚧',
	[TaskStatus.TO_DO as string]: '🗒️',
};

export function getWidthOfSingleDateCell() {
	return 54;
}
