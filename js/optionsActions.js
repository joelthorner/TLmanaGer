var sto_saveOptions = null;
// https://medium.com/@whiletruedothis/aprende-a-consumir-la-api-de-unsplash-%EF%B8%8F-c325c0bad53c
const accesKey = '***REMOVED***';
const endPoint = 'https://api.unsplash.com';
var GLOBAL_RAND_DEFAULT;

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
			optDevDumpScrollCfm: $('#opt-dev-dump-scroll-cfm').prop('checked'),
			optLcBigControls: $('#opt-lc-big-controls').prop('checked'),
			optLcHolidays: $('#opt-lc-holidays').prop('checked'),
			optOsBranchesBtn: $('#opt-os-branches-btn').prop('checked'),
			
			optProfileEmail: $('#opt-profile-email').val(),
			optProfilePass: $('#opt-profile-pass').val(),
			optProfileUsername: $('#opt-profile-username').val(),
			optProfileAvatar: $('[name="opt-profile-avatar"]:checked').val(),
			
			optZenTicketConfirm: $('#opt-zen-ticket-confirm').prop('checked'),
			optZenPriorHighs: $('#opt-zen-prior-highs').prop('checked'),
			optZenPriorHighsIncident: $('#opt-zen-prior-highs-incident').prop('checked'),
			optZenPriorHighsColors: {
				bg: {
					low: $('.set-text-elem.low').val(),
					normal: $('.set-text-elem.normal').val(),
					high: $('.set-text-elem.high').val(),
					urgent: $('.set-text-elem.urgent').val()
				},
				colors: {
					low: $('.set-text-elem.low').css('color'),
					normal: $('.set-text-elem.normal').css('color'),
					high: $('.set-text-elem.high').css('color'),
					urgent: $('.set-text-elem.urgent').css('color')
				}
			},
			optZenDisableAutofocus: $('#opt-zen-disable-autofocus').prop('checked')

		}, function() {
			setOptionValue($('#opt-profile-username'), 'textfield', $('#opt-profile-username').val());
			setOptionValue($('#opt-profile-email'), 'textfield', $('#opt-profile-email').val());

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

function setOptionValue($node, type, value) {
	switch (type) {
		case 'checkbox':
			$node.prop('checked', value);
			break;

		case 'textfield':
			$node.val(value);
			if (value.length) $('.' + $node.attr('id')).text(value);
			break;

		case 'background':
			$node.find('label').css('background-image', 'url(' + value.thumb + ')')
			$node.find('input[name="opt-lc-bg"]').attr({
				'data-thumb': value.thumb,
				'data-download-location': value.downloadLocation,
				'data-user-link': value.userLink,
				'data-user-name': value.userName
			}).val(value.image);
			$node.find('a').attr('href', value.userLink).text(value.userName);
			break;

		case 'avatar':
			$node.removeClass('active');
			var $checked = $('input[name="opt-profile-avatar"]').filter(function (index) {
				if ($(this).val() == value) return true;
			}).prop('checked', true);
			$checked.closest('.avatar').addClass('active');
			$('.navbar-profile-img').attr('src', '../../' + value);
			break;
			
		case 'conditioned':
			if (value) $node.removeClass('disabled');
			else $node.addClass('disabled');
			break;

		case 'colorpicker':
			$node.each( function(index, el) {
				var hueb = $(el).data('hueb');
				hueb.setColor(value.bg[$(el).data('type')]);
			});
			break;
	}
}

function restoreOptions() {
	chrome.storage.sync.get(defaults, function(items) {
		$.each([
			{ node: $('#opt-lc-bg-active')            , type: 'checkbox',    value: items.optLcBgActive },
			{ node: $('#opt-lc-pagrid-active')        , type: 'checkbox',    value: items.optLcPagridActive },
			{ node: $('#opt-lc-dev-bar-active')       , type: 'checkbox',    value: items.optLcDevBarActive },
			{ node: $('#opt-dev-forceview')           , type: 'checkbox',    value: items.optDevForceview },
			{ node: $('#opt-dev-steal-fa')            , type: 'checkbox',    value: items.optDevStealFa },
			{ node: $('#opt-dev-flush-cfm')           , type: 'checkbox',    value: items.optDevFlushCfm },
			{ node: $('#opt-dev-dump-scroll-cfm')     , type: 'checkbox',    value: items.optDevDumpScrollCfm },
			{ node: $('#opt-lc-big-controls')         , type: 'checkbox',    value: items.optLcBigControls },
			{ node: $('#opt-lc-holidays')             , type: 'checkbox',    value: items.optLcHolidays },
			{ node: $('#opt-os-branches-btn')         , type: 'checkbox',    value: items.optOsBranchesBtn },
			{ node: $('#opt-zen-ticket-confirm')      , type: 'checkbox',    value: items.optZenTicketConfirm },
			{ node: $('#opt-zen-prior-highs')         , type: 'checkbox',    value: items.optZenPriorHighs },
			{ node: $('#opt-zen-prior-highs-incident'), type: 'checkbox',    value: items.optZenPriorHighsIncident },
			{ node: $('#opt-zen-disable-autofocus')   , type: 'checkbox',    value: items.optZenDisableAutofocus },
			{ node: $('#opt-profile-pass')            , type: 'textfield',   value: items.optProfilePass },
			{ node: $('#opt-profile-username')        , type: 'textfield',   value: items.optProfileUsername },
			{ node: $('#opt-profile-email')           , type: 'textfield',   value: items.optProfileEmail },
			{ node: $('#opt-lc-bg-image')             , type: 'background',  value: items.optLcBgValue },
			{ node: $('.avatar')                      , type: 'avatar',      value: items.optProfileAvatar },
			{ node: $('.set-text-elem')               , type: 'colorpicker', value: items.optZenPriorHighsColors },
			{ node: $('.card-background-option')      , type: 'conditioned', value: items.optLcBgActive },
			{ node: $('.z-hl-cont')                   , type: 'conditioned', value: items.optZenPriorHighs }
		], function (index, obj) {  
			setOptionValue(obj.node, obj.type, obj.value);
		});
	});
}

function resetOptions() {
	chrome.storage.sync.set(defaults, function() {});
}

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
		
		var value = {
			thumb: $(this).data('thumb'),
			downloadLocation: $(this).data('download-location'),
			userLink: $(this).data('user-link'),
			userName: $(this).data('user-name'),
			image: $(this).val()
		};

		setOptionValue($('#opt-lc-bg-image'), 'background', value);
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

function zendeskHighlightPriority() {
	$('.set-text-elem').each( function(index, el) {
		var hueb = new Huebee(el, {
			shades: 10,
			hues: 14,
			hue0: 210,
			saturations: 1
		});
		$(el).data('hueb', hueb);
	});

	$(document).on('click', '.huebee__canvas', function(event) {
		saveOptions(500);
	});

	$('#opt-zen-prior-highs').change(function(event) {
		var $option = $('.z-hl-cont');
		if ($(this).prop('checked')) $option.removeClass('disabled');
		else $option.addClass('disabled');
	});
}

// Init all
$(function() {
	getRandom(20);
	restoreOptions();
	backgroundOption();
	zendeskHighlightPriority();

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
		var $a = $($(this).attr('href'));
		$a.click();
		if (!$a.is('[data-src]')) {
			$a.addClass('highlight');
			setTimeout(() => {
				$a.removeClass('highlight');
			}, 2500);
		}
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
