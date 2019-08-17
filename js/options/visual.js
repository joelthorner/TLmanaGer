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
	$.each(CHANGELOG, function (index, item) {
		let lists = { new: [], fixed: [], improved: [], changed:[], removed: [] },
			htmlLists = '', issueUrl = 'https://github.com/joelthorner/TLmanaGer/issues/';
		
		$.each(item.lines, function (index, line) {
			let type = line.match(/^[A-Z]+/)[0], issue = line.match(/#\d{1,4}/), thisLine = line.replace(type + ' ', '');
			if (issue) {
				thisLine = thisLine.replace(issue[0], `<a href="${issueUrl}${issue[0].replace('#', '')}" target="_blank">${issue[0]}</a>`);
			}
			lists[type.toLowerCase()].push(thisLine);
		});
		$.each(lists, function (name, arr) {
			if (arr.length) {
				let items = '';
				$.each(arr, function (index, arrItem) {
					items += `<li>
						<span class="mr-2 badge badge-${name}">${name.toUpperCase()}</span>
						<span>${arrItem}</span>
					</li>`;
				});
				htmlLists += `<ul class="items-list mb-3">${items}</ul>`;
			}
		});
		appendChangelog(item, htmlLists);
	});
}

function appendChangelog(item, htmlLists) {
	$('#changelog .list-group').append(`
		<li class="list-group-item list-group-item-changelog py-4">
			<div class="row">
				<a class="col-3 col-left media text-decoration-none" href="https://github.com/joelthorner/TLmanaGer/releases/tag/${item.version}" target="_blank">
					<svg class="icon mr-3"><use xlink:href="#icon-merge"></use></svg>
					<div class="media-body mb-3">
						<div class="title mb-0 text-light">${item.version.replace('v', '')}</div>
						<small class="text-secondary">${moment(new Date(item.date)).format('MMMM Do YYYY')}</small>
					</div>
				</a>
				<div class="col-9">${htmlLists}</div>
			</div>
		</li>`);
}

function tabBodyClass($tab) {
	$('body')
		.removeClass(function (index, className) {
			return (className.match(/body-tab-[a-zA-Z]+/g) || []).join(' ');
		})
		.addClass('body-tab-' + $tab.attr('href').replace('#', ''));
}

$(function() {
	// set version
	$('.version').text(chrome.runtime.getManifest().version);

	if (location.hash.length) {
		var $tab = $('.navbar .navbar-nav [data-toggle="tab"][href="' + location.hash + '"]').click();
		tabBodyClass($tab);
	}

	$(document).on('click', '.navbar .navbar-nav [data-toggle="tab"]', function(event) {
		location.hash = $(this).attr('href');
		tabBodyClass($(this));

		$('.navbar .navbar-nav [data-toggle="tab"]').removeClass('show');
	});
	$('html').addClass('init');

	// switches
	$(document).on('click', '.list-group-item-option', function(event) {
		if (!$(event.target).is('label, .btn-help')) {
			$(this).find('label').click();
		}
	});
});