let passport = require('passport'),
	VkStrategy = require('passport-vkontakte').Strategy,
	config = require('../config'),
	logger = require('../utils/log')(module);

passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {
        if (username == "admin" && password == "admin") {
            return done(null, {
                username: "admin",
                photoUrl: "url_to_avatar",
                profileUrl: "url_to_profile"
            });
        };
        return done(null, false, { 
            message: 'Неверный логин или пароль' 
        });
    };
));

passport.use('vk', new VkStrategy({
	clientID: cinfig.get('auth:vk:app_id'),
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
	} catch {
		done(err);
	}
});

module.exports = function (app) {
};