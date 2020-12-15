import joi from '@hapi/joi';

export function validate({ schema, data }) {
	const validationObject = joi.object({ ...schema });
	const validations = validationObject.validate(data);
	return validations;
}
