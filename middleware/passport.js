let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	config = require('../config'),
	logger = require('../utils/log')(module);

passport.use('vk', new VkStrategy({

	clientID: config.get('auth:vk:app_id'),
	clientSecret: config.get('auth:vk:secret'),
	callbackURL: config.get('app:url') + '/auth/vk/callback'
	
}, (accessToken, refreshToken, profile, done) => {
	logger.info('vk auth: ' + profile);
	return done(null, {
		username: profile.displayName,
		photoUrl: profile.photos[0].value,
		profileUrl: profile.profileUrl
	});
}));

passport.serializeUser((user, done) => {
	done(null, JSON.stringify(user));
});

passport.deserializeUser((data, done) => {
	try {
		done(null, JSON.parse(data));
	} catch(err) {
		done(err);
	}
});

module.exports = function (app) {
};