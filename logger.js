const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, 'error.log'), 
            level: 'error' 
        }),
        new winston.transports.Console()
    ]
});

module.exports = logger;
