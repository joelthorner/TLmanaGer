$(function() {

	// load options
	chrome.storage.sync.get(defaults, function(result) {
		$('.profile').attr('src', chrome.extension.getURL(result.optProfileAvatar));
		$('.name-user').text(result.optProfileEmail);
	});
	
	$('[data-toggle="tooltip"]').tooltip();

	// init [add-guide-lines]
	chrome.tabs.query({ "status": "complete", "windowId": chrome.windows.WINDOW_ID_CURRENT, "active": true }, function(tab) {
		if (tab[0]) {	
			if (!tab[0].url.includes('chrome://')) {	
				chrome.cookies.get({ url: tab[0].url, name: 'add-guide-lines-active' }, function (cookie) {
					if (cookie) {
						var cookieVal = parseInt(cookie.value);
						
						if (cookieVal == 0) dataDirective = 'add-guide-lines';
						else if (cookieVal == 1) dataDirective = 'remove-guide-lines';
					} else {
						dataDirective = 'add-guide-lines';
					}

					$('#guide-lines-btn')
						.attr('data-directive', dataDirective)
						.parents('.item-grid')
						.addClass(function() { 
							if (dataDirective == 'remove-guide-lines') return 'active';
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
});
