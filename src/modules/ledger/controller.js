import { logger } from '@services';

export async function getLedger({ body }) {
	logger.log({ body });
	return { result: 'Example response' };
}
