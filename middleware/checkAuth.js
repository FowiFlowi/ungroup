module.exports = function(req, res, next) {
	if (req.url == '/' || req.url == '/home' || req.url.match(/^\/auth/))
		next();
	else
		res.render('errorAuth.jade');
}