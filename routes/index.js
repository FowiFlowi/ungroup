let logger = require('../utils/log')(module),
	auth = require('./auth');

module.exports = function (app, server) {
	auth(app);
	
	app.get('/', (req, res) => {
		res.redirect('/home', {pageData: { 'user': req.user }});
	});

	app.get('/home', (req, res) => {
		res.render('home', { page: 'Home', 'user': req.user });
	});

	app.get('/list', (req, res) => {
		let studentList = new require('../models/studentList')();
		studentList.getAll((err, list) => {
			if (err) logger.error(err)
			else res.render('list', { page: 'List', 'user': req.user, list });
		});
	});

	app.get('/chat', (req, res) => {
		let io = require('../utils/io')(server);
		res.render('chat', { page: 'Chat', user: req.user });
	});
};