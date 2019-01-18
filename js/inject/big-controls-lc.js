chrome.storage.sync.get({ optLcBigControls: defaults.optLcBigControls }, function(result) {
	
	if (result.optLcBigControls && !$('#loginForm').length) {
		
		$('html').addClass('big-controls');

	}

});