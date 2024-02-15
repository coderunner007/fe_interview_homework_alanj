<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { populateTasks, tasks } from './stores';
	import {
		getDateRangeForAPIRequest,
		generateDatesForDateRange,
		getDateRangeForInitialAPIRequest,
	} from './dates';
	import TimelineDateRow from './TimelineDateRow.svelte';

	const dateRowHeight: number = 40;
	let dateCellWidthOnGrid = 54;
	let dateRangeSize = 14;
	let displayedDates: Array<Date> = [];
	let gridWidth: number;
	$: {
		gridWidth = displayedDates.length * dateCellWidthOnGrid;
	}
	onMount(async function getTasksForInitialDateRange() {
		try {
			// TODO: Calculate this in a better way
			const initialGridWidth = window.innerWidth - 60;
			await populateTasks(
				getDateRangeForInitialAPIRequest(
					dateRangeSize,
					initialGridWidth,
					dateCellWidthOnGrid
				)
			);
		} catch (err) {
			console.log('Timeline', err);
		}
	});

	async function populateTasksAndUpdateGrid(isForward: boolean) {
		try {
			await populateTasks(
				getDateRangeForAPIRequest(dateRangeSize, $tasks?.dateRange, isForward)
			);
		} catch (err) {
			console.log('Timeline', err);
		}
	}

	let unsubscribe = tasks.subscribe(function updateDisplayedDates(value) {
		if (value) {
			displayedDates = generateDatesForDateRange(value.dateRange);
		}
	});

	onDestroy(function onTimelineComponentDestroyed() {
		unsubscribe();
	});
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
		<TimelineDateRow {displayedDates} {dateRowHeight} {dateCellWidthOnGrid} />
		<div
			class="timeline-grid h-full border-t border-slate-300"
			style:margin-top="{dateRowHeight}px"
			style:width="{gridWidth}px">
		</div>
		<!-- <TimelineEvents tasks={$tasks} /> -->
	</div>
</section>
