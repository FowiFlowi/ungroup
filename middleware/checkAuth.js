module.exports = function(req, res, next) {
	if (req.url.match(/^\/home/) || req.url.match(/^\//) || req.url.match(/^\/auth/))
		next();
	else {
		if (!req.isAuthenticated())
			res.render('errorAuth.jade');
		else 
			next();
	}
}