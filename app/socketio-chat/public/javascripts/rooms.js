// var chatInfra = io.connect('http://localhost:3000/chat_infra');

chatInfra.on('connect',function(){
	chatInfra.emit('get_rooms',{});
	chatInfra.on("room_lists",function(data){
		console.log("111================");

		for(var room in data){
			var roomDiv = '<div class="room_div"><span class="room_name">'
			+ room + '</span><span class="room_users">[ '
			+ data[room] + ' Users ] </span>'
			+ '<a class="room" href="/chatroom?room=' + room
			+ '">Join</a></div>';
			$('div#rooms_list').append(roomDiv);
		}
	});
});
$(function(){
	$('#new_room_btn').click(function(){
		window.location = '/chatroom?room=' +
		$('#new_room_name').val();
	});
});
