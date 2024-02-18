<script lang="ts">
	import type { Readable } from 'svelte/store';
	import TaskOnGrid from './TaskOnGrid.svelte';
	import { dateDifference } from './dates';
	import { type DateRange, type IdToTask, type Task } from './stores';
	import {
		CONFIG_CONTEXT_KEY,
		type TimelineDisplayConfig,
	} from './Timeline.svelte';
	import { getContext } from 'svelte';
	import { TaskSorter } from './taskSorter';

	export let tasks: IdToTask;

	let displayConfig: Readable<TimelineDisplayConfig> =
		getContext(CONFIG_CONTEXT_KEY);
	let tasksList: Array<Task>;
	$: tasksList = Object.values(tasks);
	const tasksSorter: TaskSorter = new TaskSorter(Object.values(tasks));

	const taskMargin = 2;
	const swimlaneOffset = 20;
	const taskHeight = 42;
	const swimlaneMargin = 20;
	let highestSortedPositionOfTasks = 1;
	function getTaskLeftPosition(task: Task) {
		return (
			dateDifference(
				// displayedDates will be present, otherwise swimlanes
				// wouldnt have rendered
				($displayConfig.displayedDates as DateRange).since,
				task.startDate
			) *
				$displayConfig.dateCellWidthOnGrid +
			taskMargin
		);
	}

	function getTaskTopPosition(task: Task) {
		const sortedPosition = tasksSorter.getSortPosition(task.id) || 0;

		highestSortedPositionOfTasks = Math.max(
			highestSortedPositionOfTasks,
			sortedPosition
		);
		return (
			swimlaneOffset +
			swimlaneMargin +
			sortedPosition * (taskHeight + taskMargin * 2) +
			$displayConfig.dateRowHeight
		);
	}

	function getTaskWidth(task: Task) {
		const totalWidthOfTask =
			(dateDifference(task.startDate, task.endDate) + 1) *
			$displayConfig.dateCellWidthOnGrid;
		const taskLeftPosition = getTaskLeftPosition(task);

		// Cap task width to adjust for grid size, else task will extend beyond
		// rendered grid
		if (taskLeftPosition + totalWidthOfTask > $displayConfig.gridWidth) {
			return $displayConfig.gridWidth - taskLeftPosition;
		} else {
			// subtract left & right margins from width
			return totalWidthOfTask - taskMargin * 2;
		}
	}
</script>

<div>
	<div
		style:top="{$displayConfig.dateRowHeight + swimlaneOffset}px"
		style:height="{(taskHeight + taskMargin * 2) *
			(highestSortedPositionOfTasks + 1) +
			swimlaneMargin * 2}px"
		class="pointer-events-none absolute right-0 min-h-10 w-full border-slate-400 bg-gray-200 opacity-40">
	</div>
	{#each tasksList as task (task.id)}
		<TaskOnGrid
			{task}
			{taskHeight}
			{getTaskLeftPosition}
			{getTaskTopPosition}
			{getTaskWidth} />
	{/each}
</div>
