let mongoose = require('mongoose'),
	config = require('../config'),
	db = mongoose.connection;

mongoose.connect(config.get('db:connection') + '/' + config.get('db:name'));

db.on('error', (err) => {
	console.log(err);
});

db.once('open', () => {
	console.log('Connected to database');
})

module.exports = mongoose;