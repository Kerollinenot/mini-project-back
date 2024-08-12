const logger = require('../logger');

const errorLogger = (err, req, res, next) => {
    logger.error({
        message: err.message,
        path: req.path
    }); 
    next(err);
};

module.exports = errorLogger;
