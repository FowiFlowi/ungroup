let mongoose = require('mongoose'),
	config = require('../config'),
	logger = require('./log.js')(module),
	db = mongoose.connection;

mongoose.connect(config.get('db:connection') + '/' + config.get('db:name'));

db.on('error', (err) => {
	logger.error(err);
});

db.once('open', () => {
	logger.info('Connected to database');
})

module.exports = mongoose;