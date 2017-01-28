let http = require('http'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	middleware = require('./middleware')(app, express, server),
	config = require('./config'),
	logger = require('./utils/log')(module),
	PORT = process.env.PORT || config.get('port');

server.listen(PORT, () => {
	logger.info('Express server is listening on port ' + PORT);
});