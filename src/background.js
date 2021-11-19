/**
 * Execute js files recursively
 * @param {number|null} tabId 
 * @param {object} injectDetailsArray 
 */
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

/**
 * Execute css files recursively
 * @param {number|null} tabId 
 * @param {object} injectDetailsArray 
 */
function insertCSSs(tabId, injectDetailsArray) {
  function createCallback(tabId, injectDetails, innerCallback) {
    return function () {
      chrome.tabs.insertCSS(tabId, injectDetails, innerCallback);
    };
  }
  var callback = null;
  for (var i = injectDetailsArray.length - 1; i >= 0; --i)
    callback = createCallback(tabId, injectDetailsArray[i], callback);

  if (callback !== null) callback(); // execute outermost function
}


// Popup actions listener
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (typeof request.directive !== 'undefined') {
      let files = request.directive.split(','),
        jsFiles = [],
        cssFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.includes('.js')) jsFiles.push({ file: file });
        else if (file.includes('.css')) cssFiles.push({ file: file });
      }

      if (jsFiles.length) executeScripts(null, jsFiles);
      if (cssFiles.length) insertCSSs(null, cssFiles);

      // close
      let windows = chrome.extension.getViews({ type: "popup" });
      if (windows.length) {
        windows[0].close();
      }
    }
  }
);

/**
 * Contains all mainfest json data
 * @type {object}
 */
const MANIFEST_DATA = chrome.runtime.getManifest();

/**
 * On install extension create tab with configuration landing
 */
function onInstallExtension() {
  const url = chrome.extension.getURL("welcome/welcome.html");
  chrome.tabs.create({ url });
}

/**
 * On update extension (major or medium update), 
 * create notify with new version and set alert badge.
 */
function onUpdateExtension() {
  let mainVersion = MANIFEST_DATA.version.split('.').splice(0, 2).join('.');

  chrome.storage.sync.get({
    newVersionNotify: mainVersion
  }, function (result) {
    let oldMainVersion = result.newVersionNotify.split('.').splice(0, 2).join('.');

    if (parseFloat(mainVersion) > parseFloat(oldMainVersion)) {
      createUpdateExtensionNotify();
      chrome.browserAction.setBadgeText({ text: '!' });
      chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0068' });
    }

    chrome.storage.sync.set({ newVersionNotify: mainVersion });
  });
}

/**
 * Create notify with new extension version
 */
function createUpdateExtensionNotify() {
  const notifyId = `newVersion-${MANIFEST_DATA.version}`;
  const updateNotifyConfig = {
    type: 'basic',
    title: `New TLmanaGer ${MANIFEST_DATA.version} !`,
    iconUrl: '../icons/icon128.png',
    message: 'Nova versió feta amb carinyo i una cullerada de bugs.',
    priority: 1,
    buttons: [
      { title: 'Dimiss' },
      { title: 'Release notes' }
    ]
  };

  chrome.notifications.create(notifyId, updateNotifyConfig);

  chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
    if (notificationId === notifyId && buttonIndex === 1) {
      chrome.tabs.create({
        url: chrome.extension.getURL("options/options.html") + "#/changelog"
      });
    }
  });
}

// Extension update/install
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install')
    onInstallExtension();

  else if (details.reason == 'update')
    onUpdateExtension();
});
