function executeScripts(tabId, injectDetailsArray) {
	function createCallback(tabId, injectDetails, innerCallback) {
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}
	var callback = null;
	for (var i = injectDetailsArray.length - 1; i >= 0; --i)
		callback = createCallback(tabId, injectDetailsArray[i], callback);

	if (callback !== null)
		callback(); // execute outermost function
}

// Popup actions
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		switch (request.directive) {
			case 'add-guide-lines':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/libs/js.cookie.js" },
					{ file: "js/actions/add-guide-lines.js" }
				])
				break;
			case 'remove-guide-lines':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/libs/js.cookie.js" },
					{ file: "js/actions/remove-guide-lines.js" }
				])
				break;
			case 'refresh-get-img':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/refresh-get-img.js" }
				])
				break;
			case 'show-new-templates-2018':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/show-new-templates-2018.js" }
				])
				break;
			case 'get-ftp-settings':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/get-ftp-settings.js" }
				])
				break;
			case 'testing-tokenizr':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/testing-tokenizr.js" }
				])
				break;
			case 'testing-notifys':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/testing-notifys.js" }
				])
				break;
		}
	}
);

// External actions
chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		if (request) {
			if (request.message) {
				if (request.message == "version") {
					sendResponse({ version: "2.0.1" });
				}
			}
		}
		return true;
	}
);