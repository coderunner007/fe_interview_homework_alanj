import { describe, expect, it, vi } from 'vitest';
import {
	DAYS_OF_THE_WEEK,
	copyDate,
	dateDifference,
	generateDatesForDateRange,
	getDateRangeForAPIRequest,
	getDateRangeForInitialAPIRequest,
	getMergedDateRange,
} from './dates';
import type { DateRange } from './stores';

describe('generateDatesForDateRange', () => {
	it('returns list of dates with length equal to (difference in range + 1) if range is valid', () => {
		const validDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 3, 7),
		};

		const generatedDates = generateDatesForDateRange(validDateRange);

		expect(generatedDates.length).toEqual(
			// Since both start & end are inclusive, add 1 extra
			Math.abs(dateDifference(validDateRange.since, validDateRange.until) + 1)
		);
	});

	it('returns list of dates from start date to end date (both inclusive) if the date range is valid', () => {
		const validDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 3, 7),
		};

		const generatedDates = generateDatesForDateRange(validDateRange);

		// Verify each date in range is present in list
		const currentDate = copyDate(validDateRange.since);
		generatedDates.forEach((date) => {
			expect(date.toDateString()).toEqual(currentDate.toDateString());
			currentDate.setDate(currentDate.getDate() + 1);
		});
		expect(generatedDates[generatedDates.length - 1].toDateString()).toEqual(
			validDateRange.until.toDateString()
		);
	});

	it('throws error if the date range is invalid', () => {
		// Invalid: Until is before since
		const invalidDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 1, 7),
		};

		expect(() => generateDatesForDateRange(invalidDateRange)).toThrowError(
			'Invalid date range'
		);
	});
});

describe('getDateRangeForInitialAPIRequest', () => {
	it('returns date range with length based on grid size if given length < length calculated by grid parameters', () => {
		// Arbitrary values
		const lengthOfDateRange = 1;
		const totalGridWidth = 100;
		const dateCellWidthOnGrid = 2;

		const dateRange = getDateRangeForInitialAPIRequest(
			lengthOfDateRange,
			totalGridWidth,
			dateCellWidthOnGrid
		);

		// Can be greater than or equal since the date range will always start from a monday
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeGreaterThanOrEqual(totalGridWidth / dateCellWidthOnGrid);
		// More than 7 days will not be adjusted (start from monday adjustment)
		// since monday occurs once very 7 days.
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeLessThanOrEqual(totalGridWidth / dateCellWidthOnGrid + 7);
	});

	it('returns date range with given length if grid parameters are not present', () => {
		// Arbitrary values
		const lengthOfDateRange = 10;

		const dateRange = getDateRangeForInitialAPIRequest(lengthOfDateRange);

		// Can be greater than or equal. The date range will always start from a monday
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeGreaterThanOrEqual(lengthOfDateRange);
		// More than 7 days will not be adjusted (start from monday adjustment)
		// since monday occurs once very 7 days.
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeLessThanOrEqual(lengthOfDateRange + 7);
	});

	it('returns first day of the range as Monday always if grid parameters are not present', () => {
		vi.useFakeTimers();
		// Arbitrary values
		const lengthOfDateRange = 4;
		vi.setSystemTime(new Date(2023, 10, 1));

		const dateRange = getDateRangeForInitialAPIRequest(lengthOfDateRange);

		expect(dateRange.since.getDay()).toEqual(
			DAYS_OF_THE_WEEK.indexOf('Monday')
		);

		// Set date seed as next day
		vi.setSystemTime(new Date(2023, 10, 2));
		const dateRange2 = getDateRangeForInitialAPIRequest(lengthOfDateRange);

		expect(dateRange2.since.getDay()).toEqual(
			DAYS_OF_THE_WEEK.indexOf('Monday')
		);
		vi.useRealTimers();
	});

	it('returns first day of the range as Monday always if grid parameters are present', () => {
		vi.useFakeTimers();
		// Arbitrary values
		vi.setSystemTime(new Date(2023, 10, 1));
		const lengthOfDateRange = 24;
		const totalGridWidth = 100;
		const dateCellWidthOnGrid = 2;

		const dateRange = getDateRangeForInitialAPIRequest(
			lengthOfDateRange,
			totalGridWidth,
			dateCellWidthOnGrid
		);

		expect(dateRange.since.getDay()).toEqual(
			DAYS_OF_THE_WEEK.indexOf('Monday')
		);

		// Set date seed as next day
		vi.setSystemTime(new Date(2023, 10, 2));
		const dateRange2 = getDateRangeForInitialAPIRequest(
			lengthOfDateRange,
			totalGridWidth,
			dateCellWidthOnGrid
		);

		expect(dateRange2.since.getDay()).toEqual(
			DAYS_OF_THE_WEEK.indexOf('Monday')
		);
		vi.useRealTimers();
	});
});

describe('getDateRangeForAPIRequest', () => {
	it('returns date range with given length if a valid reference range is present', () => {
		// Arbitrary values
		const lengthOfDateRange = 79;
		const referenceDateRange = {
			since: new Date(2023, 10, 1),
			until: new Date(2023, 11, 4),
		};

		const dateRange = getDateRangeForAPIRequest(
			lengthOfDateRange,
			referenceDateRange
		);

		// Can be greater than or equal. The date range will always start from a monday
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeGreaterThanOrEqual(lengthOfDateRange);
		// More than 7 days will not be adjusted (start from monday adjustment)
		// since monday occurs once very 7 days.
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeLessThanOrEqual(lengthOfDateRange + 7);
	});

	it('returns valid date range if past dates w.r.t valid reference range are requested', () => {
		// Arbitrary values
		const lengthOfDateRange = 9;
		const referenceDateRange = {
			since: new Date(2023, 10, 1),
			until: new Date(2023, 11, 4),
		};

		const dateRange = getDateRangeForAPIRequest(
			lengthOfDateRange,
			referenceDateRange,
			false
		);

		expect(dateRange.until.toDateString()).toEqual(
			referenceDateRange.since.toDateString()
		);
		// Can be greater than or equal. The date range will always start from a monday
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeGreaterThanOrEqual(lengthOfDateRange);
		// More than 7 days will not be adjusted (start from monday adjustment)
		// since monday occurs once very 7 days.
		expect(
			dateDifference(dateRange.since, dateRange.until)
		).toBeLessThanOrEqual(lengthOfDateRange + 7);
	});

	it('returns valid date range if future dates w.r.t valid reference range are requested', () => {
		// Arbitrary values
		const lengthOfDateRange = 89;
		const referenceDateRange = {
			since: new Date(2023, 1, 1),
			until: new Date(2023, 9, 4),
		};

		const dateRange = getDateRangeForAPIRequest(
			lengthOfDateRange,
			referenceDateRange,
			true
		);

		expect(dateRange.since.toDateString()).toEqual(
			referenceDateRange.until.toDateString()
		);
		// Since these are future dates, no need to adjust for monday
		expect(dateDifference(dateRange.since, dateRange.until)).toEqual(
			lengthOfDateRange
		);
	});

	it('throws error if reference date range is invalid', () => {
		// Arbitrary values
		const lengthOfDateRange = 89;
		const referenceDateRange = {
			since: new Date(2023, 10, 1),
			until: new Date(2023, 9, 4),
		};

		expect(() =>
			getDateRangeForAPIRequest(lengthOfDateRange, referenceDateRange, true)
		).toThrowError('Invalid date range');
	});
});

describe('getMergedDateRange', () => {
	it('returns valid date range if second date range argument is not passed', () => {
		const validDateRange = {
			since: new Date(2023, 1, 23),
			until: new Date(2023, 5, 7),
		};

		expect(getMergedDateRange(validDateRange)).toBeDefined();
		expect(getMergedDateRange(validDateRange)?.since.toDateString()).toEqual(
			validDateRange.since.toDateString()
		);
		expect(getMergedDateRange(validDateRange)?.until.toDateString()).toEqual(
			validDateRange.until.toDateString()
		);
	});

	it('returns valid date range if the arguments can be merged & overlap by one day', () => {
		// Populate with random dates
		const validDateRange1 = {
			since: new Date(2023, 1, 23),
			until: new Date(2023, 5, 7),
		};
		// Populate with random dates that is
		// continues on from the previous range
		const validDateRange2 = {
			since: new Date(2023, 5, 7),
			until: new Date(2024, 1, 1),
		};

		const actual = getMergedDateRange(validDateRange1, validDateRange2);

		expect(actual).toBeDefined();
		expect((actual as DateRange).since.toDateString()).toEqual(
			validDateRange1.since.toDateString()
		);
		expect((actual as DateRange).until.toDateString()).toEqual(
			validDateRange2.until.toDateString()
		);
	});

	it('returns undefined if arguments are adjacent but not overlapping & mergeAdjacentDates is false', () => {
		// Populate with random dates
		const validDateRange1 = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 10, 7),
		};
		// Populate with random dates that is
		// continues on from the previous range
		const validDateRange2 = {
			since: new Date(2023, 10, 8),
			until: new Date(2024, 1, 1),
		};

		const actual = getMergedDateRange(validDateRange1, validDateRange2, false);

		expect(actual).toBeUndefined();
	});

	it('returns valid date range if arguments are adjacent but not overlapping & mergeAdjacentDates is true', () => {
		// Populate with random dates
		const validDateRange1 = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 10, 7),
		};
		// Populate with random dates that is
		// continues on from the previous range
		const validDateRange2 = {
			since: new Date(2023, 10, 8),
			until: new Date(2024, 1, 1),
		};

		const actual = getMergedDateRange(validDateRange1, validDateRange2, true);

		expect((actual as DateRange).since.toDateString()).toEqual(
			validDateRange1.since.toDateString()
		);
		expect((actual as DateRange).until.toDateString()).toEqual(
			validDateRange2.until.toDateString()
		);
	});

	it('returns valid date range agnostic of the order of the arguments', () => {
		// Populate with random dates
		const validDateRange1 = {
			since: new Date(2023, 1, 23),
			until: new Date(2023, 5, 7),
		};
		// Populate with random dates that is
		// continues on from the previous range
		const validDateRange2 = {
			since: new Date(2023, 5, 7),
			until: new Date(2024, 1, 1),
		};

		const actual = getMergedDateRange(validDateRange1, validDateRange2);
		const mergedDateRangeOrderReversed = getMergedDateRange(
			validDateRange2,
			validDateRange1
		);

		expect(actual).toBeDefined();
		expect(mergedDateRangeOrderReversed).toBeDefined();
		expect((actual as DateRange).since.toDateString()).toEqual(
			validDateRange1.since.toDateString()
		);
		expect(
			(mergedDateRangeOrderReversed as DateRange).since.toDateString()
		).toEqual(validDateRange1.since.toDateString());
		expect((actual as DateRange).until.toDateString()).toEqual(
			validDateRange2.until.toDateString()
		);
		expect(
			(mergedDateRangeOrderReversed as DateRange).until.toDateString()
		).toEqual(validDateRange2.until.toDateString());
	});

	it('returns undefined if dates cannot be merged, agnostic of order of arguments', () => {
		// Populate with random dates
		const validDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 10, 7),
		};
		// Populate with random dates that is DOES NOT
		// continues on from the previous range
		const validButNonContiguousDateRange = {
			since: new Date(2023, 11, 8),
			until: new Date(2024, 1, 1),
		};

		expect(
			getMergedDateRange(validDateRange, validButNonContiguousDateRange)
		).toBeUndefined();
		expect(
			getMergedDateRange(validButNonContiguousDateRange, validDateRange)
		).toBeUndefined();
	});

	it('returns merged date range if the date ranges are intersecting agnostic of order of arguments', () => {
		// Populate with random dates
		const validDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 10, 7),
		};
		// Populate with random dates that is overlapping
		// but more than one day
		const validDateRange2 = {
			since: new Date(2023, 9, 5),
			until: new Date(2024, 1, 1),
		};
		const expected = {
			since: validDateRange.since,
			until: validDateRange2.until,
		};

		const actual = getMergedDateRange(validDateRange, validDateRange2);
		const actualReversed = getMergedDateRange(validDateRange2, validDateRange);

		expect(actual).toBeDefined();
		expect(actual?.since.toDateString()).toEqual(expected.since.toDateString());
		expect(actual?.until.toDateString()).toEqual(expected.until.toDateString());
		expect(actualReversed).toBeDefined();
		expect(actualReversed?.since.toDateString()).toEqual(
			expected.since.toDateString()
		);
		expect(actualReversed?.until.toDateString()).toEqual(
			expected.until.toDateString()
		);
	});

	it('returns valid date range if one date range subset of another', () => {
		// Populate with random dates
		const validDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 10, 7),
		};
		// Populate with random dates that is overlapping
		// but more than one day
		const encloseDateRange = {
			since: new Date(2023, 4, 5),
			until: new Date(2023, 7, 1),
		};
		const expected = validDateRange;

		const actual = getMergedDateRange(validDateRange, encloseDateRange);

		expect(actual).toBeDefined();
		expect(actual?.since.toDateString()).toEqual(expected.since.toDateString());
		expect(actual?.until.toDateString()).toEqual(expected.until.toDateString());
	});

	it('throws error if date ranges are invalid', () => {
		const invalidDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 1, 7),
		};
		const invalidDateRange2 = {
			since: new Date(2023, 4, 5),
			until: new Date(2023, 2, 1),
		};

		expect(() =>
			getMergedDateRange(invalidDateRange, invalidDateRange2)
		).toThrowError('Invalid date range');
	});

	it('returns valid date range if both date ranges are the same', () => {
		const validDateRange = {
			since: new Date(2023, 2, 29),
			until: new Date(2023, 1, 7),
		};

		const actual = getMergedDateRange(validDateRange);

		expect(actual).toBeDefined();
		expect(actual?.since.toDateString()).toEqual(
			validDateRange.since.toDateString()
		);
		expect(actual?.until.toDateString()).toEqual(
			validDateRange.until.toDateString()
		);
	});

	it('returns valid date range if both date ranges are same & has length of one day', () => {
		const validDateRange = {
			since: new Date(2023, 1, 7),
			until: new Date(2023, 1, 7),
		};

		const actual = getMergedDateRange(validDateRange, validDateRange);

		expect(actual).toBeDefined();
		expect(actual?.since.toDateString()).toEqual(
			validDateRange.since.toDateString()
		);
		expect(actual?.until.toDateString()).toEqual(
			validDateRange.until.toDateString()
		);
	});

	it('returns valid date range if an argument has a date range length of one day', () => {
		const validDateRange = {
			since: new Date(2023, 1, 7),
			until: new Date(2023, 1, 20),
		};
		const enclosedDateRangeOfOneDayLength = {
			since: new Date(2023, 1, 7),
			until: new Date(2023, 1, 7),
		};
		const expected = validDateRange;

		const actual = getMergedDateRange(
			validDateRange,
			enclosedDateRangeOfOneDayLength
		);

		expect(actual).toBeDefined();
		expect(actual?.since.toDateString()).toEqual(expected.since.toDateString());
		expect(actual?.until.toDateString()).toEqual(expected.until.toDateString());
	});
});
