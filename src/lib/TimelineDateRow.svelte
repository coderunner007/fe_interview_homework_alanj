<script lang="ts">
	import { GridDates } from './dates';

	export let displayedDates: Array<Date>;
	export let dateRowHeight: number;

	const daysOfTheWeek: Array<string> = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const monthsOfTheYear: Array<string> = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

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
	{#if date.getDate() == 1}
		<div
			style:left={`${idx * GridDates.widthOfTimelineGridDateInPixels}px`}
			class="absolute top-0 h-1 text-xs uppercase text-fuchsia-950">
			{monthsOfTheYear[date.getMonth()]}
		</div>
	{/if}
	<div
		class="absolute top-0 flex items-center justify-center text-sm {getDisplayedDateCustomStyle(
			date
		)}"
		style:left={`${idx * GridDates.widthOfTimelineGridDateInPixels}px`}
		style:width={`${GridDates.widthOfTimelineGridDateInPixels}px`}
		style:height={`${dateRowHeight}px`}>
		{daysOfTheWeek[date.getDay()][0]}
		{date.getDate()}
	</div>
{/each}
