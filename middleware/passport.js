let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	config = require('../config'),
	logger = require('../utils/log')(module),
	User = new require('../models/user'),
	studentList = new require('../models/studentList');

module.exports = function (session) {
	passport.use('vk', new VkStrategy({

		clientID: config.get('auth:vk:app_id'),
		clientSecret: config.get('auth:vk:secret'),
		callbackURL: config.get('app:url') + '/auth/vk/callback'

	}, (accessToken, refreshToken, profile, done) => {

		User.findOne({ vkId: profile.id }, (err, user) => {
			if (err) {
				logger.error(err);
				return done(err);
			};
			let query = session.query;

			if (!user && query) {
				studentList.findOne({ name:  query.group}, (err, group) => { // check list
					if (err) logger.error(err);

					let list = group.list,
						flag = false;

					for (let i = 0; i < list.length; i++) {
						console.log(list[i]);
						if (list[i].vkRef == profile.id) {
							flag = true;
							break;
						}
					}
					if (!flag) {
						logger.info('AUTH: User ' + profile.displayName + ' is not located in group ' + query.group);
						return done();
					};

					let userData = {
						vkId: profile.id,
						nickname: query.nickname,
						group: query.group,
						username: profile.displayName,
						photoUrl: profile.photos[0].value,
						profileUrl: profile.profileUrl,
						accessToken: accessToken
					};
					user = new User(userData);
					user.save(err => {
						err ? logger.error(err) 
							: logger.info('AUTH: New user ' + profile.displayName + ' has registered from ' + query.group);
						return done(err, user);
					})
				});
			} else {
				if (!query) {
					logger.info('AUTH: User ' + profile.displayName + ' is not registered');
					return done();
				}

				logger.info('AUTH: User ' + user.nickname + ' logged on');
				return done(err, user);
			}
		})
	}));

	passport.serializeUser((user, done) => {
		done(null, user.vkId);
	});

	passport.deserializeUser((vkId, done) => {
		User.findOne({ vkId }, (err, user) => {
			done(err, user);
		})
	});
};