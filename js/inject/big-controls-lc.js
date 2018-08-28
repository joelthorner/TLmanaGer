chrome.storage.sync.get(['optLcBigControls'], function(result) {

	if (typeof result.optLcBigControls == 'undefined') result.optLcBigControls = true;

	if (result.optLcBigControls && !$('#loginForm').length) {
		
		$('html').addClass('big-controls');

	}

});