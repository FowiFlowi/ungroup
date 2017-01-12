let mongoose = require('mongoose'),
	config = require('../config'),
	logger = require('./log.js')(module),
	db = mongoose.connection;

mongoose.connect(config.get('db:connection') + '/' + config.get('db:name'));

db.on('error', (err) => {
	logger.error(err);
	process.exit(1);
});

db.once('open', () => {
	logger.info('Connected to database');
});

db.once('close', () => {
	logger.info('Connection has closed');
});

module.exports = mongoose;