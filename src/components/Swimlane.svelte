<script lang="ts">
	import { type Readable } from 'svelte/store';
	import TaskOnGrid from './TaskOnGrid.svelte';
	import { type Task } from '../lib/stores';
	import {
		TIMELINE_DISPLAY_CONFIG,
		type TimelineDisplayConfig,
	} from './Timeline.svelte';
	import { getContext } from 'svelte';

	export let tasks: Array<Task>;

	let timelineDisplayConfig: Readable<TimelineDisplayConfig> = getContext(
		TIMELINE_DISPLAY_CONFIG
	);

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
			$timelineDisplayConfig.swimlaneOffsetFromTop}px"
		style:height="{($timelineDisplayConfig.taskHeight +
			$timelineDisplayConfig.taskMargin * 2) *
			(highestSortedPositionOfTasks + 1) +
			$timelineDisplayConfig.swimlaneMarginTop * 2}px"
		class="pointer-events-none absolute right-0 min-h-10 w-full border-slate-400 bg-gray-200 opacity-40">
	</div>
	{#each tasks as task (task.id)}
		<TaskOnGrid {task} updateSwimlaneHeight={onSortPositionUpdate} />
	{/each}
</div>
