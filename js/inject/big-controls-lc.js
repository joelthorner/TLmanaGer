chrome.storage.sync.get({ optLcBigControls: true }, function(result) {
	
	if (result.optLcBigControls && !$('#loginForm').length) {
		
		$('html').addClass('big-controls');

	}

});