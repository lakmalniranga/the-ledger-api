import joi from '@hapi/joi';
import joiTimezone from 'joi-tz';

import { FREQUENCIES } from '@common/constants';

const Joi = joi.extend(joiTimezone);

export const getLedgerSchema = {
	startDate: Joi.date(),
	endDate: Joi.date().required(),
	frequency: Joi.any()
		.required()
		.valid(...Object.keys(FREQUENCIES)),
	weeklyRent: Joi.number().required(),
	timezone: Joi.timezone().required(),
};
