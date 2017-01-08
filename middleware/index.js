module.exports = function (app, express, server) { // io
	let path = require('path'),
		mongoose = require('mongoose'),
		router = require('../routes'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		cookieParser = require('cookie-parser'),
		MongoStore = require('connect-mongo')(session),
		mongoCon = require('../utils/mongoose'),
		config = require('../config'),
		logger = require('../utils/log')(module),
		passport = require('passport'),
		flash = require('connect-flash'),
		favicon = require('serve-favicon');

	app.disable('x-powered-by');									// disable the unnecessery http-head

	app.set('views', path.join(__dirname,'..', 'views'))
	app.set('views engine', 'jade');

	// Application-level middleware
	app.use(favicon(__dirname + '/../public/images/favicon.ico')); 	// Favicon
	app.use((req, res, next) => {									// log request
		logger.info(req.method, req.url);
		next();
	});
	app.use(express.static(path.join(__dirname, '..', 'public')));	// Public directory
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(session({
		secret: config.get('session:secret'),
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({
			mongooseConnection: mongoCon.connection
		})
	}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	// Authorization Access
	// app.use(checkAuth);

	// Router-level middleware
	router(app, server);
	
	// Error-handing middleware
	app.use((req, res, next) => {
		if (!(req.url).match(/io.js$/)) {
			console.log('WHYY');
			let err = new Error('Not Found');
			err.status = 404;
			logger.error(err);
			next(err);
		}
		next();
	});
	app.use((err, req, res, next) => {
		let status = err.status || 500;
		if (status == 500) {
			let error = new Error('Server error');
    		logger.error(error);
    	}
    	res.render('error.jade', { status });
	});
}