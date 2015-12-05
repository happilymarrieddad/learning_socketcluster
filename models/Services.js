var Services = {};
var files = {};
var fs = require('fs');
var baseUrl = '/tmp/';

Services.uploadStart = function(client,pool,data) {
	var name = data.name;

	files[name] = {
		name:name,
		size:data.size,
		data:'',
		downloaded:0
	};

	var place = 0;

	// If the client has already started uploading the file this will ensure it starts from where it left off
	// and it won't restart...
	try {
		var stat = fs.statSync(baseUrl + name);
		if (stat.isFile()) {
			files[name].downloaded = stat.size;
			place = stat.size / 524288;
		}
	} catch(err) {}

	fs.open(baseUrl + name,'a',0777,function(err,fd) {
		if (err) {
			console.log(err);
			console.log('services-uploadStart fs.open error.');
		} else {
			files[name].handler = fd;
			client.emit('response', {
				success:1,
				message:'File Upload Started',
				notify:data.notify,
				msg: 'moredata',
				place: place,
				percent: 0,
				name:name
			});
		}
	});
}

Services.upload = function(client,pool,data) {
	var name = data.name;
	files[name].downloaded += data.data.length;
	files[name].data += data.data;
	if (files[name].downloaded == files[name].size) {
		fs.write(files[name].handler,files[name].data,null,'Binary',function(err,written) {
			var pack = {
				user_id:data.user_id,
				filepath:'/tmp/'+name,
				notify:'users-upload-create-finish'
			};
			require('./Users').upload(client,pool,pack);
			client.emit('response',{
				success:1,
				message:'File successfully uploaded',
				notify:data.notify,
				msg:'uploadingdone'
			});
		});
	} else if (files[name].data.length > 10485760) {
		fs.write(files[name].handler,files[name].data,null,'Binary',function(err,written) {
			files[name].data = ''; // Empty the buffer
			client.emit('response', {
				success:1,
				notify:data.notify,
				message:'File uploading...',
				msg:'moredata',
				place:files[name].downloaded / 524288,
				percent:(files[name].downloaded / files[name].size) * 100,
				name:name
			});
		});
	} else {
		client.emit('response', {
			success:1,
			notify:data.notify,
			message:'File uploading...',
			msg:'moredata',
			place:files[name].downloaded / 524288,
			percent: ((files[name].downloaded / files[name].size) * 100) || 0,
			name:name
		});
	}
}

module.exports = Services;