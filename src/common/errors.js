import HttpStatus from 'http-status-codes';

export const VALIDATION_ERROR = {
	statusCode: HttpStatus.BAD_REQUEST,
	message: 'Some data submitted are invalid',
	name: 'VALIDATION_ERROR',
};

export const INTERNAL_SERVER_ERROR = {
	statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	message: 'Something went wrong in our end',
	name: 'INTERNAL_SERVER_ERROR',
};
