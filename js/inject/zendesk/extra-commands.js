ExtraCommands = {

	timeout : null,
	interval: null,
	$selectedTab: undefined,

	init: function () {
		this.logMessage = chrome.i18n.getMessage('commandExecuted_message');
		this.run();
	},

	run: function() {
		this.setTicketKeyCommands();
		this.setTabNavKeyCommands();
		this.documentEvents();
	},

	documentEvents: function () {
		$(document).on('click.ExtraCommandsTabLi', '#tabs li', function (event) {
			ExtraCommands.$selectedTab = $(this);
		});

		$(document).on('click.ExtraCommandsClearFocus', function (event) {
			ExtraCommands.clearAllTimings();
		});
	},

	clearAllTimings: function () {
		clearTimeout(ExtraCommands.timeout);
		clearInterval(ExtraCommands.interval);
	},

	onFindTabSelected: function (mutation) {
		if (mutation.addedNodes.length) {
			var $selectedTab = $(mutation.target).find('.tab.selected');
			if ($selectedTab.length) ExtraCommands.$selectedTab = $selectedTab;
		}
	},

	setTicketKeyCommands: function () {
		hotkeys('ctrl+shift+alt+a,command+shift+alt+a', function (event, handler) {
			console.log(ExtraCommands.logMessage.replace('%command%', 'zendesk-assignee-focus ' + handler.key));
			ExtraCommands.focusOnPanelCustomer({
				'.assignee_id .zd-selectmenu-base': { event: 'focus', scrollTo: false },
				'.assignee_id .zd-searchmenu-base': { event: 'focus', scrollTo: false }
			});
		});

		hotkeys('ctrl+shift+alt+t,command+shift+alt+t', function (event, handler) {
			console.log(ExtraCommands.logMessage.replace('%command%', 'zendesk-ticket-type-focus ' + handler.key));
			ExtraCommands.focusOnPanelCustomer({
				'.ticket_type_id .zd-selectmenu-base': { event: 'focus', scrollTo: false },
				'.ticket_type_id .zd-selectmenu-focus-proxy': { event: 'focus', scrollTo: false }
			});
		});

		hotkeys('ctrl+shift+alt+p,command+shift+alt+p', function (event, handler) {
			console.log(ExtraCommands.logMessage.replace('%command%', 'zendesk-ticket-priority-focus ' + handler.key));
			ExtraCommands.focusOnPanelCustomer({
				'.priority_id .zd-selectmenu-base': { event: 'focus', scrollTo: false },
				'.priority_id .zd-selectmenu-focus-proxy': { event: 'focus', scrollTo: false }
			});
		});

		hotkeys('ctrl+shift+alt+c,command+shift+alt+c', function (event, handler) {
			console.log(ExtraCommands.logMessage.replace('%command%', 'zendesk-toggle-check-comment-cc-team ' + handler.key));
			ExtraCommands.focusOnPanelCustomer({
				'.custom_field_360016944932 .ember-checkbox': { event: 'click', scrollTo: true }
			});
		});

		hotkeys('ctrl+shift+alt+d,command+shift+alt+d', function (event, handler) {
			console.log(ExtraCommands.logMessage.replace('%command%', 'zendesk-toggle-check-doubts ' + handler.key));
			ExtraCommands.focusOnPanelCustomer({
				'.custom_field_360016976631 .ember-checkbox': { event: 'click', scrollTo: true }
			});
		});
	},

	focusOnPanelCustomer: function(elements) {
		var $panel = $('.ember-view.ticket-sidebar:visible');
		$panel.find('[data-test-id="customer-context-tab-ticket"]').click();
		$('*').blur();

		setTimeout(() => {
			$.each(elements, function (selector, obj) {
				var $el = $panel.find(selector);
				if ($el.length) {
					if (obj.scrollTo) $panel.find('.sidebar_box_container').scrollTop($el.position().top);
					$el[obj.event]();
				}
			});
		}, 100);
	},

	setTabNavKeyCommands: function () {
		hotkeys('ctrl+alt+9,command+alt+9,ctrl+alt+0,command+alt+0', function (event, handler) {
			var type = handler.key == 'ctrl+alt+9' || handler.key == 'command+alt+9' ? 'prev' : 'next';
			
			console.log(ExtraCommands.logMessage.replace('%command%', 'zendesk-tab-' + type + ' ' + handler.key));

			var $temp = ExtraCommands.$selectedTab[type]();
			console.log($temp);
			
			if ($temp.length && !$temp.is('.add')) {
				$temp.click();

				ExtraCommands.clearAllTimings();
				ExtraCommands.interval = setInterval(() => { $('*').blur(); }, 1);
				ExtraCommands.timeout = setTimeout(() => { clearInterval(ExtraCommands.interval); }, 2000);
			}
		});
	}
};