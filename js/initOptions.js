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
	console.log(value.indexOf('joel.torner'));

	if (value.indexOf('joelthorner') !== -1 || value.indexOf('torner') !== -1) {
		$('body').addClass('jt');
	}else if(value.indexOf('jordi.canizares') !== -1 || value.indexOf('canizares') !== -1){
		$('body').addClass('cani');
	}else if(value.indexOf('carlos') !== -1 || value.indexOf('carlos.garcia') !== -1){
		$('body').addClass('carlos');
	}else if(value.indexOf('andrea') !== -1 || value.indexOf('sanabria') !== -1){
		$('body').addClass('andrea');
	}else if(value.indexOf('cristina.ortega') !== -1 || value.indexOf('ortega') !== -1){
		$('body').addClass('orto');
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
	var value = result.optBgLc;
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