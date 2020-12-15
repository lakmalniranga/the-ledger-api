export default function httpCallback(controller) {
	// Extract required request body elements
	return async ({ body, query, params, method, path }, res) => {
		try {
			// get response from controller and send the response
			const { result, ...rest } = await controller({ body, query, params, method, path });

			// set default status code to 200, HTTP OK
			const statusCode = rest.statusCode || 200;
			return res.status(statusCode).send({ result });
		} catch (error) {
			return res.status(error.statusCode).send({ error });
		}
	};
}
