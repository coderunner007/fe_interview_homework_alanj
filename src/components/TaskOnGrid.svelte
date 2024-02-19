<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { dateDifference, getDateAfterMove } from '../lib/dates';
	import { TaskStatus, type Task, type DateRange } from '../lib/stores';
	import {
		TIMELINE_DISPLAY_CONFIG,
		type TimelineDisplayConfig,
	} from './Timeline.svelte';
	import { getContext } from 'svelte';

	export let task: Task;
	export let updateSwimlaneHeight: (sortPositionOfTask: number) => void;

	let startPositionX: number | undefined;
	let movedByX: number | undefined;

	let timelineDisplayConfig: Readable<TimelineDisplayConfig> = getContext(
		TIMELINE_DISPLAY_CONFIG
	);
	const TASK_STATUS_TO_STATUS_EMOJI = {
		[TaskStatus.BLOCKED as string]: '🚫',
		[TaskStatus.DONE as string]: '✅',
		[TaskStatus.IN_PROGRESS as string]: '🚧',
		[TaskStatus.TO_DO as string]: '🗒️',
	};

	function getTaskLeftPosition(task: Task) {
		return (
			dateDifference(
				// displayedDates will be present, otherwise swimlanes
				// wouldnt have rendered
				($timelineDisplayConfig.displayedDates as DateRange).since,
				task.startDate
			) *
				$timelineDisplayConfig.dateCellWidthOnGrid +
			$timelineDisplayConfig.taskMargin
		);
	}

	function getTaskTopPosition(task: Task) {
		const sortedPosition =
			$timelineDisplayConfig?.tasksSorter?.getSortPosition(task) || 0;
		updateSwimlaneHeight(sortedPosition);

		return (
			$timelineDisplayConfig.swimlaneMarginTop +
			$timelineDisplayConfig.swimlaneOffsetFromTop +
			sortedPosition *
				($timelineDisplayConfig.taskHeight +
					$timelineDisplayConfig.taskMargin * 2) +
			$timelineDisplayConfig.dateRowHeight
		);
	}

	function getTaskWidth(task: Task) {
		const totalWidthOfTask =
			(dateDifference(task.startDate, task.endDate) + 1) *
			$timelineDisplayConfig.dateCellWidthOnGrid;
		const taskLeftPosition = getTaskLeftPosition(task);

		// Cap task width to adjust for grid size, else task will extend beyond
		// rendered grid
		if (
			taskLeftPosition + totalWidthOfTask >
			($timelineDisplayConfig.gridWidth || 0)
		) {
			return ($timelineDisplayConfig.gridWidth || 0) - taskLeftPosition;
		} else {
			// subtract left & right margins from width
			return totalWidthOfTask - $timelineDisplayConfig.taskMargin * 2;
		}
	}

	function onDragStart(event: DragEvent) {
		try {
			event.dataTransfer?.setData(
				'text/plain',
				JSON.stringify({
					task: {
						...task,
						startDate: task.startDate.getTime(),
						endDate: task.endDate.getTime(),
					},
					startPosition: {
						x: event.pageX,
						y: event.pageY,
					},
				})
			);
		} catch (e) {
			console.log('Error while stringifying drag object', e);
		}
		event.dataTransfer!.effectAllowed = 'move';
		startPositionX = event.pageX;
		movedByX = 0;
	}

	function onDrag(event: DragEvent) {
		if (startPositionX !== undefined) {
			// For now, only track X
			movedByX = event.pageX - startPositionX;
		}
	}

	function onDragEnd() {
		movedByX = 0;
	}
</script>

{#if movedByX}
	<div
		class="pointer-events-none absolute h-5 rounded-sm bg-indigo-400 opacity-20"
		style:width="{getTaskWidth(task)}px"
		style:height="{$timelineDisplayConfig.taskHeight}px"
		style:top="{getTaskTopPosition(task)}px"
		style:left="{getTaskLeftPosition({
			...task,
			id: -1,
			startDate: getDateAfterMove(
				task.startDate,
				movedByX,
				$timelineDisplayConfig.dateCellWidthOnGrid
			),
			endDate: getDateAfterMove(
				task.endDate,
				movedByX,
				$timelineDisplayConfig.dateCellWidthOnGrid
			),
		})}px">
	</div>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	draggable={true}
	on:drag={onDrag}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragover={$timelineDisplayConfig.onDragOver}
	on:drop={$timelineDisplayConfig.onDrop}
	class="absolute cursor-pointer overflow-hidden rounded-md bg-indigo-400 p-1 text-white {movedByX
		? 'opacity-50'
		: ''}"
	style:top="{getTaskTopPosition(task)}px"
	style:left="{getTaskLeftPosition(task)}px"
	style:height="{$timelineDisplayConfig.taskHeight}px"
	style:width="{getTaskWidth(task)}px">
	<span class="whitespace-nowrap">
		{#if task.status == TaskStatus.BLOCKED || task.status == TaskStatus.IN_PROGRESS}
			{TASK_STATUS_TO_STATUS_EMOJI[task.status]}
		{/if}
		{task.name}
	</span>
</div>
