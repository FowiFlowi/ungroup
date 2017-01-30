let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	VK = new (require('node-vkapi')),
	config = require('../config'),
	logger = require('../utils/log')(module),
	User = new require('../models/user');

module.exports = function (session) {
	passport.use('vk', new VkStrategy({

		clientID: config.get('auth:vk:app_id'),
		clientSecret: config.get('auth:vk:secret'),
		callbackURL: config.get('app:url') + '/auth/vk/callback'

	}, (accessToken, refreshToken, profile, done) => {

		console.log(profile);
		// VK.call('photos.get', {
		// 	owner_id: profile.id,
		// 	album_id: 'profile',
		// 	accessToken
		// }).then(res => {
		// 	console.log(res);
		// });

		User.findOne({ vkId: profile.id }, (err, user) => {
			if (err) {
				logger.error(err);
				return done(err);
			}

			if (!user && session.query) {
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
					err ? logger.error(err) : logger.info('AUTH: New user '+ profile.displayName +' has registered');
					return done(err, user);
				})
			} else {
				if (!session.query) {
					logger.info('AUTH: User is not registered');
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