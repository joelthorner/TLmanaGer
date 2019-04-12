chrome.storage.sync.get({
	optZenPriorHighs: defaults.optZenPriorHighs,
	optZenPriorHighsIncident: defaults.optZenPriorHighsIncident,
	optZenPriorHighsColors: defaults.optZenPriorHighsColors,

	optZenTicketConfirm: defaults.optZenTicketConfirm
}, function (result) {
	
	// Global inits
	SubmitExpander.init(result.optZenTicketConfirm);
	PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors, result.optZenPriorHighsIncident);
	
	// Global observer
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			SubmitExpander.init(result.optZenTicketConfirm);
			PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors, result.optZenPriorHighsIncident);
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