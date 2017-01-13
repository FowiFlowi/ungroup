let logger = require('../utils/log')(module),
	auth = require('./auth');

module.exports = function (app, server) {
	app.get('/', (req, res) => {
		res.redirect('/home');
	});

	app.get('/home', (req, res) => {
		res.render('home.jade', {page: 'Home'});
	});

	app.get('/list', (req, res) => {
		let student = new require('../models/student')();
		student.getAll((err, list) => {
			if (err) logger.error(err)
			else res.render('list.jade', {page: 'List', list});
		});
	});

	app.get('/chat', (req, res) => {
		let io = require('../utils/io')(require('socket.io').listen(server, {
			'reconnection': true,
			'reconnectionDelay': 500,
			'reconnectionAttempts': 10
		}));
		res.render('chat.jade', {page: 'Chat'});
	});

	auth(app);
};