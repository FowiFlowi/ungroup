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


		User.findOne({ vkId: profile.id }, (err, user) => {
			if (err) {
				logger.error(err);
				return done(err);
			}
			if (!user) {
				let query = req.query,
					userData = {
						vkId: profile.id,
						nickname: query.nickname,
						groupNumber: query['group-number'],
						username: profile.displayName,
						photoUrl: profile.photos[0].value,
						profileUrl: profile.profileUrl
					};
				console.log(query.nickname, '<<THERE!', req.query);
				user = new User(userData);
				user.save((err) => {
					if (err) 
						logger.error(err);
					else 
						logger.info('New user ' + profile.displayName + ' has auth');
					return done(err, user);
				})
			} else {
				logger.info('User ' + user.nickname + ' logged on');
				return done(err, user);
			}
		})


		// User.findOrCreate(userData, (err, user) => {
		// 	done(err, user);
		// });

		// done(null, {								// ===> findOrCreate
		// 	username: profile.displayName,
		// 	photoUrl: profile.photos[0].value,
		// 	profileUrl: profile.profileUrl
		// });

	}));

	passport.serializeUser((user, done) => {
		done(null, user.vkId);
	});

	passport.deserializeUser((vkId, done) => {
		console.log(user, 'THERE');
		User.findOne({ vkId }, (err, user) => {
			done(err, user);
		})
		// try {									// ====> findById
		// 	done(null, id);
		// } catch(err) {
		// 	done(err);
		// }
	});
};