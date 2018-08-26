chrome.storage.sync.get(['optDevForceview'], function(result) {

	if (result.optDevForceview) {
		if (!document.cookie.includes('FORCEVIEW=1')) {
			location = location.href + '?forceview=1'
		}
	}

});