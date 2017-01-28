let winston = require('winston');

module.exports = function(module) {
	return getLogger(module.filename);
};

function getLogger (path) {
	if (path.match(/io.js$/)) {
		let transports = [
			new winston.transports.File({
				filename: 'logs/chat.log',
				timestamp: true, 			// function() { return new Date().toString() }
				level: 'debug'
			}),
			// new winston.transports.File({
			// 	name: 'chatInfo',
			// 	filename: 'logs/app.log',
			// 	timestamp: true,
			// 	level: 'info'
			// }),
			new winston.transports.Console({
				timestamp: true,
				colorize: true,
				level: 'info'
			})
		];
		return new winston.Logger({ transports: transports });
	} else {
		let transports = [
			// new winston.transports.File({
			// 	name: 'serverLogs',
			// 	filename: 'logs/app.log',
			// 	timestamp: true,
			// 	level: 'debug'
			// }),
			new winston.transports.Console({
				timestamp: true,
				colorize: true,
				level: 'info'
			})
		];
		return new winston.Logger({ transports: transports });
	};
}