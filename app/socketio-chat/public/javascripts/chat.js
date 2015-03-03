// var socket = io.connect('http://localhost:3000');
var chatInfra = io.connect('http://localhost:3000/chat_infra'),
chatCom = io.connect('http://localhost:3000/chat_com');
// socket.on('connect', function(){
// 	console.log("connect");
// });

// socket.on('message',function(data){
// 	data = JSON.parse(data);
// 	console.log("sending.... " + data);
// 	if(data.username){
// 		$('#messages').append('<div class="'+data.type+
// 			'"><span class="name">' +
// 			data.username + ":</span> " +
// 			data.message + '</div>');
// 	}else{
// 		$('#messages').append('<div class="'+data.type+'">' +
// 			data.message +
// 			'</div>');
// 	}
// });



// socket.on("user_sendmessage", function(user){
// 	$('#messages').append('<div class="'+user.type+
// 			'"><span class="name">' +
// 			user.username + ":</span> " +
// 			user.message + '</div>');
// });

// socket.on("user_entered", function(user){
// 	$('div#messages').append('<div class="systemMessage">' +
// 		user.name + ' has joined the room.' + '</div>');
// });

// socket.on('name_set',function(data){
// 	$('#nameform').hide();
// 	$('div#messages').append('<div class="systemMessage"'+ "Hello " + data.message +
// 		'</div>');
// })

// $(function(){
// 	$('#send').click(function(){
// 		var data = {
// 			message: $('#message').val(),
// 			type:'userMessage'
// 		};
// 		console.log(JSON.stringify(data));
// 		socket.send(JSON.stringify(data));
// 		$('#message').val('');
// 	});

// 	$('input#setname').click(function(){
// 		console.log('hello');
// 		socket.emit('set_name',{name: $('#nickname').val()});
// 	})
// });

chatInfra.on('connect',function(){
	chatInfra.emit('get_rooms',{});
	chatInfra.on("rooms_list",function(data){
		for(var room in data){
			var roomDiv = '<div class="room_div"><span class="room_name">'
			+ room + '</span><span class="room_users">[ '
			+ data[room] + ' Users ] </span>'
			+ '<a class="room" href="/chatroom?room=' + room
			+ '">Join</a></div>';
			console.log(data);
			$('div#rooms_list').append(roomDiv);
		}
	});
});

var roomName = decodeURI((RegExp("room" + '=' + '(.+?)(&|$)').exec(location.search)|| [, null])[1]);
console.log("===============================");

console.log(roomName);
if(roomName){
	chatInfra.on('name_set', function (data) {
		chatInfra.emit('join_room', {'name':roomName});

		chatInfra.on("user_entered", function (user) {
			$('div#messages').append('<div class="systemMessage">' + user.name
				+ ' has joined the room.' + '</div>');
		});
		chatInfra.on('message', function (message) {
			var message = JSON.parse(message);
			$('div#messages').append('<div class="' + message.type + '">'
				+ message.message + '</div>');
		});

		chatInfra.on("user_sendmessage", function(user){
			$('div#messages').append('<div class="'+user.type+
				'"><span class="name">' +
				user.username + ":</span> " +
				user.message + '</div>');
		});
		chatCom.on('message', function (message) {
			var message = JSON.parse(message);
			console.warn(message);
			$('div#messages').append('<div class="' +
				message.type + '"><span class="name">' +
				message.username + ':</span> ' +
				message.message + '</div>');
		});

		chatCom.on("user_sendmessage", function(user){
			$('div#messages').append('<div class="'+user.type+
				'"><span class="name">' +
				user.username + ":</span> " +
				user.message + '</div>');
		});
		$('#nameform').hide();
		$('div#messages').append('<div class="systemMessage">Hello ' + data.name + '</div>');
		$('#send').click(function () {
			var data = {
				message:$('#message').val(),
				type:'userMessage'
			};
			chatCom.send(JSON.stringify(data));
			$('#message').val('');
		});
	});
	$(function () {
		$('#setname').click(function () {
			chatInfra.emit("set_name", {name:$('input#nickname').val()});
		});
	});

}

$(function(){
	$('#new_room_btn').click(function(){
		window.location = '/chatroom?room=' +
		$('#new_room_name').val();
	});
});
