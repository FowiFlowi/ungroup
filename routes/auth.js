let passport = require('passport');

module.exports = function (app) {
	app.get('/sign-out', (req, res) => {
		req.logout();
		res.redirect('/home');
	});

	app.get('/auth/vk', passport.authenticate('vk', { scope: ['frineds', 'status'] }), (req, res) => {  });

	app.get('/auth/vk/callback', passport.authenticate('vk', { failureRedirect: '/home' }), (req, res) => {
		res.redirect('/home');
	});
}