let http = require('http'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	middleware = require('./middleware')(app, express, server),
	config = require('./config');

server.listen(config.get('port'), () => {
	console.log('Express server is listening on port ' + config.get('port'));
});