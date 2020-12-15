import Calculator from '@ledger/use-cases/calulators/calculator';
import { add, isBeforeOrSame, sub } from '@utils/date-time';

export default class MonthlyCalculator extends Calculator {
	constructor({ unit, unitsPerSlot }) {
		super({ unit, unitsPerSlot });
		this.unit = unit;
		this.unitsPerSlot = unitsPerSlot;
	}

	calculate({ start, end, weeklyRent }) {
		const unitRent = (((weeklyRent / 7) * 365) / 12) * this.unitsPerSlot;
		return super.calculate({ start, end, unitRent, weeklyRent });
	}

	/**
	 * Generate date slots between two dates
	 * @param {Date} start The starting date of the lease
	 * @param {Date} end The ending date of the lease
	 * @param {Number} duration The number of units per slot. Eg: 1 month, 2 weeks
	 * @param {String} durationType The type of the unit. Eg: 'months', 'weeks', 'days'
	 * @return {Array} example [{ start: ..., end: ... }, ...]
	 */
	generateSlots({ start, end, duration, durationType }) {
		let slotStartDate = start;
		let isBeforeLeaseEnd = isBeforeOrSame(slotStartDate, end);

		// generate date slots till the lease end date
		const slots = [];

		// monthly counter used to add months from lease start date instead of slot start date
		let monthCounter = 1;
		while (isBeforeLeaseEnd) {
			// add slot start date to object before updating the start date
			const slot = { start: slotStartDate };

			// update start date of the next slot
			slotStartDate = add({ date: start, duration: monthCounter, durationType });

			// get end date of current slot, by subtracting a day from start date of next slot
			const slotEndDate = sub({ date: slotStartDate, duration, durationType: 'days' });

			isBeforeLeaseEnd = isBeforeOrSame(slotStartDate, end);

			// if lease end date is before the slot end date, use lease end date
			slots.push({ ...slot, end: isBeforeLeaseEnd ? slotEndDate : end });
			monthCounter++;
		}
		return slots;
	}
}
