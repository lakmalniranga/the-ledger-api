import {
	parseISO,
	add as addDuration,
	sub as subDuration,
	format as formatDate,
	isBefore as isBeforeDate,
	differenceInCalendarDays,
	isSameDay as isDateOnSameDay,
} from 'date-fns';

/**
 * Add duration to a date
 * @param {Date} date The date which needs to add
 * @param {Number} duration The duration needs to be added to date
 * @param {String} type The type of the duration, enum (years, months, weeks, days, hours, minutes)
 * @return {Date}
 */
export function add({ date, duration, durationType }) {
	return addDuration(date, { [durationType]: duration });
}

/**
 * Subtract duration from a date
 * @param {Date} date The date which needs to subtract
 * @param {Number} duration The duration needs to be subtract from date
 * @param {String} type The type of the duration, enum (years, months, weeks, days, hours, minutes)
 * @return {Date}
 */
export function sub({ date, duration, durationType }) {
	return subDuration(date, { [durationType]: duration });
}

/**
 * Return difference between two days in number of days
 * @param {Date} firstDate
 * @param {Date} secondDate
 * @return {Number} The difference between given days
 */
export function diffInDays(firstDate, secondDate) {
	// +1 is added later to include starting date
	return Math.abs(differenceInCalendarDays(firstDate, secondDate)) + 1;
}

/**
 * Compare date is before
 * @param {Date} date
 * @param {Date} dateToCompare The date which needs to compare with
 * @return {Boolean}
 */
export function isBefore(date, dateToCompare) {
	return isBeforeDate(date, dateToCompare);
}

/**
 * Compare date is before or same to given date
 * @param {Date} date
 * @param {Date} dateToCompare The date which needs to compare with
 * @return {Boolean}
 */
export function isBeforeOrSame(date, dateToCompare) {
	return isBeforeDate(date, dateToCompare) || isDateOnSameDay(date, dateToCompare);
}

/**
 * Parse date from string
 * @param {String | Date} date The date which needs to parse
 * @return {Date}
 */
export function parseDate(date) {
	return parseISO(date);
}

/**
 * Subtract duration from a date
 * @param {Date} date The date which needs to format
 * @param {String} scheme The format of date
 * @return {String} Formated date
 */
export function format({ date, scheme = 'yyyy-MM-dd' }) {
	return formatDate(date, scheme);
}
