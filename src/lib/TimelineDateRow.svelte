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
</script>

{#each displayedDates as date, idx (date.getTime())}
	<div
		class="absolute top-0 flex items-center justify-center"
		style:left={`${idx * GridDates.widthOfTimelineGridDateInPixels}px`}
		style:width={`${GridDates.widthOfTimelineGridDateInPixels}px`}
		style:height={`${dateRowHeight}px`}>
		{daysOfTheWeek[date.getDay()][0]}
		{date.getDate()}
	</div>
{/each}
