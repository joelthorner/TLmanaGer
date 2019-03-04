// Saves options to chrome.storage
var sto_saveOptions = null;
function saveOptions(deelay) {

	clearTimeout(sto_saveOptions);
	sto_saveOptions = setTimeout(function() {
		chrome.storage.sync.set({
			optLcBgActive: $('#opt-lc-bg-active').prop('checked'),
			optLcBgValue: { 
				image: $('[name="opt-lc-bg"]:checked').val(),
				thumb: $('[name="opt-lc-bg"]:checked').data('thumb'),
				userName: $('[name="opt-lc-bg"]:checked').data('user-name'),
				userLink: $('[name="opt-lc-bg"]:checked').data('user-link'),
				downloadLocation: $('[name="opt-lc-bg"]:checked').data('download-location') 
			},
			optLcPagridActive: $('#opt-lc-pagrid-active').prop('checked'),
			optLcDevBarActive: $('#opt-lc-dev-bar-active').prop('checked'),
			optDevForceview: $('#opt-dev-forceview').prop('checked'),
			optDevStealFa: $('#opt-dev-steal-fa').prop('checked'),
			optDevFlushCfm: $('#opt-dev-flush-cfm').prop('checked'),
			optProfileEmail: $('#opt-profile-email').val(),
			optProfilePass: $('#opt-profile-pass').val(),
			optProfileUsername: $('#opt-profile-username').val(),
			optProfileAvatar: $('[name="opt-profile-avatar"]:checked').val(),
			optLcBigControls: $('#opt-lc-big-controls').prop('checked'),
			optLcHolidays: $('#opt-lc-holidays').prop('checked'),
			optOsBranchesBtn: $('#opt-os-branches-btn').prop('checked'),
			optZenTicketConfirm: $('#opt-zen-ticket-confirm').prop('checked')

		}, function() {
			restoreOption($('#opt-profile-username'), 'textfield', $('#opt-profile-username').val());
			restoreOption($('#opt-profile-email'), 'textfield', $('#opt-profile-email').val());

			Snackbar.show({
				text: chrome.i18n.getMessage("optionsSaved"),
				actionText: chrome.i18n.getMessage("close"),
				backgroundColor: '#007aff',
				actionTextColor: '#00a8ff',
				pos: 'bottom-center'
			});
		});
	}, deelay);
}

function restoreOption($node, type, value) {
	switch (type) {
		case 'checkbox':
			$node.prop('checked', value);
			break;

		case 'textfield':
			$node.val(value);
			if (value.length) $('.' + $node.attr('id')).text(value);
			break;
	}
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
	// Defaults
	chrome.storage.sync.get(defaults, function(items) {
		
		restoreOption($('#opt-lc-bg-active'), 'checkbox', items.optLcBgActive);

		// special save opt checkbox conditionated by opt bg image
		var $option = $('.card-background-option');
		if (items.optLcBgActive) $option.removeClass('disabled');
		else $option.addClass('disabled');

		// special save opt bg image
		$('#opt-lc-bg-image')
			.find('label').css('background-image', 'url(' + items.optLcBgValue.thumb + ')')
			.prev('input').prop('checked', true).attr({
				'data-thumb': items.optLcBgValue.thumb,
				'data-download-location': items.optLcBgValue.downloadLocation,
				'data-user-link': items.optLcBgValue.userLink,
				'data-user-name': items.optLcBgValue.userName
			})
			.val(items.optLcBgValue.image)
			.parent().find('a').attr('href', items.optLcBgValue.userLink).text(items.optLcBgValue.userName);

		restoreOption($('#opt-lc-pagrid-active'), 'checkbox', items.optLcPagridActive);
		restoreOption($('#opt-lc-dev-bar-active'), 'checkbox', items.optLcDevBarActive);
		restoreOption($('#opt-dev-forceview'), 'checkbox', items.optDevForceview);
		restoreOption($('#opt-dev-steal-fa'), 'checkbox', items.optDevStealFa);
		restoreOption($('#opt-dev-flush-cfm'), 'checkbox', items.optDevFlushCfm);

		restoreOption($('#opt-profile-pass'), 'textfield', items.optProfilePass);
		restoreOption($('#opt-profile-username'), 'textfield', items.optProfileUsername);
		restoreOption($('#opt-profile-email'), 'textfield', items.optProfileEmail);

		// special save opt avatar
		$('.avatar')
			.removeClass('active')
			.parents('.avatar-grid')
			.find('input')
			.filter(function(index) {
				if ($(this).val() == items.optProfileAvatar) return true;
			})
			.prop('checked', true)
			.parents('.avatar').addClass('active');
			
		$('.navbar-profile-img').attr('src', '../../' + items.optProfileAvatar);
		// end special save opt avatar

		restoreOption($('#opt-lc-big-controls'), 'checkbox', items.optLcBigControls);
		restoreOption($('#opt-lc-holidays'), 'checkbox', items.optLcHolidays);
		restoreOption($('#opt-os-branches-btn'), 'checkbox', items.optOsBranchesBtn);
		restoreOption($('#opt-zen-ticket-confirm'), 'checkbox', items.optZenTicketConfirm);
	});
}

function resetOptions() {
	chrome.storage.sync.set(defaults, function() {});
}

// https://medium.com/@whiletruedothis/aprende-a-consumir-la-api-de-unsplash-%EF%B8%8F-c325c0bad53c
const accesKey = 'c5f892b18c1cc3e5bc85943326ba93faacea502bf41e5f09d70fbe90e360c827';
const endPoint = 'https://api.unsplash.com';
var GLOBAL_RAND_DEFAULT;

async function getImages(query, page, count) {
	try {
		if ($.trim(query).length) {
			let response = await fetch(endPoint + '/search/photos?query=' + encodeURI($.trim(query)) + '&page=' + page + '&per_page=' + count + '&orientation=landscape&client_id=' + accesKey);
			let jsonResponse = await response.json();
			let imagesList = await jsonResponse.results;
			
			createImages(imagesList);
			imagesPaginator(jsonResponse, page);
		} else {
			createImages(GLOBAL_RAND_DEFAULT);
			$('[data-page-action]').prop('disabled', true);
		}
	} catch (e) {
		emptyBgFound();
	}
}

async function getRandom(count) {
	let response = await fetch(endPoint + '/photos/random?query=wallpaper&count=' + count + '&orientation=landscape&client_id=' + accesKey);
	try {
		let jsonResponse = await response.json();
		createImages(jsonResponse);
		GLOBAL_RAND_DEFAULT = jsonResponse;
	} catch (e) {
		emptyBgFound();
	}
}

async function getCollectionPhotos(id, page, count) {
	try {
		let response = await fetch(endPoint + '/collections/' + id + '/photos?id=' + id + '&page=' + page + '&per_page=' + count + '&client_id=' + accesKey);
		let jsonResponse = await response.json();
		let imagesList = await jsonResponse;
		
		createImages(imagesList);
	} catch (e) {
		emptyBgFound();
	}
}

function imagesPaginator(jsonResponse, actualPage) {

	var $pagination = $('.pagination-bg');
	$pagination.data('page-this', actualPage)

	if ((actualPage + 1) <= jsonResponse.total_pages) $('[data-page-action="next"]').removeAttr('disabled');
	else $('[data-page-action="next"]').prop('disabled', true);

	if ((actualPage - 1) >= 1) $('[data-page-action="prev"]').removeAttr('disabled');
	else $('[data-page-action="prev"]').prop('disabled', true);

	if ($pagination.find('[disabled]').length == 2) $pagination.addClass('d-none').removeClass('d-flex');
	else $pagination.removeClass('d-none').addClass('d-flex');

	execMasonry();
}

function createImages(imagesList) {
	$('.backgrounds-grid').html('')
	if (imagesList.length) {
		$.each(imagesList, function(index, obj) {
			$('.backgrounds-grid').append(`
				<div class="background-item">
					<input type="radio" id="bg-radio-${obj.id}" name="opt-lc-bg" value="${obj.urls.full}" data-thumb="${obj.urls.small}" data-download-location="${obj.links.download_location}?client_id=${accesKey}" data-user-link="${obj.user.links.html}" data-user-name="${obj.user.name}">
					<label class="aspect16by9" for="bg-radio-${obj.id}" style="background-image: url(${obj.urls.small});background-color: ${obj.color};"><div class="rippleJS"></div></label>
					<a href="${obj.user.links.html}?utm_source=TLmanaGer&utm_medium=referral" target="_blank">${obj.user.name}</a>
				</div>
			`);
		});
	} else {
		emptyBgFound();
	}
	execMasonry();
}

function emptyBgFound() {
	$('.backgrounds-grid').append(`
		<div class="background-item not-found d-flex justify-content-center align-items-center text-muted">
			${chrome.i18n.getMessage("noResults")}
		</div>
	`);
}

function backgroundOption_change() {
	$(document).on('change', '[name="opt-lc-bg"]', function(event) {
		$('.background-item').removeClass('active');
		$(this).parents('.background-item').addClass('active');

		var $selected = $(this),
		    link = $(this).data('user-link'),
		    name = $(this).data('user-name'),
		    thumb = $(this).data('thumb');

		$('#opt-lc-bg-image')
			.find('label').css('background-image', 'url("' + thumb + '")')
			.prev('input').val($selected.val()).attr({
				'data-thumb': thumb,
				'data-download-location': $selected.data('download-location'),
				'data-user-link': $selected.data('user-link'),
				'data-user-name': $selected.data('user-name')
			})
			.parent().find('a').attr('href', link).text(name);
	});
}

function backgroundOption_paginate() {
	$(document).on('click', '[data-page-action="next"]', function(event) {
		getImages($('#search-background').val(), $('.pagination-bg').data('page-this') + 1, 20);
	}).on('click', '[data-page-action="prev"]', function(event) {
		getImages($('#search-background').val(), $('.pagination-bg').data('page-this') - 1, 20);
	});
}

function backgroundOption_collections() {
	$('[data-collection]').click(function(event) {
		event.preventDefault();
		getCollectionPhotos($(this).data('collection'), 1, 20);
	});
}
function backgroundOption_search() {
	var sto_searchBg = null;
	$('#search-background').keyup(function(event) {
		var val = $(this).val();
		clearTimeout(sto_searchBg);

		if (event.keyCode == 13) {
			$('.background-item').not('#opt-lc-bg-image').remove();
			getImages(val, 1, 20)
		} else {
			sto_searchBg = setTimeout(function() {
				$('.background-item').not('#opt-lc-bg-image').remove();
				getImages(val, 1, 20)
			}, 3000);
		}
	});
}

function backgroundOption() {
	backgroundOption_change();
	backgroundOption_paginate();
	backgroundOption_collections();
	backgroundOption_search();

	// conditioned background option by check
	$('#opt-lc-bg-active').change(function(event) {
		var $option = $('.card-background-option');
		if ($(this).prop('checked')) $option.removeClass('disabled');
		else $option.addClass('disabled');
	});
}

// Init all
$(document).ready(function() {
	getRandom(20);
	restoreOptions();
	backgroundOption();

	$('[name="opt-profile-avatar"]').change(function(event) {
		$('.avatar').removeClass('active');
		$(this).parents('.avatar').addClass('active');
		$('.navbar-profile-img').attr('src', '../../' + $(this).val());
	});

	// autosaves
	var clickOptions = '#options [type="checkbox"], #options [type="radio"], #profile [type="checkbox"], #profile [type="radio"]';
	$(document).on('change', clickOptions, function(event) {
		saveOptions(500);
	});
	$('#opt-profile-username, #opt-profile-email, #opt-profile-pass').keyup(function(event) {
		saveOptions(2000);
	});
	// end autosaves

	// Reset defaults
	$(document).on('click', '#confirm-restore-options [data-confirm="true"]', function(event) {
		event.preventDefault();
		resetOptions();
		restoreOptions();
		Snackbar.show({
			text: chrome.i18n.getMessage("optionsRestored"),
			actionText: chrome.i18n.getMessage("close"),
			backgroundColor: '#007aff',
			actionTextColor: '#00a8ff',
			pos: 'bottom-center'
		});
	});

	$('.btn-help').click(function(event) {
		event.preventDefault();
		$('#help-tab').tab('show');
		$($(this).attr('href')).click();
	});

	$('[data-target="#help-modal-video"]').click(function(event) {
		$('#help-modal-video .modal-title span').text($(this).find('span').text());

		$('#help-modal-video .modal-body').html('').append(`
			<video controls class="video-mw">
				<source src="${$(this).data('src')}" type='video/webm; codecs="vp8, vorbis"' />
			<video>
		`);
	});
});
