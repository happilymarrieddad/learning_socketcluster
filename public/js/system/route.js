$(function() {

	observe('bind',function() {

		function routerMiddleware() {
			notify('start-loading');
			$('section').hide();
			var hash = window.location.hash.slice(2);
			if (hash) {
				if (isNaN(hash[hash.length-1])) {
					notify('build-' + hash);
				}
				else {
					// must be an edit so it uses the function below
				}
			} else {
				notify('build-dashboard');
			}
		}

		// Route Functions
		var dashboard = function() {};
		var about = function() {};
		var users = function() {};
		var profile = function() {};

		var routes = {
			'/dashboard': dashboard,
			'/about': about,
			'/users': users,
			'/profile': profile
		};

		var router = Router(routes);

		router.configure({
			on: routerMiddleware
		});

		router.init();

		routerMiddleware();
	});

	observe('start-loading',function() {
		$('.whole-page').hide();
		$('.loading-page').show();
	});

	observe('finish-loading',function() {
		$('.loading-page').hide();
		$('.whole-page').show();
	});

});