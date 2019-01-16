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
	
	var defaults = {
		optProfileEmail: chrome.i18n.getMessage("popupOptionEmailDefault"), 
		optProfileAvatar: 'img/logo.svg'
	};

	chrome.storage.sync.get(defaults, function(result) {
		$('.profile').attr('src', chrome.extension.getURL(result.optProfileAvatar));
		$('.name-user').text(result.optProfileEmail);
	});
	
});
