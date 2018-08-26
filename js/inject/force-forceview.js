chrome.storage.sync.get(['optDevForceview'], function(result) {

	if (result.optDevForceview) {
		if (location.href.match(/https*:\/\/[0-9]{1,5}(\.logicommerce\.net|\.igd\.production)/)) {
			if (!document.cookie.includes('FORCEVIEW=1')) {
				location = location.href + '?forceview=1'
			}
		}
	}

});