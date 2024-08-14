const logger = require('../logger');
const { getErrorResponse } = require('../functions/getResponse')

const errorLogger = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path
    });

    getErrorResponse(res)
};

module.exports = errorLogger;