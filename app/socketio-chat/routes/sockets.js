var io = require('socket.io');

exports.initialize = function(server){
	io = io.listen(server);
	io.set('origins', '*:*');
	var self = this;
	var ListName = {};
	var roomID = {}
	self.chatInfra = io.of('chat_infra');
	self.chatCom = io.of("/chat_com");

	self.chatInfra.on('connection',function(socket){

		socket.on('get_rooms',function(){
			var data = {};
			// for(var room in io.sockets.adapter.rooms){

			// 	var clients_in_the_room = io.sockets.adapter.rooms[room];
			// 	console.log(clients_in_the_room);
				// for (var clientId in clients_in_the_room ) {
				// 	console.log('client: %s', clientId); //Seeing is believing
				//     var client_socket = io.sockets.connected[clientId];//Do whatever you want with this
				//     console.log(client_socket); //Seeing is believing

				// }
				// if(room.indexOf("/chat_infra/") == 0){
				// 	var roomName = room.replace("/chat_infra/", "");
				// 	data[roomName] = io.sockets.manager
				// 	data[room] = 1;
				// }
			// }
			// console.log("hellloSS");
			// console.log(io.sockets.sockets);
			// socket.emit('room_lists',data);
		});


		socket.on('set_name',function(data){
			console.log(JSON.stringify(data));
			socket.emit('name_set',data);

			ListName[socket.id] = data.name;
			socket.send(JSON.stringify({
				type:'serverMessage',
				message:'Wel come to the mosting chatroom'
			}));
			// socket.broadcast.emit('user_entered', data);
			// console.warn(socket);

		});

		socket.on("join_room", function (room) {

			socket.join(room.name);
				// self.chatCom.sockets.join(room.name);
				roomID[socket.id] = room.name
				var comSocket = self.chatCom.sockets[socket.id];
				// console.log("===================");
				// console.log(self.chatCom.sockets);
				// comSocket.join(room.name);
				// comSocket.room = room.name;
				socket.broadcast.to(room.name).emit('user_entered', {'name':ListName[socket.id]});
			});
	});


self.chatCom.on("connection", function (socket){
	socket.on('message',function(message){
		message = JSON.parse(message);
		if(message.type == 'userMessage'){

				// socket.get('nickname',function(err,nickname){
					message.username = ListName[socket.id];
					message.type = 'myMessage';
					// socket.join(roomID[socket.id]);
					// io.sockets.in(roomID[socket.id]).emit('user_sendmessage', message);
					socket.in(roomID[socket.id]).broadcast.emit('user_sendmessage', message);
					// io.sockets.in(roomID[socket.id]).emit('user_sendmessage', message);
				// socket.emit('message',messages)
				socket.send(JSON.stringify(message));
				// });
			// socket.send(JSON.stringify(message));

		}
	});

	// io.set('origins', 'http://localhost:3000');
	// io.sockets.on('connection',function(socket){
	// 	socket.send(JSON.stringify({
	// 		type:'serverMessage',
	// 		message:'Welcome to the most interesting chat rooom on earth!'
	// 	}));

		// socket.on('message',function(message){
		// 	message = JSON.parse(message);
		// 	if(message.type == 'userMessage'){

		// 		// socket.get('nickname',function(err,nickname){
		// 			message.username = socket.nickname;
		// 			message.type = 'myMessage';
		// 		// socket.emit('message',messages)
		// 			socket.send(JSON.stringify(message));
		// 			socket.broadcast.emit('user_sendmessage', message);
		// 		// });
		// 	// socket.send(JSON.stringify(message));

		// }
	// });

	// 	socket.on('set_name',function(data){
	// 		console.log(JSON.stringify(data));
	// 		socket.emit('name_set',data);

	// 		socket.nickname = data.name;
	// 		// socket.set('nickname',data.name,function(){
	// 		// 	socket.emit('name_set',data);
	// 		socket.send(JSON.stringify({
	// 			type:'serverMessage',
	// 			message:'Wel come to the mosting chatroom'
	// 		}));
	// 		socket.broadcast.emit('user_entered', data);
	// 		// 	console.log(JSON.stringify(data));
	// 		// });
	// });

});
}
