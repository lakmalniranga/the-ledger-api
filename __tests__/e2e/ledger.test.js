import HttpStatus from 'http-status-codes';
import superTest from 'supertest';

import app from '@app';
import { VALIDATION_ERROR } from '@common/errors';

describe('ledger flow', () => {
	test('weekly', async () => {
		const response = await superTest(app)
			.get('/ledger')
			.query({
				startDate: '2020-03-02T00:00:00+0000',
				endDate: '2020-03-22T00:00:00+0000',
				frequency: 'weekly',
				weeklyRent: 555,
				timezone: 'Asia/colombo',
			})
			.expect(HttpStatus.OK);
		expect(response.body.result).toStrictEqual([
			{ start: 'March 2nd, 2020', end: 'March 8th, 2020', amount: 555 },
			{ start: 'March 9th, 2020', end: 'March 15th, 2020', amount: 555 },
			{ start: 'March 16th, 2020', end: 'March 22nd, 2020', amount: 555 },
		]);
	});

	test('fortnightly', async () => {
		const response = await superTest(app)
			.get('/ledger')
			.query({
				startDate: '2020-03-28T00:00:00+0000',
				endDate: '2020-05-27T00:00:00+0000',
				frequency: 'fortnightly',
				weeklyRent: 555,
				timezone: 'Asia/colombo',
			})
			.expect(HttpStatus.OK);
		expect(response.body.result).toStrictEqual([
			{ start: 'March 28th, 2020', end: 'April 10th, 2020', amount: 1110 },
			{ start: 'April 11th, 2020', end: 'April 24th, 2020', amount: 1110 },
			{ start: 'April 25th, 2020', end: 'May 8th, 2020', amount: 1110 },
			{ start: 'May 9th, 2020', end: 'May 22nd, 2020', amount: 1110 },
			{ start: 'May 23rd, 2020', end: 'May 27th, 2020', amount: 396.43 },
		]);
	});

	test('monthly', async () => {
		const response = await superTest(app)
			.get('/ledger')
			.query({
				startDate: '2020-01-31T00:00:00+0000',
				endDate: '2020-06-29T00:00:00+0000',
				frequency: 'monthly',
				weeklyRent: 555,
				timezone: 'Asia/colombo',
			})
			.expect(HttpStatus.OK);
		expect(response.body.result).toStrictEqual([
			{ start: 'January 31st, 2020', end: 'February 28th, 2020', amount: 2411.61 },
			{ start: 'February 29th, 2020', end: 'March 30th, 2020', amount: 2411.61 },
			{ start: 'March 31st, 2020', end: 'April 29th, 2020', amount: 2411.61 },
			{ start: 'April 30th, 2020', end: 'May 30th, 2020', amount: 2411.61 },
			{ start: 'May 31st, 2020', end: 'June 29th, 2020', amount: 2411.61 },
		]);
	});
});

describe('validations', () => {
	test('start date', async () => {
		const response = await superTest(app)
			.get('/ledger')
			.query({
				startDate: '2020-01-32',
				endDate: '2020-06-29T00:00:00+0000',
				weeklyRent: 555,
				timezone: 'Asia/colombo',
				frequency: 'monthly',
			})
			.expect(HttpStatus.BAD_REQUEST);
		expect(response.body.error).toEqual(expect.objectContaining(VALIDATION_ERROR));
	});

	test('frequency typo', async () => {
		const response = await superTest(app)
			.get('/ledger')
			.query({
				startDate: '2020-01-31T00:00:00+0000',
				endDate: '2020-06-29T00:00:00+0000',
				weeklyRent: 555,
				timezone: 'Asia/colombo',
				frequency: 'monthlyy',
			})
			.expect(HttpStatus.BAD_REQUEST);
		expect(response.body.error).toEqual(expect.objectContaining(VALIDATION_ERROR));
	});

	test('invalid timezone', async () => {
		const response = await superTest(app)
			.get('/ledger')
			.query({
				startDate: '2020-01-31T00:00:00+0000',
				endDate: '2020-06-29T00:00:00+0000',
				weeklyRent: 555,
				timezone: 'Asia/Jayawardanapura',
				frequency: 'monthly',
			})
			.expect(HttpStatus.BAD_REQUEST);
		expect(response.body.error).toEqual(expect.objectContaining(VALIDATION_ERROR));
	});
});
