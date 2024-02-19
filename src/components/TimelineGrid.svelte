<script lang="ts">
	import { getContext } from 'svelte';
	import {
		DAYS_OF_THE_WEEK,
		MONTHS_OF_THE_YEAR,
		generateDatesForDateRange,
	} from '../lib/dates';
	import type { Readable } from 'svelte/store';
	import {
		TIMELINE_DISPLAY_CONFIG,
		type TimelineDisplayConfig,
	} from './Timeline.svelte';

	let timelineDisplayConfig: Readable<TimelineDisplayConfig> = getContext(
		TIMELINE_DISPLAY_CONFIG
	);
	let displayedDates: Array<Date>;
	$: displayedDates = $timelineDisplayConfig.displayedDates
		? generateDatesForDateRange($timelineDisplayConfig.displayedDates)
		: [];

	function getDaySpecificCSS(date: Date) {
		if (date.getDay() == 0 || date.getDay() == 6) {
			// For weekends
			return 'text-slate-500 font-light';
		} else if (date.toDateString() == new Date().toDateString()) {
			// Today
			return 'text-orange-400 font-extrabold';
		} else {
			return 'font-extralight ';
		}
	}
</script>

<style lang="postcss">
	.timeline-grid {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXoAAAAYCAYAAAD06zZ1AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAF5SURBVHhe7dgxDoJQEEBBaI2tJt7/cCbaGlqNHsBQ8jZjTfHJLMuT9XF/vq+3y7oM+7mvFiivntfpfGodesdpt9e2TLyv1QO2Q/9Al/A6EMaOo0z2mrgQLfodQ32kSyY/YP6BHWnS/p9l8hxa9J05VPQdq99JJy8OL7DOMH7n0KLveFn0HSuLPmY1/cVs0XcG0qLvWFn0MSuLvgfmG33MzCeOFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoemKKPmSnEFhivnpei75gp+o6Voo9ZKfoe2NSi/wBnAoS/JFJzhwAAAABJRU5ErkJggg==');
	}
</style>

{#each displayedDates as date, idx (date.getTime())}
	{#if date.getDate() == 1 || !idx}
		<!-- Show month indicator on the first day of the month or the first date displayed-->
		<div
			style:left="{idx * $timelineDisplayConfig.dateCellWidthOnGrid}px"
			class="absolute top-0 h-1 text-xs uppercase text-fuchsia-950">
			{MONTHS_OF_THE_YEAR[date.getMonth()]}
		</div>
	{/if}
	<div
		class="absolute top-0 flex items-center justify-center text-sm {getDaySpecificCSS(
			date
		)}"
		style:left="{idx * $timelineDisplayConfig.dateCellWidthOnGrid}px"
		style:width="{$timelineDisplayConfig.dateCellWidthOnGrid}px"
		style:height="{$timelineDisplayConfig.dateRowHeight}px">
		{DAYS_OF_THE_WEEK[date.getDay()][0]}
		{date.getDate()}
	</div>
{/each}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:dragover={$timelineDisplayConfig.onDragOver}
	on:drop={$timelineDisplayConfig.onDrop}
	class="timeline-grid h-full border-t border-slate-300"
	style:margin-top="{$timelineDisplayConfig.dateRowHeight}px"
	style:width="{$timelineDisplayConfig.gridWidth}px">
</div>
