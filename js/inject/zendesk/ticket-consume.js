TicketConsume = {

	slas: {
		silver: {
			tiquets: 4,
			levels: {
				3: 'green',
				4: 'yellow',
				5: 'red'
			}
		},
		gold: {
			tiquets: 6,
			levels: {
				5: 'green',
				6: 'yellow',
				7: 'red'
			}
		},
		platinum: {
			tiquets: 10,
			levels: {
				9: 'green',
				10: 'yellow',
				11: 'red'
			}
		}
	},

	init: function () {
		var ticketConsume_isTop = true; // no remove

		chrome.runtime.onMessage.addListener(function (details) {
			log('Message from frame: ' + details);
			var data = JSON.parse(details);
			TicketConsume.evalCloseClosedMenu();
			var badge = TicketConsume.getBadge(data);
			$('[data-tracking-id="tabs-nav-item-organizations"]').each(function() {
				if ($(this).text().toLowerCase().trim() == data.client) {
					var $nav = $(this).closest('nav.btn-group');
					$nav.find('.TLmanaGer_ticketConsume_badge_cont').remove();
					$nav.append(badge);
				}
			});
		});
	},

	getBadge: function (data) {
		var levels = TicketConsume.slas[data.sla].levels,
				color = '';

		data.nTiquets = 0;
		
		$.each(levels, function(index, this_color) {
			console.log(data.nTiquets, index, this_color);
			
			if (data.nTiquets >= index) {
				color = this_color;
			}
		});
		
		return `
			<span class="TLmanaGer_ticketConsume_badge_cont">
				<span class="TLmanaGer_ticketConsume_badge TLmanaGer_ticketConsume_badge_${color}">
					SLA ${data.sla.toUpperCase()} - ${data.nTiquets}/${TicketConsume.slas[data.sla].tiquets} TICKETS
				</span>
				<span class="TLmanaGer_ticketConsume_checkedAgo">
					<span class="TLmanaGer_ticketConsume_checkedAgo_lbl">Last check</span>
					<span class="TLmanaGer_ticketConsume_checkedAgo_text">${moment(data.check).fromNow()}</span>
				</span>
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