let logger = require('../utils/log')(module);
	// auth = require('./auth');
// 	authentication = require('./authentication'),
// 	error = require('./error');

module.exports = function (app, server) {
	app.get('/', (req, res) => {
		res.redirect('/home');
	});

	app.get('/home', (req, res) => {
		res.render('home.jade', {page: 'Home'});
	});

	app.get('/list', (req, res) => {
		let Student = require('../models/student');
			Student.find((err, students) => {
				if (err) logger.error(err);
				res.render('list.jade', {page: 'List', list: students});
			});
	});

	app.get('/chat', (req, res) => {
		let io = require('socket.io').listen(server);
		res.render('chat.jade', {page: 'Chat'});
	});

	// auth(app);

	// app.post('/register', register.requestRegistration);

	// app.get('/users', authentication.users);
	// app.get('/users/:id', authentication.user);

	// app.get('*', error['404']);
};