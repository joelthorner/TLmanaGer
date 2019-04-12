chrome.storage.sync.get({
	optZenPriorHighs: defaults.optZenPriorHighs,
	optZenPriorHighsColors: defaults.optZenPriorHighsColors,

	optZenTicketConfirm: defaults.optZenTicketConfirm
}, function (result) {
	
	// Global inits
	SubmitExpander.init(result.optZenTicketConfirm);
	PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors);
	
	// Global observer
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			SubmitExpander.init(result.optZenTicketConfirm);
			PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors);
		});
	});

	var config = {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	};

	$('body').each(function (index, el) {
		observer.observe(el, config);
	});
});