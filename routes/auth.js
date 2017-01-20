let passport = require('passport');

module.exports = function (app) {
	app.get('/sigh-out', (req, res) => {
		req.logout();
		res.redirect('/home');
	});

	app.get('/auth/vk', passport.authenticate('vk', { scope: ['frineds'] }), (req, res) => {  });

	app.get('/auth/vk/callback', passport.authenticate('vk', { failureRedirect: '/home' }), (req, res) => {
		res.redirect('/home');
	});
}