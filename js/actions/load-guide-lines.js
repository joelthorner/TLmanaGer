$(function() {
	var cookie = Cookies.get('add-guide-lines-active');
	
	if (typeof cookie == 'undefined') cookie = 0;

	if (parseInt(cookie) == 1) {
		log(chrome.i18n.getMessage("loadGuideLines_consoleLog"));

		Cookies.set('add-guide-lines-active', '1');
		
		guideLines_add();
		guideLines_resize();
	}
});