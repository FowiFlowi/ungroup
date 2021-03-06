module.exports = function (app, express, server) {
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
		favicon = require('serve-favicon'),
		checkAuth = require('./checkAuth'),
		authStrategy = require('./passport');

	app.set('views', path.join(__dirname,'..', 'views'))
	app.set('view engine', 'jade');

	// Application-level middleware
	app.use(favicon(__dirname + '/../public/images/favicon.ico'));	// Favicon
	app.use((req, res, next) => {	// logging request
		logger.info(req.method, req.url);
		next();
	});
	app.use(express.static(__dirname + '/../public'));	// Public directory
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
	app.use((req, res, next) => {
		if (req.url.match(/^\/auth\/vk\?/)) {
			req.session.query = req.query;
		};
		authStrategy(req.session);
		next();
	})
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(checkAuth);	// Authorization Access

	// Router-level middleware
	router(app, server);

	// Error-handing middleware
	app.use((err, req, res, next) => {
		console.log(err);
		if (err.message.indexOf('not found'))
			return next();
		logger.error(err.stack);
		res.status(500).render('error500');
	});

	app.use((req, res, next) => {
		res.status(404).render('error404');
	});
}