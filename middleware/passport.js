let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	config = require('../config'),
	logger = require('../utils/log')(module),
	User = new require('../models/user'),
	StudentList = require('../models/studentList');

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

			StudentList.findOne({ name:  query.name}, (err, group) => { // check list
				let list = group.list,
					flag = false;

				for (let i = 0; i < list.length; i++)
					if (list[i] == profile.id) {
						flag = true;
						break;
					}

				if (!flag) {
					logger.info('AUTH: User ' + profile.displayName + ' is not locate in group ' + query.group);
					done();
				}
			})

			if (!user && session.query) {
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
					err ? logger.error(err) : logger.info('AUTH: New user '+profile.displayName+' has registered');
					return done(err, user);
				})
			} else {
				if (!session.query) {
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