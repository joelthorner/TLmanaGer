window.mdc.autoInit();

// messages
const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
// var listEle = document.querySelector('.changelog');
// var list = new mdc.list.MDCList(listEle);
// list.singleSelection = true;

$(document).ready(function() {
	new Tooltip($('#save-options')[0], {
		placement: 'left',
		title: 'Save options'
	});
	new Tooltip($('#reset-options')[0], {
		placement: 'left',
		title: 'Reset options'
	});

	$('#options-menu [data-panel]').click(function(event) {
		$('#options-menu [data-panel]').removeClass('active');
		$(this).addClass('active');

		$('.panel').removeClass('active');
		$('.' + $(this).data('panel')).addClass('active');
	});

	// Set avatars
	var $gridAvatars = $('.grid-avatar');
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

	// Set changelog
	var $changelogList = $('.changelog-list');
	$.each(CHANGELOG, function(index, item) {
		$changelogList.append(`
			<li class="mdc-list-item mdc-ripple-upgraded" data-mdc-auto-init="MDCRipple">
				<svg class="mdc-list-item__graphic icon"><use xlink:href="#icon-merge"></use></svg>
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">v${item.version}</span>
					<span class="mdc-list-item__secondary-text">${item.date}</span>
				</span>
			</li>
			<li class="sublist">
				<ul>
					<li>${item.lines.join('</li><li>')}</li>
				</ul>
			</li>
			<li class="mdc-list-divider" role="separator"></li>
		`);
	});
});