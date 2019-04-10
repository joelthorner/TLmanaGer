var sto_submitExpander, sto_priorityHighlights;

function submitExpander_global(active) {
	clearTimeout(sto_submitExpander);
	sto_submitExpander = setTimeout(function () {
		submitExpander_init(active);
	}, 100);
}

function priorityHighlights_global(active, colors) {
	clearTimeout(sto_priorityHighlights);
	sto_priorityHighlights = setTimeout(function () {
		priorityHighlights_init(active, colors);
	}, 100);
}


chrome.storage.sync.get({
	optZenPriorHighs: defaults.optZenPriorHighs,
	optZenPriorHighsColors: defaults.optZenPriorHighsColors,

	optZenTicketConfirm: defaults.optZenTicketConfirm
}, function (result) {
	
	// Global inits
	submitExpander_global(result.optZenTicketConfirm);
	priorityHighlights_global(result.optZenPriorHighs, result.optZenPriorHighsColors);
	
	// Global observer
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			submitExpander_global(result.optZenTicketConfirm);
			priorityHighlights_global(result.optZenPriorHighs, result.optZenPriorHighsColors);
		});
	});

	var config = {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	};

	$('.ember-view').each(function (index, el) {
		observer.observe(el, config);
	});
});