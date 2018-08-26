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
});