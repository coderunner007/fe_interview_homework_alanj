<script lang="ts">
	import { onMount } from 'svelte';
	import TimelineNavigator from './TimelineNavigator.svelte';
	import { populateTasks } from './stores';
	import { GridDates, type DatesForAPIRequest } from './dates';
	import TimelineDateRow from './TimelineDateRow.svelte';

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
			on:click={() =>
				populateTasksAndUpdate(
					gridDates.getOneMonthEarlierDatesForAPIRequest()
				)}>Previous 30 days</button>
		<button
			on:click={() =>
				populateTasksAndUpdate(gridDates.getOneMonthLaterDatesForAPIRequest())}
			>Next 30 days</button>
	</div>
	<TimelineNavigator>
		<!-- <svelte:fragment slot="events">
			{#each $tasks as task (task.id)}
				<div>{task.id}, {task.name}</div>
			{/each}
		</svelte:fragment> -->
		<svelte:fragment slot="dates">
			<TimelineDateRow {displayedDates} {dateRowHeight} />
		</svelte:fragment>
		<div
			slot="grid"
			class="timeline-grid h-full border-t border-slate-300"
			style:margin-top={`${dateRowHeight}px`}
			style:width={!isNaN(timelineWidth) ? `${timelineWidth}px` : ''}
			bind:this={timelineGrid}>
		</div>
	</TimelineNavigator>
</section>
