// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });
function executeScripts(tabId, injectDetailsArray)
{
	function createCallback(tabId, injectDetails, innerCallback) {
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}

	var callback = null;

	for (var i = injectDetailsArray.length - 1; i >= 0; --i)
		callback = createCallback(tabId, injectDetailsArray[i], callback);

	if (callback !== null)
		callback();   // execute outermost function
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch (request.directive) {
			case "opt-add-guides":
				// execute the content script
				chrome.tabs.executeScript(null, { file: "/js/libs/jquery-3.3.1.min.js" }, function() {
					 chrome.tabs.executeScript(null, { // defaults to the current tab
						  file: "/js/contentscriptAddGuides.js", // script to inject into page and run in sandbox
						  allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
						});
					});
				sendResponse({}); // sending back empty response to sender
				break;

			case "opt-test-tokenizer":
				chrome.tabs.executeScript(null, { file: "/js/libs/jquery-3.3.1.min.js" }, function() {
					chrome.tabs.executeScript(null, {
						file: "/js/contentScriptTokenizer.js",
						allFrames: true
					});
				});
				sendResponse({});
				break;

			case "opt-robart-svg":
				chrome.tabs.executeScript(null, { file: "/js/libs/jquery-3.3.1.min.js" }, function() {
					chrome.tabs.executeScript(null, { 
						file: "/js/contentScriptFontAwes.js", 
						allFrames: true 
					});
				});
				sendResponse({}); // sending back empty response to sender
				break;

			case "opt-update-imgs":
				chrome.tabs.executeScript(null, { file: "/js/libs/jquery-3.3.1.min.js" }, function() {
					chrome.tabs.executeScript(null, { 
						file: "/js/contentScriptGETImgs.js", 
						allFrames: true 
					});
				});
				sendResponse({}); // sending back empty response to sender
				break;

			case "mmp-add-block":
				executeScripts(null, [ 
					{ file: "/js/libs/jquery-3.3.1.min.js" },
					{ file: "/js/libs/jquery-ui.js" },
					{ file: "/js/libs/trumbowyg.min.js" },
					{ file: "/js/mapping/leader-line.min.js" },
					{ file: "/js/mapping/contentScriptAddMappingBlck.js" }
				])
				break;
			
			default:
				// helps debug when request directive doesn't match
				console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
		}
	}
);

// External actions
chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		if (request) {
			if (request.message) {
				if (request.message == "version") {
					sendResponse({ version: "1.0.20" });
				}
			}
		}
		return true;
	}
);