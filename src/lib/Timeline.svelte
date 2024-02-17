<script context="module" lang="ts">
	export type TimelineDisplayConfig = {
		dateCellWidthOnGrid: number;
		dateRowHeight: number;
		gridWidth: number;
		displayedDates?: DateRange;
	};
	export const CONFIG_CONTEXT_KEY = 'displayConfig';
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import {
		populateTasks,
		tasksStore,
		uncommitedTasks,
		type DateRange,
	} from './stores';
	import {
		getDateRangeForAPIRequest,
		getDateRangeForInitialAPIRequest,
		getDateAfterMove,
		getLengthOfDateRange,
	} from './dates';
	import TimelineDateRow from './TimelineDateRow.svelte';
	import Swimlanes from './Swimlanes.svelte';
	import { getWidthOfSingleDateCell } from './displayConfig';
	import {
		readonly,
		writable,
		type Readable,
		type Writable,
	} from 'svelte/store';

	const displayConfigWriteable: Writable<TimelineDisplayConfig> = writable({
		dateCellWidthOnGrid: 54,
		dateRowHeight: 40,
		gridWidth: 0,
	});
	let displayConfig: Readable<TimelineDisplayConfig> = readonly(
		displayConfigWriteable
	);
	setContext(CONFIG_CONTEXT_KEY, displayConfig);

	let dateRangeLengthForAPI = 14;
	$: $displayConfigWriteable.displayedDates = $tasksStore?.dateRange;
	$: $displayConfigWriteable.gridWidth =
		// Add 1 because both since & until dates
		// are included while displaying the grid
		($tasksStore ? getLengthOfDateRange($tasksStore?.dateRange) + 1 : 0) *
		$displayConfig.dateCellWidthOnGrid;

	onMount(async function getTasksForInitialDateRange() {
		try {
			// TODO: Calculate this in a better way
			const initialGridWidth = window.innerWidth - 60;
			await populateTasks(
				getDateRangeForInitialAPIRequest(
					dateRangeLengthForAPI,
					initialGridWidth,
					$displayConfig.dateCellWidthOnGrid
				)
			);
		} catch (err) {
			console.log('Timeline', err);
		}
	});

	async function populateTasksAndUpdateGrid(isForward: boolean) {
		try {
			await populateTasks(
				getDateRangeForAPIRequest(
					dateRangeLengthForAPI,
					$tasksStore?.dateRange,
					isForward
				)
			);
		} catch (err) {
			console.log('Timeline', err);
		}
	}

	function allowDrop(e: DragEvent) {
		e.preventDefault();
	}

	function onDrop(e: DragEvent) {
		if (e.dataTransfer) {
			const parsedTransferredObject = JSON.parse(
				e.dataTransfer.getData('text/plain'),
				(key, value) => {
					if (key == 'startDate' || key == 'endDate') {
						return new Date(value);
					}
					return value;
				}
			);

			const movedBy = e.pageX - parsedTransferredObject.startPosition.x;
			const taskFromDrop = parsedTransferredObject.task;

			uncommitedTasks.update((value) => {
				value![taskFromDrop.id] = {
					...taskFromDrop,
					startDate: getDateAfterMove(
						taskFromDrop.startDate,
						movedBy,
						getWidthOfSingleDateCell()
					),
					endDate: getDateAfterMove(
						taskFromDrop.endDate,
						movedBy,
						getWidthOfSingleDateCell()
					),
				};

				return value;
			});
			console.log(
				'onDrop',
				getDateAfterMove(
					parsedTransferredObject.task.startDate,
					movedBy,
					$displayConfig.dateCellWidthOnGrid
				)
			);
		}
	}
</script>

<section
	class="ml-14 grid h-screen grid-rows-[60px_1fr] overflow-hidden overflow-x-auto">
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
		{#if $displayConfigWriteable.displayedDates}
			<TimelineDateRow />
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:dragover={allowDrop}
				on:drop={onDrop}
				class="timeline-grid h-full border-t border-slate-300"
				style:margin-top="{$displayConfigWriteable.dateRowHeight}px"
				style:width="{$displayConfigWriteable.gridWidth}px">
			</div>
			<Swimlanes tasks={$tasksStore?.tasks || {}} />
		{:else}
			<div class="text-center">Loading</div>
		{/if}
	</div>
</section>
