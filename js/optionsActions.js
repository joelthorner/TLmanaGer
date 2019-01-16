var defaults = {
	optLcBgActive: true,
	optLcBgValue: {
		image: chrome.extension.getURL('img/background-default.jpg'),
		thumb: chrome.extension.getURL('img/background-default.jpg'),
		userName: 'Matteo Fusco',
		userLink: 'https://unsplash.com/@matteofusco?utm_source=TLmanaGer&utm_medium=referral',
		downloadLocation: ''
	},
	optLcPagridActive: false,
	optLcDevBarActive: true,
	optDevForceview: true,
	optDevStealFa : true,
	optDevFlushCfm : true,
	optProfileEmail: '',
	optProfilePass: '',
	optProfileAvatar: 'img/logo.svg',
	optLcBigControls: false,
	optLcHolidays: true
};

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
			optProfileAvatar: $('[name="opt-profile-avatar"]:checked').val(),
			optLcBigControls: $('#opt-lc-big-controls').prop('checked'),
			optLcHolidays: $('#opt-lc-holidays').prop('checked')

		}, function() {

			var dataObj = {
				message: chrome.i18n.getMessage("optionsSaved"),
				actionText: chrome.i18n.getMessage("close"),
				actionHandler: function () {
					console.log('Saved options');
				}
			};

			snackbar.show(dataObj);
		});
	}, deelay);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
	// Defaults
	chrome.storage.sync.get(defaults, function(items) {
		
		$('#opt-lc-bg-active')
			.prop('checked', items.optLcBgActive)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optLcBgActive) {
					$parent.addClass('mdc-switch--checked');
					$('.option-bg-lc').removeClass('disabled');
				} else {
					$parent.removeClass('mdc-switch--checked');
					$('.option-bg-lc').addClass('disabled');
				}
			})

		$('#opt-lc-bg-image')
			.find('label')
				.css('background-image', 'url(' + items.optLcBgValue.thumb + ')')
				.prev('input')
				.attr({
					'data-thumb': items.optLcBgValue.thumb,
					'data-download-location': items.optLcBgValue.downloadLocation,
					'data-user-link': items.optLcBgValue.userLink,
					'data-user-name': items.optLcBgValue.userName
				})
				.val(items.optLcBgValue.image)
				.parent().find('a').attr('href', items.optLcBgValue.userLink).text(items.optLcBgValue.userName);

		$('#opt-lc-pagrid-active')
			.prop('checked', items.optLcPagridActive)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optLcPagridActive) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})

		$('#opt-lc-dev-bar-active')
			.prop('checked', items.optLcDevBarActive)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optLcDevBarActive) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})

		$('#opt-dev-forceview')
			.prop('checked', items.optDevForceview)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optDevForceview) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})

		$('#opt-dev-steal-fa')
			.prop('checked', items.optDevStealFa)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optDevStealFa) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})

		$('#opt-dev-flush-cfm')
			.prop('checked', items.optDevFlushCfm)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optDevFlushCfm) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})

		$('#opt-profile-email')
			.val(items.optProfileEmail)
			.filter(function(index) {
				if ($.trim(items.optProfileEmail).length) return true;
			})
			.next()
			.addClass('mdc-floating-label--float-above');

		$('#opt-profile-pass')
			.val(items.optProfilePass)
			.filter(function(index) {
				if ($.trim(items.optProfilePass).length) return true;
			})
			.next()
			.addClass('mdc-floating-label--float-above');

		$('.avatar')
			.removeClass('active')
			.parents('.grid-avatar')
			.find('input')
			.filter(function(index) {
				if ($(this).val() == items.optProfileAvatar) return true;
			})
			.prop('checked', true)
			.parents('.avatar').addClass('active')

		$('#opt-lc-big-controls')
			.prop('checked', items.optLcBigControls)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optLcBigControls) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})

		$('#opt-lc-holidays')
			.prop('checked', items.optLcHolidays)
			.filter(function(index) {
				var $parent = $(this).parents('.mdc-switch');
				if (items.optLcHolidays) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})
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
			$('#load-more-bg').remove();
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

function imagesPaginator(jsonResponse, actualPage) {
	$('#load-more-bg').remove();
	if ((actualPage + 1) <= jsonResponse.total_pages) {
		$('.option-backgrounds').append(`
			<button data-load-page="${(actualPage + 1)}" id="load-more-bg" data-mdc-auto-init="MDCRipple" class="demo-button mdc-button mdc-button--unelevated demo-button-shaped mdc-ripple-upgraded">
				${chrome.i18n.getMessage("loadMore")}
			</button>
		`);
		mdc.ripple.MDCRipple.attachTo(document.getElementById('load-more-bg'));
	}
	execMasonry();
}

function createImages(imagesList) {
	// console.log(imagesList);
	if (imagesList.length) {
		$.each(imagesList, function(index, obj) {
			$('.grid-backgrounds').append(`
				<div class="background-item">
					<input type="radio" id="bg-radio-${obj.id}" name="opt-lc-bg" value="${obj.urls.full}" data-thumb="${obj.urls.thumb}" data-download-location="${obj.links.download_location}?client_id=${accesKey}" data-user-link="${obj.user.links.html}" data-user-name="${obj.user.name}">
					<label class="aspect16by9" for="bg-radio-${obj.id}" style="background-image: url(${obj.urls.thumb});background-color: ${obj.color};"></label>
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
	$('.grid-backgrounds').append(`
		<div class="background-item not-found">
			${chrome.i18n.getMessage("noResults")}
		</div>
	`);
}

$(document).ready(function() {
	getRandom(16);
	restoreOptions();

	$('[name="opt-profile-avatar"]').change(function(event) {
		$('.avatar').removeClass('active');
		$(this).parents('.avatar').addClass('active');
	});

	$(document).on('change', '[name="opt-lc-bg"]', function(event) {
		$('.background-item').removeClass('active');
		$(this).parents('.background-item').addClass('active');

		var $selected = $(this);
		var link = $(this).data('user-link');
		var name = $(this).data('user-name');
		var thumb = $(this).data('thumb');

		$('#opt-lc-bg-image')
			.find('label')
				.css('background-image', 'url("' + thumb + '")')
				.prev('input')
				.val($selected.val())
				.attr({
					'data-thumb': thumb,
					'data-download-location': $selected.data('download-location'),
					'data-user-link': $selected.data('user-link'),
					'data-user-name': $selected.data('user-name')
				})
				.parent().find('a').attr('href', link).text(name);
	});

	$(document).on('click', '#load-more-bg', function(event) {
		getImages($('#search-background').val(), $('#load-more-bg').data('load-page'), 16);
	});

	// autosaves
	$(document)
		.on('change', '.panel-options [type="checkbox"], .panel-options [type="radio"]', function(event) {
			saveOptions(750);
		});
		
	$('#opt-profile-email, #opt-profile-pass').keyup(function(event) {
		saveOptions(2000);
	});
	// end autosaves

	$('#reset-options').click(function(event) {
		resetOptions();
		restoreOptions();
		var dataObj = {
			message: chrome.i18n.getMessage("close"),
			actionText: chrome.i18n.getMessage("optionsRestored"),
			actionHandler: function () {
				console.log('Restored defaults');
			}
		};
		snackbar.show(dataObj);
	});

	// search keyup background
	var sto_searchBg = null;
	$('#search-background').keyup(function(event) {
		var val = $(this).val();
		clearTimeout(sto_searchBg);

		if (event.keyCode == 13) {
			$('.background-item').not('#opt-lc-bg-image').remove();
			getImages(val, 1, 16)
		} else {
			sto_searchBg = setTimeout(function() {
				$('.background-item').not('#opt-lc-bg-image').remove();
				getImages(val, 1, 16)
			}, 3000);
		}
	});

	// conditioned background option by check
	$('#opt-lc-bg-active')
		.change(function(event) {
			if ($(this).prop('checked')) {
				$('.option-bg-lc').removeClass('disabled');
			} else {
				$('.option-bg-lc').addClass('disabled');
			}
		});
});
