<script lang="ts">
	import { getDateAfterMove } from './dates';
	import {
		TASK_STATUS_TO_STATUS_EMOJI,
		getWidthOfSingleDateCell,
	} from './displayConfig';
	import { TaskStatus, type Task, type DateRange } from './stores';

	export let task: Task;
	export let getTaskLeftPosition: (task: Task) => number;
	export let getTaskTopPosition: (task: Task) => number;
	export let getTaskWidth: (task: Task) => number;

	const taskHeight = 42;
	let startPositionX: number | undefined;
	let movedByX: number | undefined;

	function onDragStart(e: DragEvent) {
		e.dataTransfer?.setData(
			'text/plain',
			JSON.stringify({
				task: {
					...task,
					startDate: task.startDate.getTime(),
					endDate: task.endDate.getTime(),
				},
				startPosition: {
					x: e.pageX,
					y: e.pageY,
				},
			})
		);
		e.dataTransfer!.effectAllowed = 'move';
		startPositionX = e.pageX;
		movedByX = 0;
	}

	function onDrag(e: DragEvent) {
		if (startPositionX !== undefined) {
			// For now, only track X
			movedByX = e.pageX - startPositionX;
		}
	}

	function onDragEnd(e: DragEvent) {
		movedByX = 0;
	}
</script>

{#if movedByX}
	<div
		class="absolute h-5 rounded-sm bg-indigo-400 opacity-20"
		style:width="{getTaskWidth(task)}px"
		style:top="{getTaskTopPosition({
			...task,
			startDate: getDateAfterMove(
				task.startDate,
				movedByX,
				getWidthOfSingleDateCell()
			),
			endDate: getDateAfterMove(
				task.endDate,
				movedByX,
				getWidthOfSingleDateCell()
			),
		})}px"
		style:left="{getTaskLeftPosition({
			...task,
			startDate: getDateAfterMove(
				task.startDate,
				movedByX,
				getWidthOfSingleDateCell()
			),
			endDate: getDateAfterMove(
				task.endDate,
				movedByX,
				getWidthOfSingleDateCell()
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
	class="absolute overflow-hidden rounded-sm bg-indigo-400 p-1"
	style:top="{getTaskTopPosition(task)}px"
	style:left="{getTaskLeftPosition(task)}px"
	style:height="{taskHeight}px"
	style:width="{getTaskWidth(task)}px">
	<span class="whitespace-nowrap">
		{#if task.status != TaskStatus.NO_STATUS}
			{TASK_STATUS_TO_STATUS_EMOJI[task.status]}
		{/if}
		{task.name}
	</span>
</div>
