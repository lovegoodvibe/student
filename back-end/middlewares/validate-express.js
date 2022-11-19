const { validationResult } = require('express-validator');

const valid = async function (req, res, next) {
	try {
		const error = validationResult(req);

		if (!error.isEmpty()) {
			const { errors } = error;
			const messages = errors.map(item => item.msg);
			res.status(400).json({
				code: 'VALIDATE_ERROR',
				message: messages.join(', '),
				error: messages,
			});
		} else {
			next();
		}
	} catch (e) {
		console.log('e', e);
		res.status(400).json({
			code: 'VALIDATE_ERROR',
			message: `${e.message || e}`,
		});
	}
};
module.exports = valid;
