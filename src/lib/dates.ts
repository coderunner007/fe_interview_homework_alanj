import { toAPIDateString } from './api';
import type { DateRange, Task } from './stores';

// TODO: Add tests for copyDate, dateDifference
export const DAYS_OF_THE_WEEK: Array<string> = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const MONTHS_OF_THE_YEAR: Array<string> = [
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

export function getDateAfterMove(
	fromDate: Date,
	movedBy: number,
	dateCellWidthOnGrid: number
): Date {
	return getDateAfter(fromDate, Math.round(movedBy / dateCellWidthOnGrid));
}

export function taskDateRangeComparator(task1: Task, task2: Task) {
	const startDateDifference = dateDifference(task2.startDate, task1.startDate);

	// If start dates are the same return the largest task first
	return startDateDifference
		? startDateDifference
		: dateDifference(task2.endDate, task1.endDate);
}

// This will always return sorted list from earliest range to latest range
export function getNonInterlappingDateRanges(tasks: Array<Task>) {
	const sortedTasks = tasks.toSorted(taskDateRangeComparator);

	const dateRanges: Array<DateRange> = [];
	sortedTasks.forEach((task) => {
		const taskDateRange = {
			since: task.startDate,
			until: task.endDate,
		};
		if (!dateRanges.length) {
			dateRanges.push(taskDateRange);
			return;
		}

		const mergedDateRange = getMergedDateRange(
			dateRanges[dateRanges.length - 1],
			taskDateRange
		);
		if (mergedDateRange && dateRanges.length > 1) {
			// Check if the updated mergedDate range is intersecting with previous
			// date range
			const previousMergedDateRange = getMergedDateRange(
				dateRanges[dateRanges.length - 2],
				mergedDateRange
			);

			if (previousMergedDateRange) {
				// If yes, then pop previous date range and current date range
				// & replace with new large date range
				dateRanges.pop();
				dateRanges.pop();
				dateRanges.push(previousMergedDateRange);
			}
		}

		if (mergedDateRange) {
			// the merged date range will definitely be larger,
			// hence remove the previous date range & push the new one
			dateRanges.pop();
			dateRanges.push(mergedDateRange);
		} else {
			// The date ranges don't overlap, hence push the tasks date range
			dateRanges.push({
				since: task.startDate,
				until: task.endDate,
			});
		}
	});

	return dateRanges;
}

export function isTaskInDateRange(task: Task, dateRange: DateRange) {
	return !!getMergedDateRange(
		{
			since: task.startDate,
			until: task.endDate,
		},
		dateRange
	);
}

export function getDateRangeForInitialAPIRequest(
	lengthOfDateRange: number,
	totalGridWidth?: number,
	dateCellWidthOnGrid?: number
) {
	// Convert today's date to API format date string
	// & convert it back so that the same time is set
	// for all dates. This will ensure that further
	// operations (like date difference) work correctly.
	const today = new Date(toAPIDateString(new Date()));
	const lengthOfDateRangeAdjustedForGridWidth =
		getLengthOfDateRangeAdjustedForGridWidth(
			lengthOfDateRange,
			totalGridWidth,
			dateCellWidthOnGrid
		);

	return {
		since: adjustForMonday(
			getDateAfter(
				today,
				0 - Math.floor(lengthOfDateRangeAdjustedForGridWidth / 2)
			)
		),
		until: getDateAfter(
			today,
			Math.ceil(lengthOfDateRangeAdjustedForGridWidth / 2)
		),
	};
}

export function getDateRangeForAPIRequest(
	lengthOfDateRange: number,
	referenceDateRange?: DateRange,
	isForward?: boolean
): DateRange {
	if (
		!referenceDateRange ||
		!referenceDateRange.since ||
		!referenceDateRange.until
	) {
		// This means that the initial API call was not made
		return getDateRangeForInitialAPIRequest(lengthOfDateRange);
	}

	if (isInvalidDateRange(referenceDateRange)) {
		throw Error('Invalid date range');
	}

	if (isForward) {
		return {
			since: referenceDateRange.until,
			until: getDateAfter(referenceDateRange.until, lengthOfDateRange),
		};
	} else {
		return {
			since: adjustForMonday(
				getDateAfter(referenceDateRange.since, 0 - lengthOfDateRange)
			),
			until: referenceDateRange.since,
		};
	}
}

export function getMergedDateRange(
	dateRange1: DateRange,
	dateRange2?: DateRange,
	mergeAdjacentRanges?: boolean
): DateRange | undefined {
	if (!dateRange2) {
		return dateRange1;
	}
	if (
		dateDifference(dateRange1.since, dateRange1.until) < 0 ||
		dateDifference(dateRange2.since, dateRange2.until) < 0
	) {
		throw Error('Invalid date range');
	}

	const earliestSince =
		dateDifference(dateRange1.since, dateRange2.since) > 0
			? dateRange1.since
			: dateRange2.since;
	const latestUntil =
		dateDifference(dateRange1.until, dateRange2.until) > 0
			? dateRange2.until
			: dateRange1.until;
	const sinceDifference = Math.abs(
		dateDifference(dateRange1.since, dateRange2.since)
	);
	const untilDifference = Math.abs(
		dateDifference(dateRange1.until, dateRange2.until)
	);
	const totalDateRangeLength = dateDifference(earliestSince, latestUntil);

	if (
		totalDateRangeLength - (sinceDifference + untilDifference) >=
		(mergeAdjacentRanges ? -1 : 0)
	) {
		return {
			since: copyDate(earliestSince),
			until: copyDate(latestUntil),
		};
	} else {
		return;
	}
}

export function getLengthOfDateRange(dateRange: DateRange): number {
	if (isInvalidDateRange(dateRange)) {
		throw Error('Invalid date range');
	} else {
		return dateDifference(dateRange.since, dateRange.until);
	}
}

export function generateDatesForDateRange(dateRange: DateRange): Array<Date> {
	let currentDate = copyDate(dateRange.since);
	const generatedDates = [];
	// "since" is ahead of "until"
	if (isInvalidDateRange(dateRange)) {
		throw Error('Invalid date range');
	}
	while (!areDatesEqual(currentDate, dateRange.until)) {
		generatedDates.push(currentDate);
		currentDate = getDateAfter(currentDate, 1);
	}
	generatedDates.push(copyDate(dateRange.until));

	return generatedDates;
}

export function dateDifference(date1: Date, date2: Date) {
	// From https://stackoverflow.com/a/7763335
	// A very crude way of comparing only dates
	return Math.floor(
		(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
	);
}

export function copyDate(date: Date) {
	// https://stackoverflow.com/a/1090817
	const copiedDate = new Date(date.getTime());

	return copiedDate;
}

function getDateAfter(date: Date, dateDifference: number) {
	const dateAfterDifference = copyDate(date);
	dateAfterDifference.setDate(dateAfterDifference.getDate() + dateDifference);

	return dateAfterDifference;
}

function adjustForMonday(date: Date) {
	// Adjust the starting date for monday since the grid will be
	// misaligned if the the starting position is not monday
	date.setDate(date.getDate() + (1 - date.getDay()));

	return date;
}

function getLengthOfDateRangeAdjustedForGridWidth(
	minimumNumberOfDatesToBeDisplayed: number,
	totalGridWidth?: number,
	dateCellWidthOnGrid?: number
): number {
	const numberOfDatesToBeDisplayedAccordingToScreenSize = Math.ceil(
		// Set dateCellWidthOnGrid to 1 to avoid zero-division
		(totalGridWidth || 0) / (dateCellWidthOnGrid || 1)
	);

	return numberOfDatesToBeDisplayedAccordingToScreenSize <
		minimumNumberOfDatesToBeDisplayed
		? minimumNumberOfDatesToBeDisplayed
		: numberOfDatesToBeDisplayedAccordingToScreenSize;
}

function areDatesEqual(date1: Date, date2: Date): boolean {
	return date1.toDateString() == date2.toDateString();
}

function isInvalidDateRange(dateRange: DateRange): boolean {
	return dateDifference(dateRange.since, dateRange.until) < 0;
}
