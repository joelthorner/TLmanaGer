chrome.storage.sync.get({
	optZenPriorHighs: defaults.optZenPriorHighs,
	optZenPriorHighsIncident: defaults.optZenPriorHighsIncident,
	optZenPriorHighsColors: defaults.optZenPriorHighsColors,

	optZenTicketConfirm: defaults.optZenTicketConfirm,
	optZenDisableAutofocus: defaults.optZenDisableAutofocus
}, function (result) {
	
	// Global inits
	ExtraCommands.init();
	SubmitExpander.init(result.optZenTicketConfirm);
	PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors, result.optZenPriorHighsIncident);
	DisableEditorAutofocus.init();
	

	var globalObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			SubmitExpander.init(result.optZenTicketConfirm);
			PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors, result.optZenPriorHighsIncident);
			DisableEditorAutofocus.observer(result.optZenDisableAutofocus, mutation);
		});
	});
	globalObserver.observe($('body')[0], {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
	
	var navTabsObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			ExtraCommands.onFindTabSelected(mutation);
		});
	});
	navTabsObserver.observe($('#tabs')[0], {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
});