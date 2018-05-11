// options js execute ------------------------------------------
function optAddGuidesHandler(e) {
	chrome.runtime.sendMessage({directive: "opt-add-guides"}, function(response) {
		this.close(); // close the popup when the background finishes processing request
	});
}

function optTestTokenizerHandler(e) {
	chrome.runtime.sendMessage({directive: "opt-test-tokenizer"}, function(response) {
		this.close(); // close the popup when the background finishes processing request
	});
}

function optRobartSvgHandler(e) {
	chrome.runtime.sendMessage({directive: "opt-robart-svg"}, function(response) {
		this.close(); // close the popup when the background finishes processing request
	});
}

function optUpdtGetImgsHandler(e) {
	chrome.runtime.sendMessage({directive: "opt-update-imgs"}, function(response) {
		this.close(); // close the popup when the background finishes processing request
	});
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('opt-add-guides').addEventListener('click', optAddGuidesHandler);
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('opt-test-tokenizer').addEventListener('click', optTestTokenizerHandler);
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('opt-robart-svg').addEventListener('click', optRobartSvgHandler);
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('opt-update-imgs').addEventListener('click', optUpdtGetImgsHandler);
});


// submenus ------------------------------------------
$('.submenu .back').on('click', function(event) {
	$(this).parents('.submenu').toggleClass('open');
});

$('.open-submenuer').on('click', function(event) {
	$( $(this).data('target') ).toggleClass('open');
}); 

function mmpAddBlockHandler(e) {
	chrome.runtime.sendMessage({directive: "mmp-add-block"}, function(response) {
		this.close();
	});
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('mmp-add-block').addEventListener('click', mmpAddBlockHandler);
});