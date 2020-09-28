/*
 * Save from ecommerceData.js localStorage 'ecommerceData' item
 *
 * Message recived from ecommerceData.js injected in <all_urls>
 * and save into localStorage of background generated page.
 * 
 * After, on open popup, get 'ecommerceData' data from localStorage 
 * of background generated page
 */
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message && request.message == 'ecommerceData_to_background') {
//     localStorage.setItem('ecommerceData', JSON.stringify(request.data));
//   }
// });

/*
 * On change tab and on update tab execute ecommerceData
 * and this refresh data.
 * 
 * ecommerceData send 'ecommerceData_to_background' message
 */
// function ecommerceDataInject(tab) {
//   chrome.tabs.executeScript(null, {
//     file: 'inject/ecommerceData.js'
//   }, () => chrome.runtime.lastError);
// }
// chrome.tabs.onActivated.addListener(ecommerceDataInject);
// chrome.tabs.onUpdated.addListener(ecommerceDataInject);




// TODO all
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
