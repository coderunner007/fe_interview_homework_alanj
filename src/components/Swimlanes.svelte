<script context="module" lang="ts">
	export type SwimlaneDisplayConfig = {
		taskMargin: number;
		taskHeight: number;
		tasksSorter: TaskSorter;
		swimlaneOffsetFromTop: number;
		swimlaneMarginTop: number;
	};
	export const SWIMLANE_DISPLAY_CONFIG = 'swimlaneDisplayConfig';
</script>

<script lang="ts">
	import { type Readable, readable } from 'svelte/store';
	import TaskOnGrid from './TaskOnGrid.svelte';
	import { type IdToTask, type Task } from '../lib/stores';
	import {
		TIMELINE_DISPLAY_CONFIG,
		type TimelineDisplayConfig,
	} from './Timeline.svelte';
	import { getContext, setContext } from 'svelte';
	import { TaskSorter } from '../lib/taskSorter';

	export let tasks: IdToTask;

	let tasksList: Array<Task>;
	$: tasksList = Object.values(tasks);

	let timelineDisplayConfig: Readable<TimelineDisplayConfig> = getContext(
		TIMELINE_DISPLAY_CONFIG
	);
	const swimlaneDisplayConfig: Readable<SwimlaneDisplayConfig> = readable({
		taskMargin: 2,
		taskHeight: 42,
		swimlaneOffsetFromTop: 20,
		swimlaneMarginTop: 20,
		tasksSorter: new TaskSorter(Object.values(tasks)),
	});
	setContext(SWIMLANE_DISPLAY_CONFIG, swimlaneDisplayConfig);

	let highestSortedPositionOfTasks = 1;

	function onSortPositionUpdate(newSortPosition: number) {
		highestSortedPositionOfTasks = Math.max(
			highestSortedPositionOfTasks,
			newSortPosition
		);
	}
</script>

<div>
	<div
		style:top="{$timelineDisplayConfig.dateRowHeight +
			$swimlaneDisplayConfig.swimlaneOffsetFromTop}px"
		style:height="{($swimlaneDisplayConfig.taskHeight +
			$swimlaneDisplayConfig.taskMargin * 2) *
			(highestSortedPositionOfTasks + 1) +
			$swimlaneDisplayConfig.swimlaneMarginTop * 2}px"
		class="pointer-events-none absolute right-0 min-h-10 w-full border-slate-400 bg-gray-200 opacity-40">
	</div>
	{#each tasksList as task (task.id)}
		<TaskOnGrid {task} updateSwimlaneHeight={onSortPositionUpdate} />
	{/each}
</div>
