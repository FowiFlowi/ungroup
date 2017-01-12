logger = require('./log')(module);

module.exports = function (io) {
	io.sockets.once('connection', (socket) => {
		let time = (new Date).toLocaleTimeString(),
			ID = socket.id.toString().substr(0, 5);
		logger.info('New user connected: ' + ID);

		socket.emit('connected', {'name': ID, 'time': time});
		socket.broadcast.emit('userJoined', {'name': ID, 'time': time});

		socket.on('message', (msg) => {
			let time = (new Date).toLocaleTimeString();
			logger.debug(msg.message);
			socket.emit('messageSent', {'name': ID, 'time': time, 'text': msg.message});
			socket.broadcast.emit('messageReceived', {'name': ID, 'time': time, 'text': msg.message});
		});

		socket.on('disconnect', () => {
			let time = (new Date).toLocaleTimeString();
			io.sockets.emit('userSplit', {'name': ID, 'time': time});
			logger.info('User ' + ID + ' disconnected');
		});
	});
}