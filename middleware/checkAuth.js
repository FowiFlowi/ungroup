module.exports = function(req, res, next) {
	if (req.url == '/' || req.url == '/home')
		next();
	else
		res.render('auth.jade');
}