function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "opt-add-guides"}, function(response) {
        this.close(); // close the popup when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () {
   document.getElementById('opt-add-guides').addEventListener('click', clickHandler);
})

chrome.storage.sync.get(['optProfilePhoto'], function(result) {
	if ($.type(result.optProfilePhoto) != 'undefined') {
		$('#home-body header img').attr('src', result.optProfilePhoto);
	}
});