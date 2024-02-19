<script context="module" lang="ts">
	export type TimelineDisplayConfig = {
		dateCellWidthOnGrid: number;
		dateRowHeight: number;
		sidebarWidth?: number;
		gridWidth?: number;
		displayedDates?: DateRange;
		onDragOver?: (event: DragEvent) => void;
		onDrop?: (event: DragEvent) => void;
		taskMargin: number;
		taskHeight: number;
		tasksSorter?: TaskSorter;
		swimlaneOffsetFromTop: number;
		swimlaneMarginTop: number;
	};
	export const TIMELINE_DISPLAY_CONFIG = 'timelineDisplayConfig';
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import {
		populateTasks,
		tasksStore,
		uncommitedTasks,
		type DateRange,
	} from '../lib/stores';
	import {
		getDateRangeForAPIRequest,
		getDateAfterMove,
		getLengthOfDateRange,
	} from '../lib/dates';
	import TimelineGrid from './TimelineGrid.svelte';
	import Swimlanes from './Swimlane.svelte';
	import { readonly, writable, type Writable } from 'svelte/store';
	import { TaskSorter } from '../lib/taskSorter';

	export let displayConfig: TimelineDisplayConfig;

	const timelineDisplayConfig: Writable<TimelineDisplayConfig> = writable({
		...displayConfig,
		onDragOver,
		onDrop,
	});
	setContext(TIMELINE_DISPLAY_CONFIG, readonly(timelineDisplayConfig));

	$: {
		$timelineDisplayConfig.displayedDates = $tasksStore?.dateRange;
		$timelineDisplayConfig.gridWidth =
			// Add 1 because both since & until dates
			// are included while displaying the grid
			($tasksStore ? getLengthOfDateRange($tasksStore?.dateRange) + 1 : 0) *
			$timelineDisplayConfig.dateCellWidthOnGrid;
		if ($tasksStore?.tasks) {
			console.log('task store updated');
			$timelineDisplayConfig.tasksSorter = new TaskSorter(
				Object.values($tasksStore.tasks)
			);
		}
	}

	async function populateTasksAndUpdateGrid(isForward: boolean) {
		try {
			await populateTasks(
				getDateRangeForAPIRequest(30, $tasksStore?.dateRange, isForward)
			);
		} catch (err) {
			console.log('Timeline', err);
		}
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function onDrop(event: DragEvent) {
		if (event.dataTransfer) {
			try {
				const parsedTransferredObject = JSON.parse(
					event.dataTransfer.getData('text/plain'),
					(key, value) => {
						if (key == 'startDate' || key == 'endDate') {
							return new Date(value);
						}
						return value;
					}
				);

				const movedByX = event.pageX - parsedTransferredObject.startPosition.x;
				const taskFromDrop = parsedTransferredObject.task;

				uncommitedTasks.update((value) => {
					const updatedTask = {
						...taskFromDrop,
						startDate: getDateAfterMove(
							taskFromDrop.startDate,
							movedByX,
							$timelineDisplayConfig.dateCellWidthOnGrid
						),
						endDate: getDateAfterMove(
							taskFromDrop.endDate,
							movedByX,
							$timelineDisplayConfig.dateCellWidthOnGrid
						),
					};
					console.log('before weight', updatedTask);
					const weight =
						$timelineDisplayConfig.tasksSorter?.getWeightIfSortedPosition(
							updatedTask,
							3
						);
					console.log('after weight', updatedTask, weight);
					value![taskFromDrop.id] = {
						...updatedTask,
						weight,
					};

					return value;
				});
			} catch (e) {
				console.log('Error doing parsing on drop', e);
			}

			console.log('on drop');
		}
	}
</script>

{#if $tasksStore?.tasks}
	<section
		style:margin-left="{displayConfig.sidebarWidth}px"
		class="timeline grid h-screen grid-rows-[60px_1fr] overflow-hidden overflow-x-auto">
		<div class="w-full border-b border-b-slate-300">
			<button
				class="absolute left-[60px] m-1 rounded-md bg-indigo-500 p-2 font-bold text-white"
				on:click={() => populateTasksAndUpdateGrid(false)}>Previous</button>
			<button
				class="absolute right-0 m-1 rounded-md bg-indigo-500 p-2 font-bold text-white"
				on:click={() => populateTasksAndUpdateGrid(true)}
				>Next
			</button>
		</div>
		<div class="relative">
			<TimelineGrid />
			<Swimlanes
				tasks={$tasksStore?.tasks ? Object.values($tasksStore.tasks) : []} />
		</div>
	</section>
{/if}
