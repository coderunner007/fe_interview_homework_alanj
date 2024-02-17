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

	export let tasks: IdToTask;

	let displayConfig: Readable<TimelineDisplayConfig> =
		getContext(CONFIG_CONTEXT_KEY);
	let tasksList: Array<Task>;
	$: tasksList = Object.values(tasks);

	// TODO: There is off by one error
	function getTaskLeftPosition(task: Task) {
		console.log(
			task.name,
			($displayConfig.displayedDates as DateRange).since,
			task.startDate,
			dateDifference(
				// displayedDates will be present, otherwise swimlanes
				// wouldnt have rendered
				($displayConfig.displayedDates as DateRange).since,
				task.startDate
			)
		);
		return (
			dateDifference(
				// displayedDates will be present, otherwise swimlanes
				// wouldnt have rendered
				($displayConfig.displayedDates as DateRange).since,
				task.startDate
			) * $displayConfig.dateCellWidthOnGrid
		);
	}

	function getTaskTopPosition() {
		return $displayConfig.dateRowHeight;
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
			return totalWidthOfTask;
		}
	}
</script>

<div>
	<div
		style:top="{$displayConfig.dateRowHeight}px"
		class="absolute right-0 mt-5 min-h-10 w-full border-slate-400 bg-gray-200 opacity-40">
	</div>
	{#each tasksList as task (task.id)}
		<TaskOnGrid
			{task}
			{getTaskLeftPosition}
			{getTaskTopPosition}
			{getTaskWidth} />
	{/each}
</div>
