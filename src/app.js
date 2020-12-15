import express from 'express';
import requestLogger from 'morgan';
import cors from 'cors';

import config from '@config';
import { logger } from '@services';
import { getLedger } from '@ledger/controller';
import routerCallback from '@helpers/router-callback';

const app = express();

/**
 * Middleware configuration for express
 */
if (!config.IS_TEST) app.use(requestLogger('tiny'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cors());

/**
 * API endpoints
 */
app.get('/ledger', routerCallback(getLedger));

/**
 * Event listener for unhandled exception.
 */
process.on('unhandledRejection', (error, promise) => {
	logger.error('🔥 -> Promise rejection here: ', promise);
	logger.error('🐞 -> The error was: ', error);
});

process.on('uncaughtException', (error) => {
	logger.error('🔥 -> Something terrible happened: ', error);
	logger.error('🐞 -> The error was: ', error);
	process.exit(1);
});

export default app;
