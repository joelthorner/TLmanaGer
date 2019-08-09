/**
 * TicketConsume.
 *
 * Object for count client opened tickets in a month
 * More information: https://github.com/joelthorner/TLmanaGer/wiki/Ticket-consume-(Zendesk) .
 *
 * @since      08.08.19
 */
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
		platinium: {
			tiquets: 10,
			levels: {
				9: 'green',
				10: 'yellow',
				11: 'red'
			}
		}
	},

	siChecker: null,
	stoChecker: null,
	data: {},
	secondsUpdate: 1,
	
	init: function (active) {
		if (active) {
			var ticketConsume_isTop = true; // no remove
			TicketConsume.insertIframe();
			TicketConsume.globalEvents();
			chrome.runtime.onMessage.addListener(function (details) {
				log('TicketConsume: ' + details);
				try {
					var data = JSON.parse(details);
					TicketConsume.data = data;
				} catch (error) {
					log('TicketConsume invalid data', 'danger');
				}
			});
		}
	},

	globalEvents : function() {
		$(document).on('click', '.TLmanaGer_ticketConsume_edit', function(event) {
			Swal.fire({
				title: '<strong>HTML <u>example</u></strong>',
				type: 'info',
				html:
					'You can use <b>bold text</b>, ' +
					'<a href="//sweetalert2.github.io">links</a> ' +
					'and other HTML tags',
				showCloseButton: true,
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonText:
					'<i class="fa fa-thumbs-up"></i> Great!',
				confirmButtonAriaLabel: 'Thumbs up, great!',
				cancelButtonText:
					'<i class="fa fa-thumbs-down"></i>',
				cancelButtonAriaLabel: 'Thumbs down'
			})
		});
	},

	insertIframe : function() {
		$('body')
			.append(
				'<iframe src="https://joelthorner.github.io/temp/?refresh=1" class="TlmanaGer_consumeIframe"></iframe>'
			);
	},
	
	appendBadge : function (badge, $navbar) {
		$navbar.find('.TLmanaGer_ticketConsume_badge_cont').remove();
		$navbar.append(badge);
	},

	getSecondsAgo : function(rawData) {
		return TicketConsume.secondsUpdate + ' seconds ago';
	},

	refreshTimeAgo : function () {
		$('.TLmanaGer_ticketConsume_checkedAgo_text').each(function () {
			var secondsAgo = TicketConsume.getSecondsAgo();
			$(this).text(secondsAgo);
		});
	},

	initIntervals : function() {
		clearInterval(TicketConsume.siChecker);
		TicketConsume.siChecker = setInterval(() => {
			TicketConsume.secondsUpdate++;
			TicketConsume.refreshTimeAgo();
		}, 1000); // 1"

		clearTimeout(TicketConsume.stoChecker);
		TicketConsume.stoChecker = setInterval(() => {
			$('.TlmanaGer_consumeIframe').attr('src', function () {
				if ($(this).attr('src').includes('?')) refreshGetSymb = '&';
				else refreshGetSymb = '?';
				return $(this).attr('src') + refreshGetSymb + 'refresh=' + new Date().getUTCMilliseconds();
			});
			TicketConsume.secondsUpdate = 1;
			TicketConsume.updateAllBadges();
		}, 10000); // 10"
	},

	getBadge: function (data) {
		var levels = TicketConsume.slas[data.sla].levels, color = '';
	
		$.each(levels, function(index, this_color) {
			if (data.tickets >= index) color = this_color;
		});
		
		return `
			<span class="TLmanaGer_ticketConsume_badge_cont">
				<button type="button" class="TLmanaGer_ticketConsume_edit"></button>
				<span class="TLmanaGer_ticketConsume_badge TLmanaGer_ticketConsume_badge_${color}">
					SLA ${data.sla} - ${data.tickets}/${TicketConsume.slas[data.sla].tiquets} TICKETS
				</span>
				<span class="TLmanaGer_ticketConsume_checkedAgo">
					<span class="TLmanaGer_ticketConsume_checkedAgo_lbl">Last check</span>
					<span class="TLmanaGer_ticketConsume_checkedAgo_text" data-time="0">${TicketConsume.getSecondsAgo()}</span>
				</span>
			</span>`;
	},

	observer: function (active, mutation) {
		if (active && mutation.addedNodes.length) {
			
			var $orgNavbarTicket = $(mutation.target).find('[data-tracking-id="tabs-nav-item-organizations"]');
			if ($orgNavbarTicket.length) {
				
				var $badge = $orgNavbarTicket.closest('nav.btn-group').find('.TLmanaGer_ticketConsume_badge_cont');
				if (!$badge.length) {
					
					var orgName = $orgNavbarTicket.text().toLowerCase().trim();
					if (TicketConsume.data.hasOwnProperty(orgName)) {
						log('TicketConsume append badge ' + orgName + ' ' + JSON.stringify(TicketConsume.data[orgName]));
						var badge = TicketConsume.getBadge(TicketConsume.data[orgName]);
						TicketConsume.appendBadge(badge, $orgNavbarTicket.closest('nav.btn-group'));
						// TicketConsume.initIntervals();
					}
				}
			}
		}
	},

	updateAllBadges : function () {
		$('[data-tracking-id="tabs-nav-item-organizations"]').each(function () {
			var orgName = $(this).text().toLowerCase().trim();
			if (TicketConsume.data.hasOwnProperty(orgName)) {
				var $nav = $(this).closest('nav.btn-group');
				var badge = TicketConsume.getBadge(TicketConsume.data[orgName]);
				$nav.find('.TLmanaGer_ticketConsume_badge_cont').remove();
				TicketConsume.appendBadge(badge, $nav);
			}
		});
	}
};