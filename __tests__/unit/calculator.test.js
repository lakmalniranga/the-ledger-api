import Ledger from '@ledger/use-cases/ledger';
import calculatorFactory from '@ledger/use-cases/calulators';
import Calculator from '@ledger/use-cases/calulators/calculator';

jest.mock('@ledger/use-cases/calulators/calculator');

beforeEach(() => {
	Calculator.mockClear();
});

describe('calculator', () => {
	test('check if the calculate factory the class constructor', async () => {
		calculatorFactory({ frequency: 'weekly' });
		expect(Calculator).toHaveBeenCalledTimes(1);
	});

	test('ledger integration', async () => {
		const start = new Date('2020-10-10');
		const end = new Date('2020-10-16');

		Calculator.mockImplementation(() => {
			return {
				calculate: () => [{ start, end, amount: 100 }],
			};
		});

		const ledger = new Ledger({ start, end, weeklyRent: 100, calculator: new Calculator() })
			.calculate()
			.format();

		expect(ledger).toStrictEqual([
			{
				start: 'October 10th, 2020',
				end: 'October 16th, 2020',
				amount: 100,
			},
		]);
		expect(Calculator).toHaveBeenCalledTimes(1);
	});
});
