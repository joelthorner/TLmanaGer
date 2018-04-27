chrome.storage.sync.get(['optBgLc'], function(result) {
	if ($.type(result.optBgLc) == 'undefined') {
		chrome.storage.sync.set({optBgLc: $('#opt-bg-lc').val()}, function() {
			// console.log('Value is set to ' + value);
		});
	}
});

$('#opt-save').click(function(event) {
	// chrome.storage.sync.set({ optBgLc: $('#opt-bg-lc').val() });
	chrome.storage.sync.set({optBgLc: $('#opt-bg-lc').val()}, function() {
		console.log('Value is set to ' + $('#opt-bg-lc').val());
	});

});