import { format } from '@utils/date-time';

class Ledger {
	constructor({ start, end, weeklyRent, calculator }) {
		this.start = start;
		this.end = end;
		this.weeklyRent = weeklyRent;
		this.calculator = calculator;
		return this;
	}

	get() {
		return this.ledger;
	}

	setCalculationStrategy({ calculator }) {
		this.calculator = calculator;
		return this;
	}

	calculate() {
		this.ledger = this.calculator.calculate(this);
		return this;
	}

	format(scheme = 'MMMM do, yyyy') {
		return this.ledger.map(({ start, end, ...rest }) => ({
			start: format({ date: start, scheme }),
			end: format({ date: end, scheme }),
			...rest,
		}));
	}
}

export default Ledger;
