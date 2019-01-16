console.log(chrome.i18n.getMessage("removeGuideLines_consoleLog"));

Cookies.set('add-guide-lines-active', '0');

$('#g-container, #g-container-2, #g-middle, #g-style')
	.remove();