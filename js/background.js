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
						{ file: 'js/libs/moment.min.js' },
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
		var newVersionArr = manifestData.version.split('.'),
			newMainVersion = newVersionArr[0] + '.' + newVersionArr[1];

		chrome.storage.sync.get({ newVersionNotify: newMainVersion }, function (result) {
			var oldVersionArr = result.newVersionNotify.split('.'),
				oldMainVersion = oldVersionArr[0] + '.' + oldVersionArr[1];
	
			console.log(parseFloat(newMainVersion), parseFloat(oldMainVersion));
			if (parseFloat(newMainVersion) > parseFloat(oldMainVersion)) {
				chrome.notifications.create('newVersion-' + manifestData.version, opt);

				chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
					if (notificationId == 'newVersion-' + manifestData.version && buttonIndex == 1) {
						chrome.tabs.create({ url: chrome.extension.getURL('/src/options/index.html') + '#changelog' });
					}
				});
				
				chrome.browserAction.setBadgeText({ text: '!' });
				chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0068' });
			}
			chrome.storage.sync.set({ newVersionNotify: newMainVersion });
		});
	}
});

// TicketConsume system
function openTicketConsumeTab() {
	chrome.windows.create({
		url: 'http://192.168.110.109:12853/zdreports/rtm.cfm?TicketConsume=true',
		// url: 'https://joelthorner.github.io/temp/?TicketConsume=true',
		state: 'minimized'
	});
}
chrome.runtime.onMessage.addListener(function (message, sender) {
	if (message.name == 'openTicketConsumeTab') {
		openTicketConsumeTab()
	}
	if (message.name == 'dataTicketConsumeTab') {
		chrome.tabs.query({ url: '*://tlgcommercehelp.zendesk.com/*' }, function (tabs) {
			tabs.forEach(tab => {
				chrome.tabs.sendMessage(tab.id, { data: message.data });
				chrome.tabs.query({
					url: 'http://192.168.110.109:12853/zdreports/rtm.cfm?TicketConsume=true'
					// url: '*://joelthorner.github.io/temp/?TicketConsume=true'
				}, function (tabs) {
					tabs.forEach(tab => { chrome.tabs.remove(tab.id) });
				});
			});
		});
	}
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function (tab) {
		if (tab.url.includes("tlgcommercehelp.zendesk.com")) {
			chrome.storage.sync.get({ optZenTicketConsume: false }, function (result) {
				if (result.optZenTicketConsume) {
					openTicketConsumeTab()
				}
			});
		}
	});
});