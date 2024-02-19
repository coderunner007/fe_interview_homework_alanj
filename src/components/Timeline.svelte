<script context="module" lang="ts">
	export type TimelineDisplayConfig = {
		dateCellWidthOnGrid: number;
		dateRowHeight: number;
		sidebarWidth?: number;
		gridWidth?: number;
		displayedDates?: DateRange;
		onDragOver?: (event: DragEvent) => void;
		onDrop?: (event: DragEvent) => void;
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
	import Swimlanes from './Swimlanes.svelte';
	import { readonly, writable, type Writable } from 'svelte/store';

	export let displayConfig: TimelineDisplayConfig;

	const timelineDisplayConfig: Writable<TimelineDisplayConfig> = writable({
		...displayConfig,
		onDragOver,
		onDrop,
	});
	setContext(TIMELINE_DISPLAY_CONFIG, readonly(timelineDisplayConfig));

	$: $timelineDisplayConfig.displayedDates = $tasksStore?.dateRange;
	$: $timelineDisplayConfig.gridWidth =
		// Add 1 because both since & until dates
		// are included while displaying the grid
		($tasksStore ? getLengthOfDateRange($tasksStore?.dateRange) + 1 : 0) *
		$timelineDisplayConfig.dateCellWidthOnGrid;

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
					value![taskFromDrop.id] = {
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

					return value;
				});
			} catch (e) {
				console.log('Error doing parsing on drop', e);
			}
		}
	}
</script>

{#if $tasksStore?.tasks}
	<section
		style:margin-left="{displayConfig.sidebarWidth}px"
		class="timeline grid h-screen grid-rows-[60px_1fr] overflow-hidden overflow-x-auto">
		<div class="w-full border-b border-b-slate-300">
			<button
				class="absolute left-[60px]"
				on:click={() => populateTasksAndUpdateGrid(false)}
				>Previous 30 days</button>
			<button
				class="absolute right-0"
				on:click={() => populateTasksAndUpdateGrid(true)}>Next 30 days</button>
		</div>
		<div class="relative">
			<TimelineGrid />
			<Swimlanes
				tasks={$tasksStore?.tasks ? Object.values($tasksStore.tasks) : []} />
		</div>
	</section>
{/if}
