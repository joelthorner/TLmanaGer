var log = chrome.i18n.getMessage('commandExecuted_message');

function openPanelCustomerContext() {
	var $panel = $('.ember-view.ticket-sidebar:visible');
	$panel.find('[data-test-id="customer-context-tab-ticket"]').click();

	return $panel;
}

function panelCustomerContextToggleCheck(id, $panel) {
	setTimeout(() => {
		var $check = $panel.find('.custom_field_' + id + ' .ember-checkbox');
		if ($check.length) {
			$panel.find('.sidebar_box_container').scrollTop($check.position().top);
			$check.click();
		}
	}, 100);
}

hotkeys('ctrl+shift+alt+a,command+shift+alt+a', function (event, handler) {
	console.log(log.replace('%command%', 'zendesk-assignee-focus ' + handler.key));

	var $paneTabTicket = openPanelCustomerContext();
	setTimeout(() => {
		$paneTabTicket
			.find('.assignee_id .zd-selectmenu-base, .assignee_id .zd-searchmenu-base')
			.focus();
	}, 100);
});

hotkeys('ctrl+shift+alt+t,command+shift+alt+t', function (event, handler) {
	console.log(log.replace('%command%', 'zendesk-ticket-type-focus ' + handler.key));

	var $paneTabTicket = openPanelCustomerContext();
	setTimeout(() => {
		$paneTabTicket
			.find('.ticket_type_id .zd-selectmenu-base, .ticket_type_id .zd-selectmenu-focus-proxy')
			.focus();
	}, 100);
});

hotkeys('ctrl+shift+alt+p,command+shift+alt+p', function (event, handler) {
	console.log(log.replace('%command%', 'zendesk-ticket-priority-focus ' + handler.key));

	var $paneTabTicket = openPanelCustomerContext();
	setTimeout(() => {
		$paneTabTicket
			.find('.priority_id .zd-selectmenu-base, .priority_id .zd-selectmenu-focus-proxy')
			.focus();
	}, 100);
});

hotkeys('ctrl+shift+alt+c,command+shift+alt+c', function (event, handler) {
	console.log(log.replace('%command%', 'zendesk-toggle-check-comment-cc-team ' + handler.key));

	var $paneTabTicket = openPanelCustomerContext();
	panelCustomerContextToggleCheck(360016944932, $paneTabTicket);
});

hotkeys('ctrl+shift+alt+d,command+shift+alt+d', function (event, handler) {
	console.log(log.replace('%command%', 'zendesk-toggle-check-doubts ' + handler.key));
	
	var $paneTabTicket = openPanelCustomerContext();
	panelCustomerContextToggleCheck(360016976631, $paneTabTicket);
});

// tabs commands
var $selectedTab, blur_i, blur_o;
var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.addedNodes.length) {
			var $findedTabSelected = $(mutation.target).find('.tab.selected');
			if ($findedTabSelected.length) {
				$selectedTab = $findedTabSelected;
			}
		}
	});
});

observer.observe($('#tabs')[0], {
	attributes: false,
	childList: true,
	characterData: false,
	subtree: true
});

$(document).on('click', '#tabs li', function(event) {
	$selectedTab = $(this);
});
$(document).on('click', function (event) {
	clearTimeout(blur_o);
	clearInterval(blur_i);
});

hotkeys('ctrl+alt+9,command+alt+9,ctrl+alt+0,command+alt+0', function (event, handler) {
	console.log(log.replace('%command%', 'zendesk-tab-' + type + ' ' + handler.key));
	
	var type = 'next';
	if (handler.key == 'ctrl+alt+9' || handler.key == 'command+alt+9')
		type = 'prev';

	var $temp = $selectedTab[type]();
	if ($temp.length && !$temp.is('.add')) {
		$temp.click();
		
		clearTimeout(blur_o);
		clearInterval(blur_i);
		blur_i = setInterval(() => { $('*').blur(); }, 1);
		blur_o = setTimeout(() => { clearInterval(blur_i); }, 1000);
	}
});