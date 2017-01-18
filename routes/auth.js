let passport = require('passport');

module.exports = function (app) {
	app.get('/auth', (req, res) => {
		if (req.isAuthenticated()) {
			res.redirect('/');
			return;
		};
		res.render('auth.jade', { error: req.flash('error') });
	});

	app.get('/sigh-out', (req, res) => {
		req.logout();
		res.redirect('/home');
	});

	app.get('/auth/vk', passport.authenticate('vk', { scope: ['frineds'] }), (req, res) => {  });

	app.get('/auth/vk/callback', passport.authenticate('vk', { failureRedirect: '/auth' }), (req, res) => {
		res.redirect('/home');
	});
}