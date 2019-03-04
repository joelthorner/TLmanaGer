function execMasonry() {
	$('.tab-pane').each(function(index, el) {
		$(this).masonry({
			itemSelector: '.card-option-col',
			columnWidth: '.card-option-col',
			stamp: '.stamp',
			percentPosition: true
		});
	});
}

function setAvatars() {
	var $gridAvatars = $('.avatar-grid');
	$.each(AVATARS, function(index, avatar) {
		$gridAvatars.append(`
			<div class="avatar">
				<input type="radio" id="radio-${index}" name="opt-profile-avatar" value="${avatar.img}">
				<label for="radio-${index}">
					<img src="../../${avatar.img}" title="${avatar.title}">
				</label>
			</div>
		`);
	});
	$('.avatar img').tooltip();
}

function setChangelog() {
	$.each(CHANGELOG, function(index, item) {
		var listNew = [], listFix = [], listElse = [];
		$.each(item.lines, function(index, line) {
			if (line.indexOf('NEW') == 0) listNew.push(line.replace('NEW ', ''));
			else if (line.indexOf('FIX') == 0) listFix.push(line.replace('FIX ', ''));
			else listElse.push(line);
		});

		var NEW = '<span class="mr-2 badge badge-success text-monospace">NEW</span>',
		    FIX = '<span class="mr-2 badge badge-danger text-monospace">FIX</span>';

		$('#changelog .list-group').append(`
			<li class="list-group-item list-group-item-changelog py-4">
				<div class="row">
					<a class="col-3 col-left media text-decoration-none" href="https://github.com/joelthorner/TLmanaGer/releases/tag/v${item.version}" target="_blank">
						<svg class="icon mr-3"><use xlink:href="#icon-merge"></use></svg>
						<div class="media-body mb-3">
							<div class="title mb-0 text-light">v${item.version}</div>
							<small class="text-secondary">${moment(new Date(item.date)).fromNow()}</small>
						</div>
					</a>
					
					<div class="col-9">
						<ul class="items-list mb-3 ${!listNew.length ? 'd-none' : ''}">
							<li>${NEW}<span>${listNew.join('</span></li><li>' + NEW + '<span>')}</span></li>
						</ul>
						<ul class="items-list mb-3 ${!listFix.length ? 'd-none' : ''}">
							<li>${FIX}<span>${listFix.join('</span></li><li>' + FIX + '<span>')}</span></li>
						</ul>
						<ul class="items-list mb-3 ${!listElse.length ? 'd-none' : ''}">
							<li><span>${listElse.join('</span></li><li><span>')}</span></li>
						</ul>
					</div>
				</div>
			</li>
		`);
	}); 	
}

$(document).ready(function() {
	// set version
	$('.version').text(chrome.runtime.getManifest().version);

	if (location.hash.length) {
		$('.navbar .navbar-nav [data-toggle="tab"][href="' + location.hash + '"]').click();
		execMasonry();
	}

	$('.navbar .navbar-nav [data-toggle="tab"]').click(function(event) {
		location.hash = $(this).attr('href');
		execMasonry();

		$('.navbar .navbar-nav [data-toggle="tab"]').removeClass('show');
	});
	$('html').addClass('init');

	// switches
	$('.list-group-item-option').click(function(event) {
		if (!$(event.target).is('label, .btn-help')) {
			$(this).find('label').click();
		}
	});

	setAvatars();
	setChangelog();

	execMasonry();
});