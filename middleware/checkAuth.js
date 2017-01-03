// let HttpError = require('../error').HttpError;

// module.exports = function (req, res, next) {
// 	if (!res.session.user) {
// 		return next(new HttpError(401, 'You are not authorized!'));
// 	}
// 	next();
// };