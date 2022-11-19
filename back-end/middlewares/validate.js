const Joi = require('joi');
const _ = require('lodash');

module.exports = function (schemaObj) {
	return async function (req, res, next) {
		try {
			const schema = Joi.object(schemaObj);
			const params = _.pick(req, Object.keys(schemaObj));
			const valid = schema.validate(params, { allowUnknown: false });
			const { error } = valid;

			if (error) {
				const { message, details } = error;
				res.status(400).json({
					code: 'VALIDATE_ERROR',
					message: message,
					error: details.map((item) => item.message),
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
};
