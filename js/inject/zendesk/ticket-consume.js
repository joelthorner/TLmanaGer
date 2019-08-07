TicketConsume = {

	init: function () {
		var ticketConsume_isTop = true;

		chrome.runtime.onMessage.addListener(function (details) {
			log('Message from frame: ' + details);
			console.log(JSON.parse(details));
			var data = JSON.parse(details);
			TicketConsume.evalCloseClosedMenu();
			console.log(TicketConsume.getBadge(data));
		});
	},

	getBadge: function (data) {
		return `
			<span class="TLmanaGer_ticketConsume_badge">
			SLA ${data.sla.toUpperCase()} - ${data.nTiquets}/${6} TICKETS
			</span>
			<span class="TLmanaGer_ticketConsume_checkedAgo">
				<span class="TLmanaGer_ticketConsume_checkedAgo_lbl">Last check</span>
				<span class="TLmanaGer_ticketConsume_checkedAgo_text">${moment(data.check).fromNow()}</span>
			</span>
		`;
	},

	observer: function (mutation) {
		if (mutation.addedNodes.length) {
			var $appsBtn = $(mutation.target).find('.apps-button');
			// has apps menu
			if ($appsBtn.length) {
				// already apps opened menu
				if ($appsBtn.hasClass('active')) {
					// do nothing 4 moment
			
					
				// apps menu is closed, open get iframe and close
				} else {
					if ($appsBtn.data('before-closed') !== true) {	
						$appsBtn.data('before-closed', true);
						TicketConsume.toggleAppsMenu($appsBtn, 'hide');
						$appsBtn.click();
					}
				}
			}
		}
	},

	// mode is 'hide' or 'reset'
	toggleAppsMenu: function ($appsBtn, mode) {
		let $appsMenu = $appsBtn.closest('.ember-view.workspace').find('.ember-view.apps');
		let $pane = $appsBtn.closest('.ember-view.workspace').find('.pane.right.section');
		
		if (mode == 'hide') {
			$appsMenu.css({ left: -400 });
			$pane.css({ right: 0 });
		} else {
			$pane.css({ right: '' });
		}
	},

	evalCloseClosedMenu: function () {
		$('.apps-button').each(function(index, el) {
			if ($(el).data('before-closed') === true && $(el).hasClass('active')) {
				$(el).click();
				TicketConsume.toggleAppsMenu($(el), 'reset');
			}
		});
	}
};