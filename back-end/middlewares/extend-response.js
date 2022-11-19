const { UserError } = require('../utils/custom-errors');
const appConfig = require('../configs/app.cfg');
const htmlUtil = require('../utils/html');

async function extendResponse(req, res, next) {
    res.sendError = (error, controller = 'unknown', action = 'unknown') => {
        if (error instanceof UserError) {
            res.status(400).json(error);
        } else {
            console.error(`${controller} => ${action}: `, error);
            res.status(500).send({ message: error.message });
        }
    };

    next();
}

module.exports = extendResponse;
