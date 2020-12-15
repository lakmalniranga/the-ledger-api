import Calculator from '@ledger/use-cases/calulators/calculator';

export default class WeeklyCalculator extends Calculator {
	constructor({ unit, unitsPerSlot }) {
		super({ unit, unitsPerSlot });
		this.unit = unit;
		this.unitsPerSlot = unitsPerSlot;
	}

	calculate({ start, end, weeklyRent }) {
		const unitRent = weeklyRent * this.unitsPerSlot;
		return super.calculate({ start, end, unitRent, weeklyRent });
	}
}
