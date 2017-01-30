let logger = require('../utils/log')(module),
	auth = require('./auth'),
	VK = new (require('node-vkapi'));

module.exports = function (app, server) {
	auth(app);
	
	app.get('/', (req, res) => {
		res.status(200).redirect('/home');
	});

	app.get('/home', (req, res) => {
		res.render('home', { page: 'Home', user: req.user });
	});

	app.get('/chat', (req, res) => {
		let io = require('../utils/io')(server, req.user);
		res.render('chat', { page: 'Chat', user: req.user });
	});

	app.get('/user', (req, res) => {
		let user = req.user,
			personalData = {};

		VK.call('photos.get', {
			owner_id: user.vkId,
			album_id: 'profile',
			accessToken: user.accessToken
		}).then(profiePhotos => {
			let len = profilePhotos.items.length,
				photo = profilePhotos.items[len - 1].photo_604;

			return photo;
		}).then(photo => {
			personalData.photo = photo;

			return VK.call('status.get', {
				user_id: user.vkId
			})
		}).then(status => {
			personalData.status = status.text;
		}).catch(err => {
			logger.error(err);
		});
		console.log(personalData);

		res.render('user', { page: req.user.nickname, user: req.user, personalData });
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

	app.get('/schedule', (req, res) => {
		let getSchedule = require('../models/schedule')(req.user, req.query);
		getSchedule((err, schedule) => {
			err ? logger.error(err) : res.render('schedule', { page: 'Schedule', user: req.user, schedule });
		})
	});
};