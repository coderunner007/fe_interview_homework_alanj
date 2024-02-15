import type { DateRange } from './stores';

export const daysOfTheWeek: Array<string> = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const monthsOfTheYear: Array<string> = [
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

export function getDateRangeForInitialAPIRequest(
	lengthOfDateRange: number,
	totalGridWidth?: number,
	dateCellWidthOnGrid?: number
) {
	const today = new Date();
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

export function mergeDateRanges(
	dateRange1?: DateRange,
	dateRange2?: DateRange
): DateRange | undefined {
	if (!dateRange1 || !dateRange1.since || !dateRange1.until) {
		return dateRange2;
	} else if (!dateRange2 || !dateRange2.since || !dateRange2.until) {
		return dateRange1;
	} else if (
		Math.abs(dateDifference(dateRange1.since, dateRange2.until)) <= 1
	) {
		return {
			since: dateRange2.since,
			until: dateRange1.until,
		};
	} else if (
		Math.abs(dateDifference(dateRange1.until, dateRange2.since)) <= 1
	) {
		return {
			since: dateRange1.since,
			until: dateRange2.until,
		};
	} else {
		throw Error('Date ranges cannot be merged');
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
// export function mergeDatesIntoSingleContiguousRange(
// 	dates1: Array<Date>,
// 	dates2: Array<Date>
// ): Array<Date> {
// 	if (!dates1.length) {
// 		return [...dates2];
// 	} else if (!dates2.length) {
// 		return [...dates1];
// 	} else if (areDatesEqual(dates1[0], dates2[dates2.length - 1])) {
// 		// Attach dates1 to end of dates2 & also remove duplicate date
// 		return [...dates2, ...dates1.toSpliced(1, 1)];
// 	} else if (areDatesEqual(dates1[dates1.length - 1], dates2[0])) {
// 		// Attach dates2 to end of dates1 & also remove duplicate date
// 		return [...dates1, ...dates2.toSpliced(1, 1)];
// 	} else if (
// 		Math.abs(dateDifference(dates1[dates1.length - 1], dates2[0])) == 1
// 	) {
// 		// Attach dates2 to end of dates1 without removing duplicate date
// 		return [...dates1, ...dates2];
// 	} else if (
// 		Math.abs(dateDifference(dates2[dates1.length - 1], dates1[0])) == 1
// 	) {
// 		// Attach dates1 to end of dates2 without removing duplicate date
// 		return [...dates2, ...dates1];
// 	} else {
// 		// Date ranges have a difference of more than 1 date which should
// 		// not happen ideally.
// 		throw Error('Date ranges cannot be merged');
// 	}
// }
