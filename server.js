let http = require('http'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	middleware = require('./middleware')(app, express, io),
	config = require('./config');

server.listen(config.get('port'), () => {
	console.log('Express server is listening on port ' + config.get('port'));
});