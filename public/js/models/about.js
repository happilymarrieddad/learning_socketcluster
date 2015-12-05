$(function() {


	observe('bind',function() {

	});

	observe('start',function() {
		
	});

	observe('build-about',function() {

		$('section[data-route="about"]').show();
		notify('finish-loading');

	});
	
});