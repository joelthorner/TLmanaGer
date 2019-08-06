$(function() {
	var cookie = Cookies.get('guideLines-active');
	
	if (typeof cookie == 'undefined') cookie = 0;

	if (parseInt(cookie) == 1) {
		log(chrome.i18n.getMessage("loadGuideLines_consoleLog"));

		Cookies.set('guideLines-active', '1');
		
		guideLines_add();
		guideLines_resize();
	}
});