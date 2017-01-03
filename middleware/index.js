module.exports = function (app, express, server) {
	let path = require('path'),
		mongoose = require('mongoose'),
		router = require('../routes'),
		errorHandler = require('./errorHandler')(app, express),
		checkAuth = require('./checkAuth'),
		favicon = require('serve-favicon');


	app.disable('x-powered-by');								// off the waste http-head

	app.set('views', path.join(__dirname,'..', 'views'))
	app.set('views engine', 'jade');							// Page Rendering

	app.use(favicon('public/images/favicon.ico')); 				// Favicon

	app.use(express.static(path.join(__dirname, '..', 'public')));	// Public directory

	router(app, server);

	// // Logger
	// if (app.get('env') == 'developmnet') {
	// 	app.user(express.logger('dev'));
	// }

	// // Session
	// app.use(express.bodyParser());
	// app.use(express.cookieParser());
	// app.use(express.session({
	// 	secret: config.get('session:secret'),
	// 	key: config.get('session:key'),
	// 	cookie: config.get('session:cookie'),
	// 	store: new MongoStore({mongoose_connection: mongoose.connection})
	// }))

	// Authorization Access
	// app.use(checkAuth);

	// Routing
	// app.use(app.router);
	// router(app);

	// Public directory
	// app.use(express.static(path.join(__dirname, '../public')));
	// app.use('/public', express.static(path.join(__dirname, '../public')));
	
	// Error handing
	// app.use(errorHandler);
}