import LedgerBusiness from '@ledger/business';
import { parseDate } from '@utils/date-time';

export async function getLedger({ query: { startDate, endDate, ...rest } }) {
	const ledger = await LedgerBusiness.get({
		start: parseDate(startDate),
		end: parseDate(endDate),
		...rest,
	});
	return { result: ledger };
}
