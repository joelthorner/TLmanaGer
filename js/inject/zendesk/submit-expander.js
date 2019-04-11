SubmitExpander = {
	submitPopupActive: false,
	types: {
		new: '#ffb648',
		open: '#e34f32',
		pending: '#3091ec',
		on_hold: '#2f3941',
		solved: '#87929d'
	},
	swalConfig: {
		title: chrome.i18n.getMessage('zenDesk_preventTicketSubmit_title'),
		text: chrome.i18n.getMessage('zenDesk_preventTicketSubmit_message'),
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#A6BD09',
		cancelButtonColor: '#979797',
		confirmButtonText: 'Confirm',
		reverseButtons: true,
		width: '20rem'
	},
	btnGroupSelector: '.ticket-resolution-footer div[data-garden-id="buttons.button_group_view"]',
	expanderBtnSelector: '[data-garden-id="buttons.icon_button"]',
	expandedMenuSelector: '[data-garden-id="menus.menu_view"]',
	mainBtnSubmitSelector: '[data-garden-id="buttons.button"]',

	init: function(submitPopup) {
		this.submitPopupActive = submitPopup;
		
		$(SubmitExpander.btnGroupSelector).each(function (index, el) {
			// if submitButton is visible
			if ($(el).closest('.ember-view').is(':visible')) {
				// menu expander is not disabled
				if (!$(el).find(SubmitExpander.expanderBtnSelector).prop('disabled')) {
					SubmitExpander.createMenuExpander.full($(el));
				} else {
					SubmitExpander.createMenuExpander.unique($(el));
				}
			}
		});
	},

	createMenuExpander: {
		valid: function ($btnGroup) {
			// if already processed group
			return $btnGroup.data('tlg-submit-expander') === undefined;
		},
		createNewBtnExpander: function ($btnGroup) {
			return $('<div/>', {
				class: 'tlg-new-button-expander'
			});
		},
		full: function ($btnGroup) {
			if (this.valid($btnGroup)) {
				var $newBtnGroup = this.createNewBtnExpander($btnGroup);
				var $expanderBtn = $btnGroup.find(SubmitExpander.expanderBtnSelector);
				
				// if already open
				if ($expanderBtn.attr('aria-expanded') === 'false') {
					$expanderBtn.click();

					setTimeout(() => {
						var $expandedMenu = $(SubmitExpander.expandedMenuSelector).find('li');
						$expandedMenu.each(function (index, li) {
							$newBtnGroup.append(
								SubmitExpander.createMenuExpanderItem($(li), $btnGroup)
							);
						});

						$btnGroup
							.append($newBtnGroup)
							.addClass('tlg-submit-expander')
							.data('tlg-submit-expander', true);

						// close
						if ($expanderBtn.attr('aria-expanded') === 'true') $expanderBtn.click();
					}, 50);
				}
			}
		},
		unique: function ($btnGroup) {
			if (this.valid($btnGroup)) {
				var $newBtnGroup = this.createNewBtnExpander($btnGroup),
					$submitBtn = $btnGroup.find(SubmitExpander.mainBtnSubmitSelector),
					text = $submitBtn.find('strong').text().trim(),
					type = text.toLowerCase().replace('-', '_'),
					fakeLi = `
						<li>
							<div>
								<div tabindex="0" style="width: 100%;">
									<div class="flex">
										<div style="background-color: ${SubmitExpander.types[type]}"></div>
										<span class="space"> </span>
										<span>Submit as <strong>${text}</strong></span>
									</div>
								</div>
							</div>
						</li>`;

				$newBtnGroup.append(
					SubmitExpander.createMenuExpanderItem($(fakeLi), $btnGroup)
				);

				$btnGroup
					.append($newBtnGroup)
					.addClass('tlg-submit-expander')
					.data('tlg-submit-expander', true);
			}
		}
	},

	createMenuExpanderItem: function ($li, $btnGroup) {
		var selectedItemText = $btnGroup.find(SubmitExpander.mainBtnSubmitSelector).text().trim().toLowerCase(),
			classes = '',
			$liHtml = $($li.html());
		
		$liHtml.find('span').prevAll('div').addClass('color-item');
		$liHtml.append('<span class="tooltip-text">Submit as ' + $liHtml.text() + '</span>');

		if ($liHtml.text().trim().toLowerCase() === selectedItemText) classes = 'active';

		$liHtml.find('span').each(function (index, el) {
			$(el).html($(el).html().replace('Submit as', ''));
		});

		var $button = $('<button/>', { 
			type: 'button', 
			html: $liHtml, 
			class: classes 
		}).data('target', '#' + $li.attr('id'))
			.on('click', function (event) {
				event.preventDefault();
				SubmitExpander.executeSubmit($(this));
			});

		return $button;
	},

	executeSubmit: function ($self) {
		if (SubmitExpander.submitPopupActive) {
			Swal.fire(SubmitExpander.swalConfig).then((result) => {
				if (result.value) SubmitExpander.executeSubmitClick($self);
			});
		} else {
			SubmitExpander.executeSubmitClick($self);
		}
	},

	executeSubmitClick: function ($self) {
		var $thisExpanderBtn = $self.closest('.tlg-submit-expander').find(SubmitExpander.expanderBtnSelector);
		if ($thisExpanderBtn.length) $thisExpanderBtn.click();

		setTimeout(() => {
			var $clickTarget = $(SubmitExpander.expandedMenuSelector).find($self.data('target'));
			if (!$clickTarget.length) {
				$clickTarget = $self.closest('.tlg-submit-expander').find(SubmitExpander.mainBtnSubmitSelector);
			}
			$clickTarget.click();
		}, 75);
	}
};