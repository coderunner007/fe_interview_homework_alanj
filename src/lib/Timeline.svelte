<script lang="ts">
	import { onMount } from 'svelte';
	import { populateTasks, tasks } from './stores';
	import { GridDates, type DatesForAPIRequest } from './dates';
	import TimelineDateRow from './TimelineDateRow.svelte';
	import TimelineEvents from './TimelineEvents.svelte';

	let timelineGrid: HTMLElement;
	let timelineWidth = NaN;
	let gridDates: GridDates;
	let displayedDates: Array<Date> = [];
	const dateRowHeight: number = 40;
	onMount(function getTasksForInitialPeriod() {
		timelineWidth = timelineGrid.scrollWidth;
		gridDates = new GridDates(timelineWidth);

		populateTasksAndUpdate(gridDates.getDatesForAPIRequest());
	});

	async function populateTasksAndUpdate(
		datesForApiRequest: DatesForAPIRequest
	) {
		try {
			await populateTasks(datesForApiRequest.since, datesForApiRequest.until);

			displayedDates = gridDates.getDisplayedDatesOnAPIResponseSuccess();
			timelineWidth = gridDates.getOptimumDisplayedGridWidth();
		} catch (err) {
			console.log('Timeline', err);
		}
	}
</script>

<section
	class="ml-14 grid h-screen grid-rows-[60px_1fr] overflow-hidden overflow-x-auto">
	<div class="w-full border-b border-b-slate-300">
		<button
			class="absolute left-[60px]"
			on:click={() =>
				populateTasksAndUpdate(
					gridDates.getOneMonthEarlierDatesForAPIRequest()
				)}>Previous 30 days</button>
		<button
			class="absolute right-0"
			on:click={() =>
				populateTasksAndUpdate(gridDates.getOneMonthLaterDatesForAPIRequest())}
			>Next 30 days</button>
	</div>
	<div class="relative">
		<TimelineDateRow {displayedDates} {dateRowHeight} />
		<div
			class="timeline-grid h-full border-t border-slate-300"
			style:margin-top={`${dateRowHeight}px`}
			style:width={!isNaN(timelineWidth) ? `${timelineWidth}px` : ''}
			bind:this={timelineGrid}>
		</div>
		<TimelineEvents tasks={$tasks} />
	</div>
</section>
