<script lang="ts">
	import { onMount } from 'svelte';
	import TimelineNavigator from './TimelineNavigator.svelte';
	import { getDateAfterNumberOfDays } from './utils';
	import { populateTasks, tasks } from './stores';
	import { getNumberOfDatesToBeDisplayed } from './dates';

	let timelineGrid: HTMLElement;
	let timelineWidth = NaN;
	onMount(function getTasksForInitialPeriod() {
		timelineWidth = timelineGrid.scrollWidth;
		console.log(getNumberOfDatesToBeDisplayed(timelineWidth));
		populateTasks(
			getDateAfterNumberOfDays(new Date(Date.now()), -7),
			getDateAfterNumberOfDays(new Date(Date.now()), 7)
		);
	});
</script>

<section
	class="relative ml-14 grid h-screen grid-rows-[60px_1fr] overflow-hidden overflow-x-auto">
	<div class="w-full border-b border-b-slate-300">Timeline Navigator</div>
	<TimelineNavigator>
		<svelte:fragment slot="events">
			{#each $tasks as task (task.id)}
				<div>{task.id}, {task.name}</div>
			{/each}
		</svelte:fragment>
		<svelte:fragment slot="dates">
			{#each $tasks as task (task.id)}
				<div>{task.id}, {task.name}</div>
			{/each}
		</svelte:fragment>
		<div
			slot="grid"
			class="timeline-grid h-full"
			style:width={!isNaN(timelineWidth) ? `${timelineWidth}px` : ''}
			bind:this={timelineGrid}>
		</div>
	</TimelineNavigator>
</section>
