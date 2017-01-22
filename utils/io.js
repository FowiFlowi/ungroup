let logger = require('./log')(module),
	config = require('../config'),
	clients = {};

module.exports = function (server, user) {
	let io = require('socket.io')(server);

	io.on('connection', (socket) => {
		let time = (new Date).toLocaleTimeString(),
			name = user.nickname;
		logger.info('New user connected: ' + name);
		clients[socket.id] = socket;

		socket.emit('connected', { name, time });
		socket.broadcast.emit('userJoined', { name, time });

		socket.on('message', (msg) => {
			let time = (new Date).toLocaleTimeString();
			logger.debug(msg);
			socket.emit('messageSent', { name, time, text: msg });
			socket.broadcast.emit('messageReceived', { name, time, text: msg });
		});

		socket.on('disconnect', () => {
			delete clients[socket.id];
			let time = (new Date).toLocaleTimeString();
			socket.broadcast.emit('userSplit', { name, time });
			logger.info('User disconnected: ' + ID);
		})
	});
}