import {
	getMergedDateRange,
	getNonInterlappingDateRanges,
	taskDateRangeComparator,
} from './dates';
import type { DateRange, IdToTask, Task } from './stores';

export class TaskSorter {
	tasksInDateRange: Map<DateRange, Array<Task>>;
	dateRangeOfTask: Map<number, DateRange>;
	sortedDateRanges: Array<DateRange>;
	sortedTasks: Array<Task>;
	idToTask: IdToTask;
	cachedPositionOfTask: Map<number, number>;

	constructor(tasks: Array<Task>) {
		this.sortedTasks = tasks.toSorted(taskDateRangeComparator);
		this.sortedDateRanges = getNonInterlappingDateRanges(this.sortedTasks);
		this.idToTask = {};
		tasks.forEach((task) => {
			this.idToTask[task.id] = task;
		});
		this.cachedPositionOfTask = new Map();
		this.tasksInDateRange = new Map();
		this.dateRangeOfTask = new Map();
		this.populateTaskInDateRange();
	}

	getWeightIfSortPosition(task: Task, sortPosition: number) {
		const taskId = task.id;
		// WRONG! Change to date range of all overlapping tasks
		this.sortedDateRanges.findIndex((dateRange) =>
			getMergedDateRange(
				{
					since: task.startDate,
					until: task.endDate,
				},
				dateRange
			)
		);
		const dateRangeOfTask = this.dateRangeOfTask.get(taskId);
		if (dateRangeOfTask) {
			const directlyOverlappingTasksSortedByWeight =
				this.getDirectlyOverlappingTasksSortedByWeight(task);
			if (directlyOverlappingTasksSortedByWeight.length - 1 < sortPosition) {
				// Don't modify task weight as it's sort position is anyways
				// below directly overlapping tasks
				return task.weight;
			}

			const nextSortedTaskWeight =
				directlyOverlappingTasksSortedByWeight[sortPosition].weight;
			const prevSortedTaskWeight =
				sortPosition - 1 > -1
					? directlyOverlappingTasksSortedByWeight[sortPosition - 1].weight
					: nextSortedTaskWeight - nextSortedTaskWeight / 2;

			return (prevSortedTaskWeight + nextSortedTaskWeight) / 2;
		}
	}

	getSortPosition(task: Task): number {
		if (this.cachedPositionOfTask.has(task.id)) {
			return this.cachedPositionOfTask.get(task.id) as number;
		}

		const directlyOverlappingTasksSortedByWeight =
			this.getDirectlyOverlappingTasksSortedByWeight(task);

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
		const totalSort = partialSortPositionOfTask
			? Math.max.apply(
					null,
					directlyOverlappingTasksSortedByWeight
						.slice(0, partialSortPositionOfTask)
						.map((t) => this.getSortPosition(t))
				) + 1
			: partialSortPositionOfTask;
		// memoize calculated sort position
		this.cachedPositionOfTask.set(task.id, totalSort);

		return totalSort;
	}

	getDirectlyOverlappingTasksSortedByWeight(
		task: Task,
		dateRangeOverride?: DateRange
	) {
		const dateRangeOfTask =
			dateRangeOverride || this.dateRangeOfTask.get(task.id);
		if (dateRangeOfTask) {
			return (
				(this.tasksInDateRange.get(dateRangeOfTask) || [])
					// Get all tasks in the task's date range that is directly
					// overlapping with this task.
					.filter((taskInOverlappingRange) =>
						getMergedDateRange(
							{
								since: task.startDate,
								until: task.endDate,
							},
							{
								since: taskInOverlappingRange.startDate,
								until: taskInOverlappingRange.endDate,
							}
						)
					)
					// Sort those tasks that overlap with this task's date
					// by weight
					.toSorted(this.taskWeightComparator)
			);
		} else {
			return [];
		}
	}

	taskWeightComparator(task1: Task, task2: Task) {
		return task1.weight - task2.weight;
	}

	populateTaskInDateRange() {
		let dateRangeIdx = 0;
		this.sortedTasks.forEach((task) => {
			let currentDateRange = this.sortedDateRanges[dateRangeIdx];
			if (
				getMergedDateRange(currentDateRange, {
					since: task.startDate,
					until: task.endDate,
				})
			) {
				// Task is present in current date range,
				this.tasksInDateRange.set(currentDateRange, [
					...(this.tasksInDateRange.get(currentDateRange) || []),
					task,
				]);
				this.dateRangeOfTask.set(task.id, currentDateRange);
			} else {
				// Task is not present in current date range,
				// Move to the next range
				currentDateRange = this.sortedDateRanges[++dateRangeIdx];
				this.dateRangeOfTask.set(task.id, currentDateRange);
				this.tasksInDateRange.set(currentDateRange, [task]);
			}
		});
	}
}
