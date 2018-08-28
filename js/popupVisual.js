window.mdc.autoInit();

// tabs
new mdc.tab.MDCTab(document.querySelector('.mdc-tab'));
new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

$(function() {

	$('.mdc-tab').click(function(event) {
		var id =  $(this).data('target');
		$('.panel').removeClass('active');
		$(id).addClass('active');
	});

	chrome.storage.sync.get(['optProfileName', 'optProfileAvatar'], function(result) {

		if (typeof result.optProfileName == 'undefined') result.optProfileName = 'Booker DeWitt';
		if (typeof result.optProfileAvatar == 'undefined') result.optProfileAvatar = 'img/logo.svg';
		
		$('.profile').attr('src', chrome.extension.getURL(result.optProfileAvatar));
		$('.name-user').text(result.optProfileName);
	});
	
});