let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	config = require('../config'),
	logger = require('../utils/log')(module),
	User = new require('../models/user');

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
			}
			if (!user) {
				let query = session.query,
					userData = {
						vkId: profile.id,
						nickname: query.nickname,
						group: query.group,
						username: profile.displayName,
						photoUrl: profile.photos[0].value,
						profileUrl: profile.profileUrl
					};
				user = new User(userData);
				user.save((err) => {
					if (err) 
						logger.error(err);
					else 
						logger.info('AUTH: New user ' + profile.displayName + ' has auth');
					return done(err, user);
				})
			} else {
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