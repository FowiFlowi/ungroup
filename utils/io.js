let logger = require('./log')(module),
	config = require('../config'),
	clients = {};
	// WebSocketServer = new require('ws').Server,

module.exports = function (server) {
	let io = require('socket.io')(server);
		// socket = io.connect();

	io.on('connection', (socket) => {
		let time = (new Date).toLocaleTimeString(),
			ID = Math.trunc(Math.random() * 1001 + 1);
		logger.info('New user connected: ' + ID);
		clients[socket.id] = socket;

		socket.emit('connected', { name: ID, time });
		socket.broadcast.emit('userJoined', { name: ID, time });

		socket.on('message', (msg) => {
			let time = (new Date).toLocaleTimeString();
			logger.debug(msg);
			socket.emit('messageSent', { name: ID, text: msg, time });
			socket.broadcast.emit('messageReceived', { name: ID, text: msg, time });
		});

		socket.on('disconnect', () => {
			delete clients[socket.id];
			let time = (new Date).toLocaleTimeString();
			socket.broadcast.emit('userSplit', { name: ID, time });
			logger.info('User disconnected: ' + ID);
		})
	});

	// socket.on('connection', (socket) => {
	// 	let time = (new Date).toLocaleTimeString(),
	// 		ID = Math.trunc(Math.random() * 1001 + 1);
	// 	clients[ID] = socket;
	// 	logger.info('New user connected: ' + ID);

	// 	let connectedData = JSON.stringify({ event: 'connected', name: ID, time });
	// 	socket.send(connectedData);

	// 	let userJoinedData = JSON.stringify({ event: 'userJoined', name: ID, time });
	// 	for (let key in clients)
	// 		if (key != ID)
	// 			clients[key].send(userJoinedData);

	// 	socket.on('message', (msg) => {
	// 		msg = JSON.parse(msg);
	// 		let time = (new Date).toLocaleTimeString(),
	// 			messageSentData = JSON.stringify({ event: 'messageSent', name: ID, text: msg.message, time }),
	// 			messageReceivedData = JSON.stringify({ event: 'messageReceived', name: ID, text: msg.message, time });

	// 		socket.send(messageSentData);
	// 		logger.debug(msg.message);
	// 		for (let key in clients)
	// 			if (key != ID)
	// 				clients[key].send(messageReceivedData);
	// 	});

	// 	socket.on('close', () => {
	// 		let time = (new Date).toLocaleTimeString(),
	// 			userSplitData = JSON.stringify({ event: 'userSplit', name: ID, time });
			
	// 		for (let key in clients) {
	// 			if (key != ID)
	// 				clients[key].send(userSplitData);
	// 		};

	// 		delete clients[ID];
	// 		logger.info('User disconnected: ' + ID);
	// 	})
	// });
}