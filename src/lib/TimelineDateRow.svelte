<script lang="ts">
	import { daysOfTheWeek, monthsOfTheYear } from './dates';

	export let displayedDates: Array<Date>;
	export let dateRowHeight: number;
	export let dateCellWidthOnGrid: number;

	function getDisplayedDateCustomStyle(date: Date) {
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
			style:left="{idx * dateCellWidthOnGrid}px"
			class="absolute top-0 h-1 text-xs uppercase text-fuchsia-950">
			{monthsOfTheYear[date.getMonth()]}
		</div>
	{/if}
	<div
		class="absolute top-0 flex items-center justify-center text-sm {getDisplayedDateCustomStyle(
			date
		)}"
		style:left="{idx * dateCellWidthOnGrid}px"
		style:width="{dateCellWidthOnGrid}px"
		style:height="{dateRowHeight}px">
		{daysOfTheWeek[date.getDay()][0]}
		{date.getDate()}
	</div>
{/each}
