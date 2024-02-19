import { getMergedDateRange, taskDateRangeComparator } from './dates';
import type { DateRange, Task } from './stores';

export class TaskSorter {
	sortedTasksByDate: Array<Task>;
	cachedPositionOfTask: Map<number, number>;

	constructor(tasks: Array<Task>) {
		this.sortedTasksByDate = tasks.toSorted(taskDateRangeComparator);
		this.cachedPositionOfTask = new Map();
	}

	getSortPosition(task: Task, spaces = 2): number {
		if (this.cachedPositionOfTask.has(task.id)) {
			return this.cachedPositionOfTask.get(task.id) as number;
		}

		const directlyOverlappingTasksSortedByWeight =
			this.getDirectlyOverlappingTasks(task, this.sortedTasksByDate).toSorted(
				this.taskWeightComparator
			);

		// The sort position we get here is not complete
		// if the sort position is greater than 0.
		// This is because the directly overlapping tasks that have a lower sort
		// position might be at a higher sort position w.r.t
		// other tasks & this affects the current tasks sort position.
		const partialSortPositionOfTask =
			directlyOverlappingTasksSortedByWeight.findIndex((t) => t.id == task.id);

		// If sortPositionOfTask w.r.t tasks it directly overlaps is 0,
		// then return 0.
		// If it is anything other than 0, then recursively check the sort
		// position of all tasks which has sort position less that this task.
		const totalSort =
			partialSortPositionOfTask > 0
				? Math.max.apply(
						null,
						directlyOverlappingTasksSortedByWeight
							.slice(0, partialSortPositionOfTask)
							.map((t) => this.getSortPosition(t))
					) + 1
				: 0;
		console.log(
			task.weight,
			task.name,
			' '.padStart(spaces + 1),
			directlyOverlappingTasksSortedByWeight.map((t) => t.name),
			totalSort,
			partialSortPositionOfTask
		);
		// memoize calculated sort position
		this.cachedPositionOfTask.set(task.id, totalSort);

		return totalSort;
	}

	getDirectlyOverlappingTasks(task: Task, sortedTasksByDate: Array<Task>) {
		const idx = sortedTasksByDate.findIndex((t) => t.id == task.id);
		if (idx == -1) {
			return [];
		}

		const directlyOverlappingTasks = [task];
		for (let i = idx + 1; i < sortedTasksByDate.length; i++) {
			if (
				getMergedDateRange(
					this.getDateRangeOfTask(task),
					this.getDateRangeOfTask(sortedTasksByDate[i])
				)
			) {
				directlyOverlappingTasks.push(sortedTasksByDate[i]);
			} else {
				break;
			}
		}
		for (let i = idx - 1; i >= 0; i--) {
			if (
				getMergedDateRange(
					this.getDateRangeOfTask(task),
					this.getDateRangeOfTask(sortedTasksByDate[i])
				)
			) {
				directlyOverlappingTasks.push(sortedTasksByDate[i]);
			} else {
				break;
			}
		}

		return directlyOverlappingTasks;
	}

	getDateRangeOfTask(task: Task): DateRange {
		return {
			since: task.startDate,
			until: task.endDate,
		};
	}

	taskWeightComparator(task1: Task, task2: Task) {
		return task1.weight - task2.weight;
	}
}
