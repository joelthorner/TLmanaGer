let defaultsCopy = defaults;


function activeDefaultOptions(namespace, active) {
	$.each(defaults, function (index, val) {
		if (index.indexOf(namespace) !== -1 && typeof val === 'boolean' && active) {
			defaultsCopy[index] = true;
		} else if (index.indexOf(namespace) !== -1 && typeof val === 'boolean') {
			defaultsCopy[index] = false;
		}
	});
	chrome.storage.sync.set(defaultsCopy);
}

$('.version').text(chrome.runtime.getManifest().version);

$('.custom-control-input').on('change', function(event) {
	let checked = $(this).prop('checked');
	
	switch ($(this).data('type')) {
		case 'casual':
			activeDefaultOptions('Lc', checked);
			break;
		case 'dev':
			activeDefaultOptions('Dev', checked);
			break;
		case 'zendesk':
			activeDefaultOptions('Zen', checked);
			break;
	}
});

$('#lets-go').click(function (event) {
	chrome.tabs.getCurrent(function (tab) {
		chrome.tabs.create({ url: chrome.extension.getURL("/src/options/index.html") });
		chrome.tabs.remove(tab.id, function () {});
	});
});