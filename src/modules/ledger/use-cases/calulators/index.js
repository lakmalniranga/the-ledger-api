/* eslint-disable no-unreachable */
import WeeklyCalculator from '@ledger/use-cases/calulators/weekly-calculator';
import MonthlyCalculator from '@ledger/use-cases/calulators/monthly-calculator';
import { FREQUENCIES } from '@common/constants';

export default function calculatorFactory({ frequency }) {
	const { unit, unitsPerSlot } = FREQUENCIES[frequency];
	switch (frequency) {
		case FREQUENCIES.weekly.id:
			return new WeeklyCalculator({ unit, unitsPerSlot });
			break;
		case FREQUENCIES.fortnightly.id:
			return new WeeklyCalculator({ unit, unitsPerSlot });
			break;
		case FREQUENCIES.monthly.id:
			return new MonthlyCalculator({ unit, unitsPerSlot });
			break;
		default:
			throw Error('Invalid frequency');
	}
}
