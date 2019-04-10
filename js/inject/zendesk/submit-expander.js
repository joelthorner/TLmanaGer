const BUTTON_GROUP_SELECTOR = '.ticket-resolution-footer div[data-garden-id="buttons.button_group_view"]';
const EXPANDER_BUTTON_SELECTOR = '[data-garden-id="buttons.icon_button"]';
const EXPANDED_MENU_SELECTOR = '[data-garden-id="menus.menu_view"]';
const MAIN_BUTTON_SUBMIT = '[data-garden-id="buttons.button"]';

const swalConfig = {
	title: chrome.i18n.getMessage('zenDesk_preventTicketSubmit_title'),
	text: chrome.i18n.getMessage('zenDesk_preventTicketSubmit_message'),
	type: 'question',
	showCancelButton: true,
	confirmButtonColor: '#A6BD09',
	cancelButtonColor: '#979797',
	confirmButtonText: 'Confirm',
	reverseButtons: true,
	width: '20rem'
};

const ZENDESKSATUSTYPES = {
	new: '#ffb648',
	open: '#e34f32',
	pending: '#3091ec',
	on_hold: '#2f3941',
	solved: '#87929d'
};

var submitExpanderPopup;

function submitExpander_init(submitExpanderPopup_active) {
	submitExpanderPopup = submitExpanderPopup_active;

	$(BUTTON_GROUP_SELECTOR).each(function (index, el) {
		// if button is visible
		if ($(el).closest('.ember-view').is(':visible')) { 
			// menu expander is not disabled
			if (!$(el).find(EXPANDER_BUTTON_SELECTOR).prop('disabled')) { 
				submitExpander_createMenuExpander('full', $(el));
			} else {
				submitExpander_createMenuExpander('unique', $(el));
			}
		}
	});
}

function submitExpander_createMenuExpander(type, $btnGroup) {
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
							$newButtonGroup.append(submitExpander_createMenuExpanderItem($(li), $btnGroup));
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
									<div style="background-color: ${ZENDESKSATUSTYPES[type]}"></div>
									<span class="space"> </span>
									<span>Submit as <strong>${text}</strong></span>
								</div>
							</div>
						</div>
					</li>`;
				$newButtonGroup.append(submitExpander_createMenuExpanderItem($(fakeLi), $btnGroup));

				$btnGroup
					.append($newButtonGroup)
					.addClass('tlg-submit-expander')
					.data('tlg-submit-expander', true);
				break;
		}
	}
}

function submitExpander_createMenuExpanderItem($li, $btnGroup) {
	var selectedItemText = $btnGroup.find(MAIN_BUTTON_SUBMIT).text().trim().toLowerCase();
	var classes = '';

	var $liHtml = $($li.html());
	$liHtml.find('span').prevAll('div').addClass('color-item');
	
	if ($liHtml.text().trim().toLowerCase() === selectedItemText) {
		classes = 'active';
	}
	$liHtml.find('span').each(function (index, el) {
		$(el).html($(el).html().replace('Submit as', ''));
	});

	var $button = $('<button/>', {
		type: 'button',
		html: $liHtml,
		class: classes
	});
	$button.data('target', '#' + $li.attr('id'));
	$button.on('click', function (event) {
		event.preventDefault();
		submitExpander_executeSubmit($(this));
	});
	return $button;
}

function submitExpander_executeSubmit($self) {

	function submitExpander_executeClick() {
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

	if (submitExpanderPopup) {
		Swal.fire(swalConfig).then((result) => {
			if (result.value) submitExpander_executeClick();
		});
	} else {
		submitExpander_executeClick();
	}
}