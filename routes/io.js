module.exports = function (server) {
	io = require('socket.io').listen(server);

	io.sockets.on('connection', (socket) => {
		let time = (new Date).toLocaleTimeString(),
			ID = socket.id.toString().substr(0, 5);
		console.log('New user connected: ' + ID);

		socket.emit('connected', {'name': ID, 'time': time});
		socket.broadcast.emit('userJoined', {'name': ID, 'time': time});

		socket.on('message', (msg) => {
			let time = (new Date).toLocaleTimeString();
			console.log(msg.message + ' : ' + time);
			socket.emit('messageSent', {'name': ID, 'time': time, 'text': msg.message});
			socket.broadcast.emit('messageReceived', {'name': ID, 'time': time, 'text': msg.message});
		});

		socket.on('disconnect', () => {
			let time = (new Date).toLocaleTimeString();
			io.sockets.emit('userSplit', {'name': ID, 'time': time});
			console.log('User ' + ID + ' disconnected\n');
		});
	});
}