
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {

    // TODO page install

    // chrome.tabs.create({
    // 	url: chrome.extension.getURL('/src/install/index.html')
    // });

  } else if (details.reason == 'update') {
    // TODO new notify on update extension installed

    // var newVersionArr = manifestData.version.split('.'),
    // 	newMainVersion = newVersionArr[0] + '.' + newVersionArr[1];

    // chrome.storage.sync.get({ newVersionNotify: newMainVersion }, function (result) {
    // 	var oldVersionArr = result.newVersionNotify.split('.'),
    // 		oldMainVersion = oldVersionArr[0] + '.' + oldVersionArr[1];

    // 	console.log(parseFloat(newMainVersion), parseFloat(oldMainVersion));
    // 	if (parseFloat(newMainVersion) > parseFloat(oldMainVersion)) {
    // 		chrome.notifications.create('newVersion-' + manifestData.version, opt);

    // 		chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
    // 			if (notificationId == 'newVersion-' + manifestData.version && buttonIndex == 1) {
    // 				chrome.tabs.create({ url: chrome.extension.getURL('/src/options/index.html') + '#changelog' });
    // 			}
    // 		});

    // 		chrome.browserAction.setBadgeText({ text: '!' });
    // 		chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0068' });
    // 	}
    // 	chrome.storage.sync.set({ newVersionNotify: newMainVersion });
    // });
  }
});
