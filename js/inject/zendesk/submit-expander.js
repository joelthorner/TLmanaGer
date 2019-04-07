const BUTTON_GROUP_SELECTOR = '.ticket-resolution-footer div[data-garden-id="buttons.button_group_view"]';
const EXPANDER_BUTTON_SELECTOR = '[data-garden-id="buttons.icon_button"]';
const EXPANDED_MENU_SELECTOR = '[data-garden-id="menus.menu_view"]';
const MAIN_BUTTON_SUBMIT = '[data-garden-id="buttons.button"]';

const TYPES = {
	new: '#ffb648',
	open: '#e34f32',
	pending: '#3091ec',
	on_hold: '#2f3941',
	solved: '#87929d'
};

function updateSubmits() {
	console.log('TLmanaGer Zendesk: submit expander update.');

	$(BUTTON_GROUP_SELECTOR).each(function (index, el) {
		// if button is visible
		if ($(el).closest('.ember-view').is(':visible')) { 
			// menu expander is not disabled
			if (!$(el).find(EXPANDER_BUTTON_SELECTOR).prop('disabled')) { 
				createMenuExpander('full', $(el));
			} else {
				createMenuExpander('unique', $(el));
			}
		}
	});
}

function createMenuExpander(type, $btnGroup) {
	var $newButtonGroup = $('<div/>', {
		class: 'tlg-new-button-expander'
	});
	
	// if already processed group
	if ($btnGroup.data('tlg-submit-expander') === undefined) {
		switch (type) {
			case 'full':
				var $expanderBtn = $btnGroup.find(EXPANDER_BUTTON_SELECTOR);
				// if already open
				if ($expanderBtn.attr('aria-expanded') === 'false') {
					$expanderBtn.click();
					
					setTimeout(() => {
						var $expandedMenu = $(EXPANDED_MENU_SELECTOR).find('li');
						$expandedMenu.each(function (index, li) {
							$newButtonGroup.append(createMenuExpanderItem($(li), $btnGroup));
						});
						
						$btnGroup
							.append($newButtonGroup)
							.addClass('tlg-submit-expander')
							.data('tlg-submit-expander', true);
						
						// close
						if ($expanderBtn.attr('aria-expanded') === 'true') {
							$expanderBtn.click();
						}
					}, 50);
				}
				break;
				
			case 'unique':
				var $submitBtn = $btnGroup.find(MAIN_BUTTON_SUBMIT),
						text = $submitBtn.find('strong').text().trim(),
						type = text.toLowerCase().replace('-', '_');
				
				var fakeLi = `
					<li>
						<div>
							<div tabindex="0" style="width: 100%;">
								<div class="flex">
									<div style="background-color: ${TYPES[type]}"></div>
									<span class="space"> </span>
									<span>Submit as <strong>${text}</strong></span>
								</div>
							</div>
						</div>
					</li>`;
				$newButtonGroup.append(createMenuExpanderItem($(fakeLi), $btnGroup));

				$btnGroup
					.append($newButtonGroup)
					.addClass('tlg-submit-expander')
					.data('tlg-submit-expander', true);
				break;
		}
	}
}

function createMenuExpanderItem($li, $btnGroup) {
	var selectedItemText = $btnGroup.find(MAIN_BUTTON_SUBMIT).text().trim().toLowerCase();
	var classes = '';

	// edit menu HTML
	var $liHtml = $($li.html());
	$liHtml.find('span').prevAll('div').addClass('color-item');
	
	if ($liHtml.text().trim().toLowerCase() === selectedItemText) {
		classes = 'active';
	}
	$liHtml.find('span').each(function (index, el) {
		$(el).html($(el).html().replace('Submit as', ''));
	});
	// end edit menu HTML

	var $button = $('<button/>', {
		type: 'button',
		html: $liHtml,
		class: classes
	});

	$button.data('target', '#' + $li.attr('id'));
	$button.on('click', function (event) {
		event.preventDefault();
		executeSubmit($(this));
	});
	return $button;
}

function executeSubmit($self) {
	
	Swal.fire({
		title: 'Are you sure you want to continue?',
		text: "The answer you entered will be sent to the customer and can not be changed.",
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#A6BD09',
		cancelButtonColor: '#979797',
		confirmButtonText: 'Confirm',
		reverseButtons: true,
		width: '20rem'
	}).then((result) => {
		if (result.value) {
			var $thisExpanderBtn = $self.closest('.tlg-submit-expander').find(EXPANDER_BUTTON_SELECTOR);
			if ($thisExpanderBtn.length) $thisExpanderBtn.click();

			setTimeout(() => {
				var $clickTarget = $(EXPANDED_MENU_SELECTOR).find($self.data('target'));
				if (!$clickTarget.length) {
					$clickTarget = $self.closest('.tlg-submit-expander').find(MAIN_BUTTON_SUBMIT);
				}
				console.log('TLmanaGer Zendesk: submit:', $clickTarget);
				$clickTarget.click();
			}, 75);
		}
	})
}

chrome.storage.sync.get({ optZenTicketConfirm: defaults.optZenTicketConfirm }, function (result) {
	if (result.optZenTicketConfirm) {
		var sto_changing = setTimeout(function () {
			updateSubmits();
		}, 50);

		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				clearTimeout(sto_changing);
				sto_changing = setTimeout(function () {
					updateSubmits();
				}, 50);
			});
		});

		var config = {
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true
		};

		$('.ember-view').each(function (index, el) {
			observer.observe(el, config);
		});
	}
});