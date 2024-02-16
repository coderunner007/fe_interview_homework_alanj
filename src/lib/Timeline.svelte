<script lang="ts">
	import { onMount } from 'svelte';
	import TimelineNavigator from './TimelineNavigator.svelte';
	import { getDateAfterNumberOfDays } from './utils';
	import { populateTasks } from './stores';

	onMount(function getTasksForInitialPeriod() {
		populateTasks(
			getDateAfterNumberOfDays(new Date(Date.now()), -7),
			getDateAfterNumberOfDays(new Date(Date.now()), 7)
		);
	});
</script>

<style>
	.timeline-grid {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXoAAAAYCAYAAAD06zZ1AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAF5SURBVHhe7dgxDoJQEEBBaI2tJt7/cCbaGlqNHsBQ8jZjTfHJLMuT9XF/vq+3y7oM+7mvFiivntfpfGodesdpt9e2TLyv1QO2Q/9Al/A6EMaOo0z2mrgQLfodQ32kSyY/YP6BHWnS/p9l8hxa9J05VPQdq99JJy8OL7DOMH7n0KLveFn0HSuLPmY1/cVs0XcG0qLvWFn0MSuLvgfmG33MzCeOFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoe2NSi/wBnAoS/JFJzhwAAAABJRU5ErkJggg==');
	}
</style>

<section
	class="ml-14 grid h-screen grid-rows-[60px_1fr] overflow-hidden overflow-x-auto">
	<TimelineNavigator />
	<div class="timeline-grid h-full w-[200vw]"></div>
</section>
