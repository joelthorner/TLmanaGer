SubmitExpander = {
	submitPopupActive: false,
	timeout: null,
	types: {
		new: '#ffb648',
		open: '#e34f32',
		pending: '#3091ec',
		on_hold: '#2f3941',
		hold: '#2f3941', // same hold, duplicated performance
		solved: '#87929d'
	},
	swalConfig: {
		title: '<svg viewBox="0 0 16 16" id="zd-svg-icon-16-alert-warning-stroke" width="100%" height="100%"><path fill="none" stroke="currentColor" stroke-linecap="round" d="M.88 13.77L7.06 1.86c.19-.36.7-.36.89 0l6.18 11.91c.17.33-.07.73-.44.73H1.32c-.37 0-.61-.4-.44-.73zM7.5 6v3.5"></path><circle cx="7.5" cy="12" r="1" fill="currentColor"></circle></svg>' + 
			chrome.i18n.getMessage('zenDesk_preventTicketSubmit_title'),
		text: chrome.i18n.getMessage('zenDesk_preventTicketSubmit_message'),
		showCancelButton: true,
		confirmButtonColor: '#A6BD09',
		cancelButtonColor: '#979797',
		confirmButtonText: 'Confirm',
		reverseButtons: true,
		width: '22rem',
		customClass: {
			container: 'swal-zendesk-popup'
		}
	},
	btnGroupSelector: '.ticket-resolution-footer div[data-garden-id="buttons.button_group_view"]',
	expanderBtnSelector: '[data-garden-id="buttons.icon_button"]',
	expandedMenuSelector: '[data-garden-id="menus.menu_view"]',
	mainBtnSubmitSelector: '[data-garden-id="buttons.button"]',

	init: function (submitPopup) {
		clearTimeout(SubmitExpander.timeout);
		SubmitExpander.timeout = setTimeout(() => {
			SubmitExpander.run(submitPopup);
		}, 100);
	},

	run: function(submitPopup) {
		this.submitPopupActive = submitPopup;
		
		$(SubmitExpander.btnGroupSelector).each(function (index, el) {
			if ($(el).find('.tlg-new-button-expander button').text().replace('Submit as', '').trim() == 0) {
				var $workspace = $(el).closest('.ember-view.workspace');
				SubmitExpander.createMenuExpander.destroy($workspace);
			}

			// if submitButton is visible
			if ($(el).closest('.ember-view.workspace').is(':visible')) {
				var uniqueBtnString = $(el).find(SubmitExpander.mainBtnSubmitSelector).text().trim().toLowerCase();
				// menu expander is not disabled
				if (!$(el).find(SubmitExpander.expanderBtnSelector).prop('disabled')) {
					SubmitExpander.createMenuExpander.full($(el));
				} else if (uniqueBtnString.length && uniqueBtnString !== 'submit as') {
					SubmitExpander.createMenuExpander.unique($(el));
				}
			} else {
				// destroy inactive workspaces
				var $inactiveWorkSpace = $(el).closest('.ember-view.workspace');
				SubmitExpander.createMenuExpander.destroy($inactiveWorkSpace);
			}
		});
	},

	createMenuExpander: {
		destroy : function($workspace) {
			$workspace
				.find('.tlg-new-button-expander')
				.remove();
			
			$workspace
				.find(SubmitExpander.btnGroupSelector)
				.removeClass('tlg-submit-expander')
				.removeData('tlg-submit-expander');
		},

		valid: function ($btnGroup) {
			// if already processed group
			return $btnGroup.data('tlg-submit-expander') === undefined;
		},

		createNewBtnExpander: function () {
			return $('<div/>', {
				class: 'tlg-new-button-expander'
			});
		},

		full: function ($btnGroup) {
			if (this.valid($btnGroup)) {
				var $newBtnGroup = this.createNewBtnExpander();
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
				var $newBtnGroup = this.createNewBtnExpander();
				// var $submitBtn = $btnGroup.find(SubmitExpander.mainBtnSubmitSelector);
				var $label = $btnGroup.closest('.ember-view.workspace:visible').find('.ticket_status_label');
				if ($label.length) {
					var text = $label.text().toLowerCase().trim().replace('-', ' ');
					var type = $label.attr('class').split(' ')[0];
					var fakeLi = `
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