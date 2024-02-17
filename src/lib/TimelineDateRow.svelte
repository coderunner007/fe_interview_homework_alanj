<script lang="ts">
	import { getContext } from 'svelte';
	import {
		DAYS_OF_THE_WEEK,
		MONTHS_OF_THE_YEAR,
		generateDatesForDateRange,
	} from './dates';
	import type { Readable } from 'svelte/store';
	import {
		CONFIG_CONTEXT_KEY,
		type TimelineDisplayConfig,
	} from './Timeline.svelte';

	let displayConfig: Readable<TimelineDisplayConfig> =
		getContext(CONFIG_CONTEXT_KEY);
	let displayedDates: Array<Date>;
	$: displayedDates = $displayConfig.displayedDates
		? generateDatesForDateRange($displayConfig.displayedDates)
		: [];

	function getDaySpecificCSS(date: Date) {
		// For weekends
		if (date.getDay() == 0 || date.getDay() == 6) {
			return 'text-slate-500';
		} else {
			return '';
		}
	}
</script>

{#each displayedDates as date, idx (date.getTime())}
	{#if date.getDate() == 1 || !idx}
		<!-- Show month indicator on the first day of the month or the first date displayed-->
		<div
			style:left="{idx * $displayConfig.dateCellWidthOnGrid}px"
			class="absolute top-0 h-1 text-xs uppercase text-fuchsia-950">
			{MONTHS_OF_THE_YEAR[date.getMonth()]}
		</div>
	{/if}
	<div
		class="absolute top-0 flex items-center justify-center text-sm {getDaySpecificCSS(
			date
		)}"
		style:left="{idx * $displayConfig.dateCellWidthOnGrid}px"
		style:width="{$displayConfig.dateCellWidthOnGrid}px"
		style:height="{$displayConfig.dateRowHeight}px">
		{DAYS_OF_THE_WEEK[date.getDay()][0]}
		{date.getDate()}
	</div>
{/each}
