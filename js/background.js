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

	if (callback !== null) callback(); // execute outermost function
}

// Popup actions
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (typeof request.directive !== 'undefined') {
			switch (request.directive) {
				case 'testing-signup':
					executeScripts(null, [
						{ file: 'js/libs/moment.js' },
						{ file: 'js/actions/testing-signup.js' }
					])
					break;
				default:
					executeScripts(null, [
						{ file: 'js/actions/' + request.directive + '.js' }
					])
					break;
			}
		}
	}
);

// External actions
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	if (request) {
		if (request.message) {
			if (request.message == 'version') {
				sendResponse({ version: manifestData.version });
			}
		}
	}
	return true;
});

// new version notify
var opt = {
	type: 'basic',
	title: chrome.i18n.getMessage('newVersionNotify_title').replace('%version%', manifestData.version),
	iconUrl: '../img/logo.svg',
	message: chrome.i18n.getMessage('newVersionNotify_desc'),
	priority: 1,
	buttons: [
		{ title: chrome.i18n.getMessage('close') },
		{ title: chrome.i18n.getMessage('viewChanges') }
	]
};

chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == 'install') {
		chrome.tabs.create({
			url: chrome.extension.getURL('/src/install/index.html')
		});
	} else if (details.reason == 'update') {
		chrome.notifications.create('newVersion-' + manifestData.version, opt, function () {
			chrome.storage.sync.set({
				newVersionNotify: manifestData.version
			});
		});

		chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
			if (notificationId == 'newVersion-' + manifestData.version && buttonIndex == 1) {
				chrome.tabs.create({
					url: chrome.extension.getURL('/src/options/index.html') + '#changelog'
				});
			}
		});

		chrome.browserAction.setBadgeText({ text: '!' });
		chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0068' });
	}
});

chrome.runtime.onMessage.addListener(function (message, sender) {
	if (message.sendBack) {
		chrome.tabs.sendMessage(sender.tab.id, message.data);
	}
});