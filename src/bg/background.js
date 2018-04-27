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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "opt-add-guides":
            // execute the content script
            chrome.tabs.executeScript(null, { file: "/js/jquery/jquery.js" }, function() {
                chrome.tabs.executeScript(null, { // defaults to the current tab
                    file: "/js/contentscript.js", // script to inject into page and run in sandbox
                    allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
                });
            });
            sendResponse({}); // sending back empty response to sender
            break;
        default:
            // helps debug when request directive doesn't match
            console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);