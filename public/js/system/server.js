$(function() {

	var socket = socketCluster.connect();

	socket.on('response',function(data) {
		notify(data.notify,data);
	});

	observe('server',function(data) {
		socket.emit('messages',data);
	});

});