$(function() {

	// load options
	chrome.storage.sync.get(defaults, function(result) {
		$('.profile').attr('src', chrome.extension.getURL(result.optProfileAvatar));
		if (result.optProfileUsername.length) $('.name-user').text(result.optProfileUsername);
	});
	
	$('[data-toggle="tooltip"]').tooltip();

	// init [container guides]
	chrome.tabs.query({ "status": "complete", "windowId": chrome.windows.WINDOW_ID_CURRENT, "active": true }, function(tab) {
		if (tab[0]) {	
			if (!tab[0].url.includes('chrome://')) {	
				chrome.cookies.get({ url: tab[0].url, name: 'guideLines-active' }, function (cookie) {
					if (cookie) {
						var cookieVal = parseInt(cookie.value);
						
						if (cookieVal == 0) dataDirective = 'guideLines/add';
						else if (cookieVal == 1) dataDirective = 'guideLines/del';
					} else {
						dataDirective = 'guideLines/add';
					}

					$('#guide-lines-btn')
						.attr('data-directive', dataDirective)
						.parents('.item-grid')
						.addClass(function() { 
							if (dataDirective == 'guideLines/del') return 'active';
						})
				});
			}
		}
	});

	// default background action
	$('.runtime-action').click(function(event) {
		var directiveName = $(this).data('directive');

		// execute directive
		chrome.runtime.sendMessage({ directive: directiveName }, function(response) {
			this.close();
		});
	});

	// link open action
	$('.runtime-link').click(function(event) {
		var directiveName = $(this).data('directive');

		// execute directive
		var newURL = $(this).data('url');
		chrome.tabs.create({ url: newURL });
	});

	$('#new-tab-options, .header-popup .profile').click(function(event) {
		chrome.tabs.create({ url: chrome.extension.getURL("/src/options/index.html") });
	});

	$('.header-popup .profile').click(function(event) {
		chrome.tabs.create({ url: chrome.extension.getURL("/src/options/index.html") + '#profile' });
	});

	chrome.browserAction.getBadgeText({}, function (result) {
		if (result == '!') {
			chrome.browserAction.setBadgeText({ text: '' });
			chrome.tabs.create({
				url: chrome.extension.getURL('/src/options/index.html') + '#changelog'
			});
		}
	});
	
});
