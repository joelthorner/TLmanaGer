chrome.storage.sync.get(['optDevForceview'], function(result) {

	if (typeof result.optDevForceview == 'undefined') result.optDevForceview = true;

	if (result.optDevForceview) {
		if (location.href.match(/https?:\/\/(www)?\.?[0-9]{2,5}(\.logicommerce\.net|\.igd\.(pre\.)?production)\/?/)) {
			if (!document.cookie.toUpperCase().includes('FORCEVIEW=1')) {
				if (!location.href.toUpperCase().includes('FORCEVIEW')) {
					if (location.href.includes('?')) {
						window.location = window.location.href + '&forceview=1'
					} else {
						window.location = window.location.href + '?forceview=1'
					}
				}
			}
		}
	}

});