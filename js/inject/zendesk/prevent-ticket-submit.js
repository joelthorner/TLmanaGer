var confirmMessage = chrome.i18n.getMessage("zenDesk_preventTicketSubmit_message");

// Submit button
$(document).on('click.customTLGConfirmExtension', "[data-test-id='submit_button-button']", function(event) {
	
	var $closest = $(this).closest('.ember-view.workspace');

	if ($closest.is(':visible') && $closest.find('.comment_input.is-public').length != 0) {
		
		var confirmSubmit = confirm(confirmMessage);
		
		if (confirmSubmit) {
			return true;
		} else {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
	}
});

// Change ticket state menu
$(document).on('click.customTLGConfirmExtension_menu', "[data-garden-id='menus.item']", function(event) {
	
	var idMenu = $(this).parent('ul').attr('id');
	var $view = $('.ember-view.workspace:visible').find("[aria-controls='" + idMenu + "']").closest('.ember-view.workspace');

	if ($view && $view.find('.comment_input.is-public').length != 0) {

		var confirmMenu = confirm(confirmMessage);
		
		if (confirmMenu) {
			return true;
		} else {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
	}
});