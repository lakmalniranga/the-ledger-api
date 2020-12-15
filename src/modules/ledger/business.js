import Ledger from '@ledger/use-cases/ledger';
import calculatorFactory from '@ledger/use-cases/calulators';
import { getLedgerSchema as ledgerSchema } from '@ledger/validatoion-schema';
import { validate } from '@helpers/validator';
import { VALIDATION_ERROR } from '@common/errors';

class LedgerBusiness {
	async get({ frequency, start, end, weeklyRent, ...rest }) {
		// Keep validation on bussiness level instead of request level
		const { error } = validate({
			schema: ledgerSchema,
			data: { frequency, startDate: start, endDate: end, weeklyRent, ...rest },
		});
		if (error) throw { ...VALIDATION_ERROR, errors: error.details };

		const calculator = calculatorFactory({ frequency });
		return new Ledger({ start, end, weeklyRent })
			.setCalculationStrategy({ calculator })
			.calculate()
			.format();
	}
}

export default new LedgerBusiness();
