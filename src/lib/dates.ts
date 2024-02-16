export let widthOfTimelineGridDateInPixels = 54;
export function getNumberOfDatesToBeDisplayed(
	timelineGridWidth: number
): number {
	return Math.ceil(timelineGridWidth / 54);
}
