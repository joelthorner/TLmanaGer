var manifestData = chrome.runtime.getManifest();

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
			case 'secret-hack':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/secret-hack.js" }
				])
				break;
			case 'show-svg-icons':
				executeScripts(null, [ 
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/show-svg-icons.js" }
				])
				break;
			case 'testing-signup':
				executeScripts(null, [ 
					{ file: "js/libs/moment.js" },
					{ file: "js/libs/jquery-3.3.1.min.js" },
					{ file: "js/actions/testing-signup.js" }
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
					sendResponse({ version: manifestData.version });
				}
			}
		}
		return true;
	}
);

// new version notify
var opt = {
	type: 'basic',
	title: chrome.i18n.getMessage("newVersionNotify_title").replace('%version%', manifestData.version),
	iconUrl: "../img/logo.svg",
	message: chrome.i18n.getMessage("newVersionNotify_desc"),
	priority: 1,
	buttons: [
		{ title: chrome.i18n.getMessage("close") },
		{ title: chrome.i18n.getMessage("viewChanges") }
	]
};

chrome.storage.sync.get({ newVersionNotify: false }, function(result) {

	if (manifestData.version != result.newVersionNotify) {
		chrome.notifications.create('newVersion-' + manifestData.version, opt, function() {
			chrome.storage.sync.set({
				newVersionNotify: manifestData.version
			});
		});
		
		chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
			if (notificationId == 'newVersion-' + manifestData.version && buttonIndex == 1) {
				chrome.tabs.create({ 
					url: chrome.extension.getURL("/src/options/index.html") + '#changelog'
				});
			}
		});

	}
});
