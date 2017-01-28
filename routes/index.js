let logger = require('../utils/log')(module),
	auth = require('./auth');

module.exports = function (app, server, http) {
	auth(app);
	
	app.get('/', (req, res) => {
		res.status(200).redirect('/home');
	});

	app.get('/home', (req, res) => {
		res.render('home', { page: 'Home', user: req.user });
	});

	app.get('/list', (req, res) => {
		let studentList = require('../models/studentList'),
			name;

		req.query.group ? name = req.query.group : name = req.user.group
		
		studentList.findOne({ name }, (err, group) => {
			err ? logger.error(err) 
				: res.render('list', { page: 'List', user: req.user, group });
		});
	});

	app.get('/chat', (req, res) => {
		let io = require('../utils/io')(server, req.user);
		res.render('chat', { page: 'Chat', user: req.user });
	});

	app.get('/user', (req, res) => {
		res.render('user', { page: req.user.nickname, user: req.user })
	});

	app.get('/schedule', (req, res) => {
		let schedule = require('../models/schedule')(http, req.user, req.query);
		res.render('schedule', { page: 'Schedule', user: req.user, schedule });
	});
};