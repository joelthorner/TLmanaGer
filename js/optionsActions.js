var defaults = {
	optLcBgActive: true,
	optLcBgValue: chrome.extension.getURL('img/background-default.jpg'),
	optLcPagridActive: false,
	optLcDevBarActive: true,
	optDevForceview: true,
	optDevStealFa : true,
	optProfileName: 'Booker DeWitt',
	optProfileAvatar: 'img/logo.svg',
	optLcBigControls: true
};

// Saves options to chrome.storage
function saveOptions() {

	chrome.storage.sync.set({

		optLcBgActive: $('#opt-lc-bg-active').prop('checked'),
		optLcBgValue: $('#opt-lc-bg-value').val(),
		optLcPagridActive: $('#opt-lc-pagrid-active').prop('checked'),
		optLcDevBarActive: $('#opt-lc-dev-bar-active').prop('checked'),
		optDevForceview: $('#opt-dev-forceview').prop('checked'),
		optDevStealFa: $('#opt-dev-steal-fa').prop('checked'),
		optProfileName: $('#opt-profile-name').val(),
		optProfileAvatar: $('[name="opt-profile-avatar"]:checked').val(),
		optLcBigControls: $('#opt-lc-big-controls').prop('checked')

	}, function() {
		// Update status to let user know options were saved.
		var dataObj = {
			message: "Options saved",
			actionText: 'Close'
		};

		snackbar.show(dataObj);
	});
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
				if (items.optLcBgActive) $parent.addClass('mdc-switch--checked');
				else $parent.removeClass('mdc-switch--checked');
			})
		
		$('#opt-lc-bg-value')
			.val(items.optLcBgValue)
			.filter(function(index) {
				if ($.trim(items.optLcBgValue).length) return true;
			})
			.next()
			.addClass('mdc-floating-label--float-above');

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
	});
}

function resetOptions() {
	chrome.storage.sync.set(defaults, function() {});
}

$(document).ready(function() {
	restoreOptions();

	$('[name="opt-profile-avatar"]').change(function(event) {
		$('.avatar').removeClass('active');
		$(this).parents('.avatar').addClass('active');
	});

	$('#save-options').click(function(event) {
		saveOptions();
	});

	$('#reset-options').click(function(event) {
		resetOptions();
		restoreOptions();
		var dataObj = {
			message: "Restored options",
			actionText: 'Close'
		};
		snackbar.show(dataObj);
	});
});