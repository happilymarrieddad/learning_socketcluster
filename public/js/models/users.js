$(function() {

	var display = {};

	observe('bind',function() {

		display.tbody = $('#users-table');

	});

	observe('start',function() {
		
	});

	observe('build-users',function() {
		notify('server',{
			route:'Users',
			resource:'index'
		});
	});

	observe('users-index',function(data) {
		var users = data.users;

		display.tbody.empty().html(templatizer['users']({
			users:users
		}));

		$('section[data-route="users"]').show();
		notify('finish-loading');
	});
	
});