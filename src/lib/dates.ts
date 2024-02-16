export type DatesForAPIRequest = {
	since: Date;
	until: Date;
};

export class GridDates {
	static widthOfTimelineGridDateInPixels = 54;
	static #minimumNumberOfDatesToBeDisplayed: number = 14;
	#startDate?: Date;
	#endDate?: Date;
	#nextStartDate: Date;
	#nextEndDate: Date;
	#displayedDates: Array<Date>;

	constructor(scrollWidthOfGridContainer: number) {
		const numberOfDatesToBeDisplayed =
			this.#getNumberOfDatesToBeDisplayedInitially(scrollWidthOfGridContainer);
		this.#nextStartDate = this.#getInitialStartDate(numberOfDatesToBeDisplayed);
		this.#nextEndDate = this.#getInitialEndDate(numberOfDatesToBeDisplayed);
		this.#displayedDates = [];
	}

	getDisplayedDatesOnAPIResponseSuccess(): Array<Date> {
		if (!this.#startDate || !this.#endDate) {
			// First API response, hence populate the displayed dates
			// completely
			let currentDate = GridDates.#copyDate(this.#nextStartDate);
			while (!GridDates.#areDatesEqual(currentDate, this.#nextEndDate)) {
				this.#displayedDates.push(currentDate);
				currentDate = GridDates.#copyDate(currentDate);
				currentDate.setDate(currentDate.getDate() + 1);
			}
		} else if (!GridDates.#areDatesEqual(this.#endDate, this.#nextEndDate)) {
			// One month later API response, hence add dates to the end
			let currentDate = GridDates.#copyDate(this.#endDate);
			while (!GridDates.#areDatesEqual(currentDate, this.#nextEndDate)) {
				this.#displayedDates.push(currentDate);
				currentDate = GridDates.#copyDate(currentDate);
				currentDate.setDate(currentDate.getDate() + 1);
			}
		} else {
			// One month earlier API response, hence add dates to the start
			let currentDate = GridDates.#copyDate(this.#nextStartDate);
			const oneMonthEarlierDisplayedDates = [];
			while (!GridDates.#areDatesEqual(currentDate, this.#startDate)) {
				oneMonthEarlierDisplayedDates.push(currentDate);
				currentDate = GridDates.#copyDate(currentDate);
				currentDate.setDate(currentDate.getDate() + 1);
			}

			this.#displayedDates = [
				...oneMonthEarlierDisplayedDates,
				...this.#displayedDates,
			];
		}

		this.#endDate = GridDates.#copyDate(this.#nextEndDate);
		this.#startDate = GridDates.#copyDate(this.#nextStartDate);

		return this.#displayedDates;
	}

	getOptimumDisplayedGridWidth(): number {
		return (
			this.#displayedDates.length * GridDates.widthOfTimelineGridDateInPixels
		);
	}

	getDatesForAPIRequest(): DatesForAPIRequest {
		return {
			since: GridDates.#copyDate(this.#nextStartDate),
			until: GridDates.#copyDate(this.#nextEndDate),
		};
	}

	getOneMonthEarlierDatesForAPIRequest(): DatesForAPIRequest {
		if (!this.#endDate || !this.#startDate) {
			throw Error('Only invoke this method after the first API call');
		}
		this.#nextStartDate = GridDates.#copyDate(this.#startDate);
		this.#nextStartDate.setMonth(this.#startDate.getMonth() - 1);
		// Adjust for monday since the grid will be
		// misaligned if the the starting position is not monday
		this.#nextStartDate.setDate(
			this.#nextStartDate.getDate() + (1 - this.#nextStartDate.getDay())
		);

		return {
			since: GridDates.#copyDate(this.#nextStartDate),
			until: GridDates.#copyDate(this.#startDate),
		};
	}

	getOneMonthLaterDatesForAPIRequest(): DatesForAPIRequest {
		if (!this.#endDate || !this.#startDate) {
			throw Error('Only invoke this method after the first API call');
		}
		this.#nextEndDate = GridDates.#copyDate(this.#endDate);
		this.#nextEndDate.setMonth(this.#endDate.getMonth() + 1);

		return {
			since: GridDates.#copyDate(this.#endDate),
			until: GridDates.#copyDate(this.#nextEndDate),
		};
	}

	#getNumberOfDatesToBeDisplayedInitially(
		scrollWidthOfGridContainer: number
	): number {
		const numberOfDatesToBeDisplayedAccordingToScreenSize = Math.ceil(
			scrollWidthOfGridContainer / GridDates.widthOfTimelineGridDateInPixels
		);

		return numberOfDatesToBeDisplayedAccordingToScreenSize <
			GridDates.#minimumNumberOfDatesToBeDisplayed
			? GridDates.#minimumNumberOfDatesToBeDisplayed
			: numberOfDatesToBeDisplayedAccordingToScreenSize;
	}

	#getInitialStartDate(totalNumberOfDates: number): Date {
		const today = new Date();
		today.setDate(today.getDate() - Math.floor(totalNumberOfDates / 2));
		// Adjust for monday since the grid will be
		// misaligned if the the starting position is not monday
		today.setDate(today.getDate() + (1 - today.getDay()));

		return today;
	}

	#getInitialEndDate(totalNumberOfDates: number): Date {
		const today = new Date();
		today.setDate(today.getDate() + Math.ceil(totalNumberOfDates / 2));

		return today;
	}

	static #copyDate(date: Date) {
		const copiedDate = new Date(date.getTime());

		return copiedDate;
	}

	static #areDatesEqual(date1: Date, date2: Date): boolean {
		return date1.toDateString() == date2.toDateString();
	}
}
