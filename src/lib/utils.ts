export function getDateAfterNumberOfDays(date: Date, noOfDays: number) {
	const newDate = new Date(date.getTime());
	newDate.setDate(newDate.getDate() + noOfDays);

	return newDate;
}
