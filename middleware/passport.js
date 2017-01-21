let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	config = require('../config'),
	logger = require('../utils/log')(module),
	User = new require('../models/user');

module.exports = function (req) {
	passport.use('vk', new VkStrategy({

		clientID: config.get('auth:vk:app_id'),
		clientSecret: config.get('auth:vk:secret'),
		callbackURL: config.get('app:url') + '/auth/vk/callback'

	}, (accessToken, refreshToken, profile, done) => {

		logger.info('vk auth: ' + profile.displayName);
		let userData = {
			vkId: profile.id,
			query: req.query,
			username: profile.displayName,
			photoUrl: profile.photos[0].value,
			profileUrl: profile.profileUrl
		};

		User.findOrCreate(userData, (err, user) => {
			done(err, user);
		});

		// done(null, {								// ===> findOrCreate
		// 	username: profile.displayName,
		// 	photoUrl: profile.photos[0].value,
		// 	profileUrl: profile.profileUrl
		// });

	}));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((user, done) => {
		User.findById(user.vkId, (err, user) => {
			done(err, user);
		})
		// try {									// ====> findById
		// 	done(null, id);
		// } catch(err) {
		// 	done(err);
		// }
	});
};