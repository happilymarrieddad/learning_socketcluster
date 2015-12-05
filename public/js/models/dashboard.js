$(function() {


	observe('bind',function() {

	});

	observe('start',function() {
		
	});

	observe('build-dashboard',function() {

		$('section[data-route="dashboard"]').show();
		notify('finish-loading');

	});

});