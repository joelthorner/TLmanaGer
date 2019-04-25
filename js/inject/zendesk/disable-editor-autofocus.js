DisableEditorAutofocus = {

	init: function (active, mutation) {

	},

	observer: function (active, mutation) {
		this.active = active;

		if (this.active) {
			if (mutation.addedNodes.length) {
				var $editor = $(mutation.target).find('.editor');
				
				if ($editor.length) {
					var $scrollable = $editor.closest('.section.ticket');
					if ($scrollable.length) {
						$scrollable.attr('tabindex', 10);
						$scrollable.focus();
					}
				}
			}
		}
	}
};