DisableEditorAutofocus = {

	init: function (active, mutation) {
		this.activeOnClick();
	},

	observer: function (active, mutation) {
		this.active = active;

		if (this.active) {
			if (mutation.addedNodes.length) {
				var $editor = $(mutation.target).find('.editor');
				if ($editor.length) {
					$editor.attr('contenteditable', false);
					$editor.blur();
				}
				var $input = $(mutation.target).find('input');
				if ($input.length) {
					$input.blur();
				}
			}
		}
	},

	activeOnClick: function () {
		$(document).on('click', '.editor[contenteditable="false"]', function (event) {
			event.preventDefault();
			$(this).attr('contenteditable', true);
			setTimeout(() => {
				$(this).focus();
			}, 100);
		})
	}
};