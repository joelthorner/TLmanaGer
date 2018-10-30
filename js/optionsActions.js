var defaults = {
	optLcBgActive: true,
	optLcBgValue: chrome.extension.getURL('img/background-default.jpg'),
	optLcPagridActive: false,
	optLcDevBarActive: true,
	optDevForceview: true,
	optDevStealFa : true,
	optProfileName: 'Booker DeWitt',
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
			optLcBgValue: $('[name="opt-lc-bg"]:checked').val(),
			optLcPagridActive: $('#opt-lc-pagrid-active').prop('checked'),
			optLcDevBarActive: $('#opt-lc-dev-bar-active').prop('checked'),
			optDevForceview: $('#opt-dev-forceview').prop('checked'),
			optDevStealFa: $('#opt-dev-steal-fa').prop('checked'),
			optProfileName: $('#opt-profile-name').val(),
			optProfileAvatar: $('[name="opt-profile-avatar"]:checked').val(),
			optLcBigControls: $('#opt-lc-big-controls').prop('checked'),
			optLcHolidays: $('#opt-lc-holidays').prop('checked')

		}, function() {
			// Update status to let user know options were saved.
			var dataObj = {
				message: "Options saved",
				actionText: 'Close',
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
				.css('background-image', 'url(' + items.optLcBgValue.replace('w=1920', 'w=200') + ')')
				.prev('input')
				.val(items.optLcBgValue.replace('w=1920', 'w=200'));

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

		$('#opt-profile-name')
			.val(items.optProfileName)
			.filter(function(index) {
				if ($.trim(items.optProfileName).length) return true;
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
	$('.background-item.active').remove();
	chrome.storage.sync.set(defaults, function() {});
}

// https://medium.com/@whiletruedothis/aprende-a-consumir-la-api-de-unsplash-%EF%B8%8F-c325c0bad53c
const accesKey = '***REMOVED***';
const endPoint = 'https://api.unsplash.com';
var GLOBAL_RAND_DEFAULT;

async function getImages(query, page, count) {

	if ($.trim(query).length) {
		// let response = await fetch(endPoint + '/photos/random?w=200&query=' + encodeURI(query) + '&count=' + count + '&orientation=landscape&client_id=' + accesKey);
		let response = await fetch(endPoint + '/search/photos?query=' + encodeURI($.trim(query)) + '&page=' + page + '&per_page=' + count + '&orientation=landscape&client_id=' + accesKey);
		let jsonResponse = await response.json();
		let imagesList = await jsonResponse.results;
		
		createImages(imagesList);
		imagesPaginator(jsonResponse, page);
	} else {
		createImages(GLOBAL_RAND_DEFAULT);
		$('#load-more-bg').remove();
	}
}

async function getRandom(count) {
	let response = await fetch(endPoint + '/photos/random?w=200&query=wallpaper&count=' + count + '&orientation=landscape&client_id=' + accesKey);
	
	let jsonResponse = await response.json();
	createImages(jsonResponse);
	GLOBAL_RAND_DEFAULT = jsonResponse;
}

function imagesPaginator(jsonResponse, actualPage) {
	$('#load-more-bg').remove();
	if ((actualPage + 1) <= jsonResponse.total_pages) {
		$('.option-backgrounds').append(`
			<button data-load-page="${(actualPage + 1)}" id="load-more-bg" data-mdc-auto-init="MDCRipple" class="demo-button mdc-button mdc-button--unelevated demo-button-shaped mdc-ripple-upgraded">LOAD MOAR</button>
		`);
		window.mdc.autoInit();
	}
}

function createImages(imagesList) {
	if (imagesList.length) {
		$.each(imagesList, function(index, obj) {
			$('.grid-backgrounds').append(`
				<div class="background-item">
					<input type="radio" id="bg-radio-${obj.id}" name="opt-lc-bg" value="${obj.urls.thumb.replace('w=200', 'w=1920')}">
					<label class="aspect16by9" for="bg-radio-${obj.id}" style="background-image: url(${obj.urls.thumb});background-color: ${obj.color};"></label>
				</div>
			`);
		});
	} else {
		$('.grid-backgrounds').append(`
			<div class="background-item not-found">
				Not found images 😞
			</div>
		`);
	}
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
		
		$('#opt-lc-bg-image')
			.find('label')
				.css('background-image', 'url(' + $(this).val().replace('w=1920', 'w=200') + ')')
				.prev('input')
				.val($(this).val().replace('w=1920', 'w=200'));
	});

	$(document).on('click', '#load-more-bg', function(event) {
		getImages($('#search-background').val(), $('#load-more-bg').data('load-page'), 16);
	});

	// autosaves
	$(document)
		.on('change', '.panel-options [type="checkbox"], .panel-options [type="radio"]', function(event) {
			saveOptions(750);
		});
		
	$('#opt-profile-name').keyup(function(event) {
		saveOptions(2000);
	});
	// end autosaves

	$('#reset-options').click(function(event) {
		resetOptions();
		restoreOptions();
		var dataObj = {
			message: "Restored defaults",
			actionText: 'Close',
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
		})

	// reset bg
	$('#opt-lc-bg-image').click(function(event) {
		$(this)
			.find('label')
				.css('background-image', 'url(' + defaults.optLcBgValue + ')')
				.prev('input')
				.val(defaults.optLcBgValue);

		$('.background-item').removeClass('active');

		saveOptions(250);
	});
});