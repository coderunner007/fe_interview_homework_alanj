<script lang="ts">
	import Timeline from './Timeline.svelte';
	import LinkSidebar from './LinkSidebar.svelte';
	import { onMount } from 'svelte';
	import { populateTasks, tasksStore } from '../lib/stores';
	import { getDateRangeForInitialAPIRequest } from '../lib/dates';

	const sidebarWidth = 60;
	const timelineDisplayConfig = {
		dateCellWidthOnGrid: 54,
		dateRowHeight: 40,
		sidebarWidth,
	};
	let applicationError: Error;

	onMount(async function getTasksForInitialDateRange() {
		try {
			const initialGridWidth = window.innerWidth - sidebarWidth;
			await populateTasks(
				getDateRangeForInitialAPIRequest(
					14,
					initialGridWidth,
					timelineDisplayConfig.dateCellWidthOnGrid
				)
			);
		} catch (e) {
			applicationError = e as Error;
		} finally {
			// Remove loading screen
			document.body.setAttribute('data-loaded', 'true');
		}
	});
</script>

{#if applicationError}
	<div class="flex h-screen items-center justify-center">
		<div class="text-xl text-red-400" aria-live="polite">
			{applicationError.message}
		</div>
	</div>
{:else if $tasksStore && $tasksStore?.tasks}
	<main class="h-screen font-sans">
		<LinkSidebar width={sidebarWidth} />
		<Timeline displayConfig={timelineDisplayConfig} />
	</main>
{/if}
