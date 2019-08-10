/**
 * TicketConsume.
 *
 * Object for count client opened tickets in a month
 * More information: https://github.com/joelthorner/TLmanaGer/wiki/Ticket-consume-(Zendesk) .
 *
 * @since      08.08.19
 */
TicketConsume = {
	debug: true,
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
	clientsCsutomData: {},
	
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
			var orgName = $(event.target).data('org');
			var title = chrome.i18n.getMessage('zenDesk_tiketConsume_title')
				.replace('%organization%', orgName.toUpperCase())
				.replace('%month%', moment().format('MMMM YYYY'));
			var message = chrome.i18n.getMessage('zenDesk_tiketConsume_message');
			var customData = TicketConsume.clientsCsutomData[orgName];
			var existingRows = '';

			$.each(customData, function (index, obj) {
				existingRows+= `
					<tr>
						<td data-user>${obj.user}</td>
						<td data-num>${obj.mod}</td>
						<td data-date>${obj.date}</td>
						<td data-reason>${obj.reas}</td>
						<td data-action="delete">
							<button type="button" data-action-btn="delete"><svg viewBox="0 0 16 16" id="zd-svg-icon-16-x-circle-stroke"><g fill="none" stroke="currentColor"><circle cx="7.5" cy="8.5" r="7" stroke-linejoin="round"></circle><path stroke-linecap="round" d="M4.5 11.5l6-6m0 6l-6-6"></path></g></svg></button>
						</td>
					</tr>`;
			});
			
			Swal.fire({
				// title: '<strong>HTML <u>example</u></strong>',
				// type: 'info',
				html: `
					<div id="swal2-content" style="display: block;">${message}</div>
					<table class="TLmanaGer_ticketConsume_table table">
						<thead>
							<tr>
								<th>User</th>
								<th>Modification</th>
								<th>Date</th>
								<th>Reason</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td data-user="new">
									<input type="text" class="form-control TLmanaGer_ticketConsume_user" placeholder="John doe">
								</td>
								<td data-num="new">
									<input type="number" class="form-control TLmanaGer_ticketConsume_num" placeholder="0">
								</td>
								<td data-date="new">
									<input type="date" class="form-control TLmanaGer_ticketConsume_num">
								</td>
								<td data-reason="new">
									<input type="text" class="form-control TLmanaGer_ticketConsume_reason" placeholder="Lorem ipsum">
								</td>
								<td data-action="new">
									<button type="button" data-action-btn="new"><svg viewBox="0 0 16 16" id="zd-svg-icon-16-plus-circle-stroke"><circle cx="7.5" cy="8.5" r="7" fill="none" stroke="currentColor"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" d="M7.5 4.5v8m4-4h-8"></path></svg></button>
								</td>
							</tr>
							${existingRows}
						</tbody>
					</table>
				`,
				// showCloseButton: true,
				// showCancelButton: true,
				// focusConfirm: false,
				// confirmButtonText:
				// 	'<i class="fa fa-thumbs-up"></i> Great!',
				// confirmButtonAriaLabel: 'Thumbs up, great!',
				// cancelButtonText:
				// 	'<i class="fa fa-thumbs-down"></i>',
				// cancelButtonAriaLabel: 'Thumbs down'
				// <svg id="zd-svg-icon-16-clipboard-check-stroke"><use xlink:href="../index.svg#zd-svg-icon-16-clipboard-check-stroke"></use></svg>
				// title: '<svg viewBox="0 0 16 16" id="zd-svg-icon-16-clipboard-check-stroke" width="100%" height="100%"><path fill="none" stroke="currentColor" stroke-linecap="round" d="M.88 13.77L7.06 1.86c.19-.36.7-.36.89 0l6.18 11.91c.17.33-.07.73-.44.73H1.32c-.37 0-.61-.4-.44-.73zM7.5 6v3.5"></path><circle cx="7.5" cy="12" r="1" fill="currentColor"></circle></svg>' +
				title: '<svg viewBox="0 0 16 16" id="zd-svg-icon-16-clipboard-check-stroke" width="100%" height="100%"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4.5 2.5H2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h12c.28 0 .5-.22.5-.5V3c0-.28-.22-.5-.5-.5h-2.5m-6.5 8l2 2L11.5 8m-.05-3.5c.02-.16.05-.33.05-.5C11.5 2.07 9.93.5 8 .5S4.5 2.07 4.5 4c0 .17.03.34.05.5h6.9z"></path></svg>' +
					title,
				// text: chrome.i18n.getMessage('zenDesk_tiketConsume_message'),
				showCancelButton: false,
				confirmButtonColor: '#A6BD09',
				confirmButtonText: 'Confirm',
				// confirmButtonColor: '#A6BD09',
				// cancelButtonColor: '#979797',
				// confirmButtonText: 'Confirm',
				// reverseButtons: true,
				width: '65rem',
				customClass: {
					container: 'swal-zendesk-popup swal-zendesk-ticket-consume'
				}
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

	getBadge: function (data, orgName) {
		var levels = TicketConsume.slas[data.sla].levels, color = '';
		$.each(levels, function(index, this_color) {
			if (data.tickets >= index) color = this_color;
		});

		return `
			<span class="TLmanaGer_ticketConsume_badge_cont">
				<button type="button" class="TLmanaGer_ticketConsume_edit" data-org="${orgName}"></button>
				<span class="TLmanaGer_ticketConsume_badge TLmanaGer_ticketConsume_badge_${color}">
					SLA ${data.sla} - ${data.tickets}/${TicketConsume.slas[data.sla].tiquets} TICKETS
				</span>
				<span class="TLmanaGer_ticketConsume_checkedAgo">
					<span class="TLmanaGer_ticketConsume_checkedAgo_lbl">Last check</span>
					<span class="TLmanaGer_ticketConsume_checkedAgo_text" data-time="0">${TicketConsume.getSecondsAgo()}</span>
				</span>
			</span>`;
	},

	// get info from org notes and save org data to variable
	getCustomData: function ($btn, orgName) {
		var $workspace = $btn.closest('.ember-view.workspace');
		var $orgPaneDetails = $workspace.find('.split_pane.organization .property_box.details');
		var $oldActive = undefined;

		if (!$btn.hasClass('active')) {
			$oldActive = $btn.closest('.ember-view.btn-group').children('.active');
			$btn.click();
		} else {
			TicketConsume.getCustomDataJson($orgPaneDetails, $oldActive, orgName);
		}
		$orgPaneDetails.on('DOMSubtreeModified', function () {
			TicketConsume.getCustomDataJson($(this), $oldActive, orgName);
		});
	},

	getCustomDataJson: function ($el, $oldActive, orgName) {
		
		$el.children('.ember-view').each(function () {
			if ($(this).find('label').text().trim().toLowerCase() == 'notes') {
				var value = $(this).find('.value').html(), json = {};
				value = value.split('TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS');
				if (value[1]) {
					json = JSON.parse(value[1]);
					TicketConsume.clientsCsutomData[orgName] = json;
				}
				if (typeof $oldActive !== 'undefined') $oldActive.click();
			}
		});
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
						var badge = TicketConsume.getBadge(TicketConsume.data[orgName], orgName);
						TicketConsume.appendBadge(badge, $orgNavbarTicket.closest('nav.btn-group'));
						TicketConsume.getCustomData($orgNavbarTicket, orgName);
						if (!TicketConsume.debug) TicketConsume.initIntervals();
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
				var badge = TicketConsume.getBadge(TicketConsume.data[orgName], orgName);
				$nav.find('.TLmanaGer_ticketConsume_badge_cont').remove();
				TicketConsume.appendBadge(badge, $nav);
				TicketConsume.getCustomData($(this), orgName);
			}
		});
	}
};