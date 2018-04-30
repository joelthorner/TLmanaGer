var DEFAULTS = {
	optBgLc : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35464e00bbef1a93e6958980d587acb5&auto=format&fit=crop&w=1950&q=80",
	optProfilePhoto : "../../img/iceberg.svg",
	userName : 'john.doe'
};

function aplyUsernameOpt(value){
	$('#opt-userName').val(value);
	$('body').removeClass('orto andrea');
	$('#userNameRes').html(value);

	value = $.trim(value).toLowerCase();

	switch (value){
		case "joel.torner": 
			$('body').addClass('jt');
		break;
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

function aplyProfilePhotoOpt(value){
	if ($('#options-body').length) {
		$('#options-body .opt-profile-set').removeClass('selected');
		$('#options-body img[src="' + value + '"]').parents('button').addClass('selected');
	}
}

// init options ------------------------------------------------------------------------------------------------
chrome.storage.sync.get(['optBgLc'], function(result) {
	var value = result.optProfilePhoto;
	if ($.type(value) == 'undefined' || $.trim(value).length == 0){

		value = $('#opt-bg-lc').val();
		if ($.type(value) == 'undefined' || $.trim(value).length == 0)
			value = DEFAULTS.optBgLc;

		chrome.storage.sync.set({optBgLc: value }, function() {
			$('#opt-bg-lc').val(result.optBgLc);
		});
	}else{
		$('#opt-bg-lc').val(result.optBgLc);
	}
});
chrome.storage.sync.get(['optProfilePhoto'], function(result) {
	var value = result.optProfilePhoto;
	if ($.type(value) == 'undefined' || $.trim(value).length == 0){

		value = $('.opt-profile-set.selected img').attr('src');

		if ($.type(value) == 'undefined' || $.trim(value).length == 0) 
			value = DEFAULTS.optProfilePhoto;

		chrome.storage.sync.set({optProfilePhoto: value }, function() {
			aplyProfilePhotoOpt(value);
		});
	}else{
		aplyProfilePhotoOpt(value);
	}
});
chrome.storage.sync.get(['userName'], function(result) {
	var value = result.userName;
	if ($.type(value) == 'undefined' || $.trim(value).length == 0){

		value = $.trim($('#opt-userName').val());
		if ($.type(value) == 'undefined' || $.trim(value).length == 0) 
			value = DEFAULTS.userName;

		chrome.storage.sync.set({userName: value }, function() {
			aplyUsernameOpt(value);
		});
	}else{
		aplyUsernameOpt(result.userName);
	}
});
// end init options --------------------------------------------------------------------------------------------