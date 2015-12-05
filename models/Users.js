var Users = {};
var async = require('async');

Users.upload = function(client,pool,data) {
	var results = {
		success:0,
		message:'Failed to store the file',
		notify:data.notify
	};

	function finish() {
		client.emit('response',results);
	}

	async.series([
		function(callback) {
			var updateImage = 'UPDATE users SET image = LOAD_FILE("' + data.filepath + '") WHERE id = ?';
			pool.query(updateImage,[data.user_id],function(err,rows) {
				if (err) {
					console.log(err);
					console.log("Failed to update image.");
				}
				callback();
			});
		},
		function(callback) {
			var getImageData = 'SELECT image FROM users WHERE id = ?';
			pool.query(getImageData,[data.user_id],function(err,rows) {
				if (err) {
					console.log(err);
					console.log('Failed to get image data.');
				} else {
					results.image = (rows.length ? ('data:image/jpeg;base64,' + (new Buffer(rows[0].image).toString('base64'))) : null);
				}
				callback();
			});
		}
	],finish);
}

Users.getProfile = function(client,pool,data) {
	var results = {
		success:0,
		message:'Failed to get user data',
		notify:'users-getProfile'
	};

	function finish() {
		client.emit('response',results);
	}

	async.series([
		function(callback) {
			var getUserData = 'SELECT * FROM users WHERE id = ?';
			pool.query(getUserData,[data.id],function(err,rows) {
				if (err) {
					console.log(err);
					console.log('Failed to get user data.');
				} else {
					results.user = rows[0];
					results.user.image = (results.user.image ? ('data:image/jpeg;base64,' + (new Buffer(results.user.image).toString('base64'))) : null);
					results.success = 1;
					results.message = 'Successfully grabbed data.';
				}
				callback();
			});
		}
	],finish);
}

Users.index = function(client,pool,data) {
	var results = {
		success:0,
		message:'Failed to get users',
		notify:'users-index'
	};

	function finish() {
		client.emit('response',results);
	}

	async.series([
		function(callback) {
			var getAllUsers = 'SELECT * FROM users';

			pool.query(getAllUsers,function(err,rows) {
				if (err) {
					console.log(err);
					console.log(getAllUsers);
					console.log('Failed to get users.');
				} else {
					results.users = rows;
				}
				callback();
			});
		}
	],finish);
}

module.exports = Users;