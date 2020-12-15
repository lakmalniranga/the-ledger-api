import {
	add,
	sub,
	diffInDays,
	isBefore,
	isBeforeOrSame,
	parseDate,
	format,
} from '@utils/date-time';

describe('date & time', () => {
	describe('add duration to a date', () => {
		test('add 10 days', async () => {
			const date = add({ date: new Date('2020-04-01'), duration: 10, durationType: 'days' });
			expect(date).toEqual(new Date('2020-04-11'));
		});

		test('add 2 month from december 31st', async () => {
			const date = add({ date: new Date('2019-12-31'), duration: 2, durationType: 'months' });
			expect(date).toEqual(new Date('2020-02-29'));
		});

		test('add 3 weeks from january 1st', async () => {
			const date = add({ date: new Date('2020-01-01'), duration: 3, durationType: 'weeks' });
			expect(date).toEqual(new Date('2020-01-22'));
		});
	});

	describe('subtract duration from a date', () => {
		test('substract 1 day', async () => {
			const date = sub({ date: new Date('2020-04-01'), duration: 1, durationType: 'days' });
			expect(date).toEqual(new Date('2020-03-31'));
		});

		test('substract 2 months', async () => {
			const date = sub({ date: new Date('2020-04-30'), duration: 2, durationType: 'months' });
			expect(date).toEqual(new Date('2020-02-29'));
		});

		test('substract 2 weeks', async () => {
			const date = sub({ date: new Date('2020-12-30'), duration: 2, durationType: 'weeks' });
			expect(date).toEqual(new Date('2020-12-16'));
		});
	});

	describe('check length between two dates', () => {
		test('recent date as a first param', async () => {
			const date = diffInDays(new Date('2020-03-31'), new Date('2020-03-01'));
			expect(date).toBe(31);
		});

		test('old date as a first param', async () => {
			const date = diffInDays(new Date('2020-03-01'), new Date('2020-03-31'));
			expect(date).toBe(31);
		});
	});

	describe('check first date is before the second', () => {
		test('recent date as a first date', async () => {
			const date = isBefore(new Date('2020-03-31'), new Date('2020-03-01'));
			expect(date).toBe(false);
		});

		test('old date as a first date', async () => {
			const date = isBefore(new Date('2020-03-01'), new Date('2020-03-31'));
			expect(date).toBe(true);
		});

		test('same date for both dates', async () => {
			const date = isBefore(new Date('2020-10-10'), new Date('2020-10-10'));
			expect(date).toBe(false);
		});
	});

	describe('check first date is same or before the second date', () => {
		test('recent date as a first date', async () => {
			const date = isBeforeOrSame(new Date('2029-05-10'), new Date('2011-11-01'));
			expect(date).toBe(false);
		});

		test('old date as a first date', async () => {
			const date = isBeforeOrSame(new Date('1990-03-02'), new Date('2060-06-12'));
			expect(date).toBe(true);
		});

		test('same date for both dates', async () => {
			const date = isBeforeOrSame(new Date('2022-10-10'), new Date('2022-10-10'));
			expect(date).toBe(true);
		});
	});

	describe('parse date strings', () => {
		test('parse ISO date string', async () => {
			const date = parseDate('2025-10-25T00:00:00+0000');
			const dateTime = new Date(new Date('2025-10-25').setHours(0, 0, 0, 0)); // convert to iso date with timezone offset
			const isoDateTime = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000); // offset in ms
			expect(date).toEqual(isoDateTime);
		});

		test('get day of the month from date object', async () => {
			const date = parseDate('2030-11-05').getDate();
			expect(date).toBe(5);
		});
	});

	describe('format date to given format', () => {
		test('default should be YYYY-MM-DD', async () => {
			const date = format({ date: new Date('2020-10-10') });
			expect(date).toEqual('2020-10-10');
		});

		test('MMMM do, yyyy', async () => {
			const date = format({ date: new Date('2020-10-10'), scheme: 'MMMM do, yyyy' });
			expect(date).toEqual('October 10th, 2020');
		});
	});
});
