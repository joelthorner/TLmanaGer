var DEFAULTS = {
	optBgLc : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35464e00bbef1a93e6958980d587acb5&auto=format&fit=crop&w=1950&q=80",
	optProfilePhoto : "../../img/iceberg.svg"
}

// init options ------------------------------------------------------------------------------------------------
chrome.storage.sync.get(['optBgLc'], function(result) {
	if ($.type(result.optBgLc) == 'undefined'){
		var value = $('#opt-bg-lc').val();
		if ($.type(value) == 'undefined') value = DEFAULTS.optBgLc;

		chrome.storage.sync.set({optBgLc: value }, function() { });
	}else{
		$('#opt-bg-lc').val(result.optBgLc);
	}
});
chrome.storage.sync.get(['optProfilePhoto'], function(result) {
	if ($.type(result.optProfilePhoto) == 'undefined') {
		var value = $('.opt-profile-set.selected img').attr('src');
		if ($.type(value) == 'undefined') value = DEFAULTS.optProfilePhoto;

		chrome.storage.sync.set({optProfilePhoto: value }, function() {});
	}else{
		if ($('#options-body').length) {
			$('#options-body .opt-profile-set').removeClass('selected');
			$('#options-body img[src="'+result.optProfilePhoto+'"]').parents('button').addClass('selected');
		}
	}
});
// end init options --------------------------------------------------------------------------------------------