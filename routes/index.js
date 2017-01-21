let logger = require('../utils/log')(module),
	auth = require('./auth');

module.exports = function (app, server) {
	auth(app);
	
	app.get('/', (req, res) => {
		res.redirect('/home');
	});

	app.get('/home', (req, res) => {
		res.render('home', { page: 'Home' });
	});

	app.get('/list', (req, res) => {
		let studentList = new require('../models/studentList')();
		studentList.getAll((err, list) => {
			if (err) logger.error(err)
			else res.render('list', { page: 'List', list });
		});
	});

	app.get('/chat', (req, res) => {
		let io = require('../utils/io')(server);
		res.render('chat', { page: 'Chat' });
	});
};