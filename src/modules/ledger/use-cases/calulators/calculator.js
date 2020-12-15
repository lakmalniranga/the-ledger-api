import { add, isBeforeOrSame, sub, diffInDays, isBefore } from '@utils/date-time';

export default class Calculator {
	/**
	 * Calculator can be used to calculate price for each slot within given duration
	 * @param {Number} unitsPerSlot The number of units per each slot.
	 * Eg: 1 month, 3 months, 1 weeks, 2 weeks
	 */
	constructor({ unit, unitsPerSlot }) {
		this.unit = unit;
		this.unitsPerSlot = unitsPerSlot;
	}

	/**
	 * Generate ledger
	 * @param {Date} start The starting date of the lease
	 * @param {Date} end The ending date of the lease
	 * @param {Number} unitRent The rent amount of a unit
	 * @param {Number} weeklyRent The rent of a week
	 * @return {Array} example [{ start: ..., end: ..., amount: ... }, ...]
	 */
	calculate({ start, end, unitRent, weeklyRent }) {
		const [durationType, duration] = [this.unit, this.unitsPerSlot];

		// get slots between start and end dates
		const slots = this.generateSlots({ start, end, duration, durationType });

		// rent of a slot, round up the value to two decimal points
		const rent = Number(unitRent.toFixed(2));

		// get slots with calculated rents
		return this.getRents({ slots, rent, end, duration, durationType, weeklyRent });
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
		while (isBeforeLeaseEnd) {
			// add slot start date to object before updating the start date
			const slot = { start: slotStartDate };

			// update start date of the next slot
			slotStartDate = add({ date: slotStartDate, duration, durationType });

			// get end date of current slot, by subtracting a day from start date of next slot
			const slotEndDate = sub({ date: slotStartDate, duration: 1, durationType: 'days' });

			isBeforeLeaseEnd = isBeforeOrSame(slotStartDate, end);

			// if lease end date is before the slot end date, use lease end date
			slots.push({ ...slot, end: isBeforeLeaseEnd ? slotEndDate : end });
		}
		return slots;
	}

	/**
	 * Calculate rent for given slots
	 * @param {Array} slots The starting date of the lease
	 * @param {Number} rent The ending date of the lease
	 * @param {Date} end number of units per slot. Eg 1 month, 2 weeks
	 * @param {Number} duration The number of units per slot. Eg: 1 month, 2 weeks
	 * @param {String} durationType The type of the unit. Eg: 'months', 'weeks', 'days'
	 * @param {Number} weeklyRent The rent of a week
	 * @return {Array} example [{ start: ..., end: ... }, ...]
	 */
	getRents({ slots, rent, end: leaseEnd, duration, durationType, weeklyRent }) {
		const rents = [];
		for (let i = 0; i < slots.length; i++) {
			const { start, end } = slots[i];

			/// calculate rent of last element separately: if no of dates in last slot
			// less than < days in normal slot
			const isLastSlotCutShort =
				i === slots.length - 1 &&
				this.isBeforeLedgerEndDate({ start, end: leaseEnd, duration, durationType });

			if (isLastSlotCutShort) {
				const lastSlotRent = ((weeklyRent / 7) * diffInDays(end, start)).toFixed(2);
				rents.push({ start, end, amount: Number(lastSlotRent) });
				continue;
			}

			rents.push({ start, end, amount: rent });
		}
		return rents;
	}

	/**
	 * Determine whether slot end date is less than the lease ending date
	 * @param {Date} start The start date of last slot
	 * @param {Date} end The ending date of lease
	 * @param {Number} duration number of units per slot. Eg 1 month, 2 weeks
	 * @return {Array} example [{ start: ..., end: ... }, ...]
	 */
	isBeforeLedgerEndDate({ start, end, duration, durationType }) {
		let endOfSlot = add({ date: start, duration, durationType });

		// -1 day to get end date of the slot
		endOfSlot = sub({ date: endOfSlot, duration: 1, durationType: 'days' });

		return isBefore(end, endOfSlot);
	}
}
