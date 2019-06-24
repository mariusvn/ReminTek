const { createLogger, format, transports } = require('winston');
const { simple } = format;


const logger = createLogger({
	level: 'info',
	format:
		simple(),
	defaultMeta: { service: 'ReminTek' },
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log`
		// - Write all logs error (and below) to `error.log`.
		//
		new transports.Console(),
		new transports.File({ filename: './server.log' })
	]
});

/**
 * @type {winston.Logger}
 */
module.exports = logger;