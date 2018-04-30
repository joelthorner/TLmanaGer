var DEFAULTS = {
	optBgLc : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35464e00bbef1a93e6958980d587acb5&auto=format&fit=crop&w=1950&q=80",
	optProfilePhoto : "../../img/iceberg.svg",
	userName : 'joel.torner'
};

function aplyUsernameOpt(value){
	$('#opt-userName').val(value);
	$('body').removeClass('orto andrea');
	$('#userNameRes').html(value);

	value = $.trim(value).toLowerCase();

	switch (value){
		case "jordi.canizares": 
			$('body').addClass('cani');
		break;
		case "carlos.garcia": 
			$('body').addClass('carlos');
		break;
		case "cristina.ortega": 
			$('body').addClass('orto');
		break;
		case "andrea": 
			$('body').addClass('andrea');
		break;
	}
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
chrome.storage.sync.get(['userName'], function(result) {
	console.log(result.userName);
	if ($.type(result.userName) == 'undefined'){
		var value = $.trim($('#opt-userName').val());
		if ($.type(value) == 'undefined') value = DEFAULTS.userName;

		chrome.storage.sync.set({userName: value }, function() {
			aplyUsernameOpt(value);
		});
	}else{
		aplyUsernameOpt(result.userName);
	}
});
// end init options --------------------------------------------------------------------------------------------