async function TicketConsume_showOrganization(id) {
	// https://developer.zendesk.com/rest_api/docs/support/organizations#show-organization
	const rawResponse = await fetch(`/api/v2/organizations/${id}`, {
		method: 'GET',
		headers: {
			'x-csrf-token': ZendeskGeneral.apiToken,
			'Content-Type': 'application/json'
		}
	});
	let data = await rawResponse.json();
	return data;
};

async function TicketConsume_showManyOrganizations(idList) {
	// https://developer.zendesk.com/rest_api/docs/support/organizations#show-many-organizations
	const rawResponse = await fetch(`/api/v2/organizations/show_many?ids=${idList}`, {
		method: 'GET',
		headers: {
			'x-csrf-token': ZendeskGeneral.apiToken,
			'Content-Type': 'application/json'
		}
	});
	let data = await rawResponse.json();
	return data;
};

async function TicketConsume_updateOrganization(id, obj) {
	// https://developer.zendesk.com/rest_api/docs/support/organizations#update-organization
	const rawResponse = await fetch(`/api/v2/organizations/${id}`, {
		method: 'PUT',
		headers: {
			'x-csrf-token': ZendeskGeneral.apiToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	});
	let data = await rawResponse.json();
	return data;
};


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

		$(document).on('click', '.TLmanaGer_ticketConsume_table [data-action-btn="new"]', function(event) {
			let orgName = $(this).data('org'),
				validRow = true,
				$row = $(this).closest('tr');

			$row.find('input').each(function (index, el) {
				if (!el.checkValidity()) validRow = false;
			});

			if (validRow) {
				let newObj = {
					id: new Date().getTime(),
					date: $row.find('input.TLmanaGer_ticketConsume_date').val(),
					mod: parseInt($row.find('input.TLmanaGer_ticketConsume_num').val()),
					reas: $row.find('input.TLmanaGer_ticketConsume_reason').val(),
					user: $row.find('input.TLmanaGer_ticketConsume_user').val()
				};
				TicketConsume.data[orgName].customData.push(newObj);
	
				TicketConsume_showOrganization(TicketConsume.data[orgName].id).then((responseData) => {
					let newData = TicketConsume.getNotesText(responseData.organization.notes);
					newData += 'TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS\n';
					newData += JSON.stringify(TicketConsume.data[orgName].customData);

					TicketConsume_updateOrganization(TicketConsume.data[orgName].id, { 
						"organization": { "notes": newData } 
					}).then((responseData) => {
						$('.TLmanaGer_ticketConsume_table tbody tr[data-tr="new"]').after(`
							<tr class="TLmanaGer_ticketConsume_table__row">
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-user>${newObj.user}</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-num>${newObj.mod}</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-date>${newObj.date}</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-reason>${newObj.reas}</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-action="delete">
									<button type="button" data-action-btn="delete" data-id="${newObj.id}" data-org="${orgName}">
										<svg viewBox="0 0 16 16" id="zd-svg-icon-16-x-circle-stroke"><g fill="none" stroke="currentColor"><circle cx="7.5" cy="8.5" r="7" stroke-linejoin="round"></circle><path stroke-linecap="round" d="M4.5 11.5l6-6m0 6l-6-6"></path></g></svg>
									</button>
								</td>
							</tr>`);
						TicketConsume.updateNotesHtmlNode(responseData.organization);
					});
				});
			}
		});

		$(document).on('click', '.TLmanaGer_ticketConsume_table [data-action-btn="delete"]', function (event) {
			let orgName = $(this).data('org'),
				id = $(this).data('id'),
				$row = $(this).closest('tr');

			$.each(TicketConsume.data[orgName].customData, function (index, val) {
				if (val.id == id) TicketConsume.data[orgName].customData.splice(index, 1);
			});

			TicketConsume_showOrganization(TicketConsume.data[orgName].id).then((responseData) => {
				let newData = TicketConsume.getNotesText(responseData.organization.notes);
				
				if (TicketConsume.data[orgName].customData.length) {
					newData += 'TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS\n';
					newData += JSON.stringify(TicketConsume.data[orgName].customData);
				}

				TicketConsume_updateOrganization(TicketConsume.data[orgName].id, {
					"organization": { "notes": newData }
				}).then((responseData) => {
					$row.remove();
					TicketConsume.updateNotesHtmlNode(responseData.organization);
				});
			});
		});

		// this is fine but refactoring is needed
		$(document).on('click', '.TLmanaGer_ticketConsume_edit', function(event) {
			let orgName = $(event.target).data('org'),
				modalIcon = '<svg viewBox="0 0 16 16" width="100%" height="100%"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4.5 2.5H2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h12c.28 0 .5-.22.5-.5V3c0-.28-.22-.5-.5-.5h-2.5m-6.5 8l2 2L11.5 8m-.05-3.5c.02-.16.05-.33.05-.5C11.5 2.07 9.93.5 8 .5S4.5 2.07 4.5 4c0 .17.03.34.05.5h6.9z"></path></svg>',
				modalTitle = chrome.i18n.getMessage('zenDesk_tiketConsume_title')
					.replace('%organization%', orgName.charAt(0).toUpperCase() + orgName.slice(1))
					.replace('%month%', moment().format('MMMM YYYY')),
				modalMessage = chrome.i18n.getMessage('zenDesk_tiketConsume_message'),
				data = TicketConsume.data[orgName],
				existingRows = '';

			$.each(data.customData, function (index, obj) {
				existingRows += `
					<tr class="TLmanaGer_ticketConsume_table__row">
						<td class="TLmanaGer_ticketConsume_table__row__cell" data-user>${obj.user}</td>
						<td class="TLmanaGer_ticketConsume_table__row__cell" data-num>${obj.mod}</td>
						<td class="TLmanaGer_ticketConsume_table__row__cell" data-date>${obj.date}</td>
						<td class="TLmanaGer_ticketConsume_table__row__cell" data-reason>${obj.reas}</td>
						<td class="TLmanaGer_ticketConsume_table__row__cell" data-action="delete">
							<button type="button" data-action-btn="delete" data-id="${obj.id}" data-org="${orgName}">
								<svg viewBox="0 0 16 16" id="zd-svg-icon-16-x-circle-stroke"><g fill="none" stroke="currentColor"><circle cx="7.5" cy="8.5" r="7" stroke-linejoin="round"></circle><path stroke-linecap="round" d="M4.5 11.5l6-6m0 6l-6-6"></path></g></svg>
							</button>
						</td>
					</tr>`;
			});
			
			Swal.fire({
				html: `
					<div id="swal2-content" style="display: block;">${modalMessage}</div>
					<table class="TLmanaGer_ticketConsume_table TLmanaGer_ticketConsume_table">
						<thead>
							<tr class="TLmanaGer_ticketConsume_table__row TLmanaGer_ticketConsume_table__row--header">
								<th class="TLmanaGer_ticketConsume_table__row__cell">User</th>
								<th class="TLmanaGer_ticketConsume_table__row__cell">Modification</th>
								<th class="TLmanaGer_ticketConsume_table__row__cell">Date</th>
								<th class="TLmanaGer_ticketConsume_table__row__cell">Reason</th>
								<th class="TLmanaGer_ticketConsume_table__row__cell">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr class="TLmanaGer_ticketConsume_table__row" data-tr="new">
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-user="new">
									<input type="text" class="c-txt__input TLmanaGer_ticketConsume_user" placeholder="John doe" required maxlength="16">
								</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-num="new">
									<input type="number" class="c-txt__input TLmanaGer_ticketConsume_num" placeholder="0" required min="-1" max="1">
								</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-date="new">
									<input type="date" class="c-txt__input c-txt__input--select TLmanaGer_ticketConsume_date" required>
								</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-reason="new">
									<input type="text" class="c-txt__input TLmanaGer_ticketConsume_reason" placeholder="Lorem ipsum" required maxlength="30">
								</td>
								<td class="TLmanaGer_ticketConsume_table__row__cell" data-action="new">
									<button type="button" data-action-btn="new" data-org="${orgName}">
										<svg viewBox="0 0 16 16" id="zd-svg-icon-16-plus-circle-stroke"><circle cx="7.5" cy="8.5" r="7" fill="none" stroke="currentColor"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" d="M7.5 4.5v8m4-4h-8"></path></svg>
									</button>
								</td>
							</tr>
							${existingRows}
						</tbody>
					</table>
				`,
				title: modalIcon + modalTitle,
				showCancelButton: false,
				showConfirmButton: false,
				width: '65rem',
				customClass: {
					container: 'swal-zendesk-popup swal-zendesk-ticket-consume'
				},
				onClose: () => {
					TicketConsume.updateAll();
				}
			})
		});
	},

	updateNotesHtmlNode: function (organization) {
		var orgName = organization.name.trim().toLowerCase();
		$('[data-org="' + orgName + '"]').closest('.workspace').find('.property_box.details label').each(function (index, el) {
			if ($(el).text().trim().toLowerCase() == orgName) {
				$(el).next('.editable').html(organization.notes);
			}
		});
	},

	// this need a good url
	insertIframe : function() {
		$('body').append(
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

	// updated
	getBadge: function (data, orgName) {
		let totalTiquets = data.tickets,
			levels = TicketConsume.slas[data.sla].levels, 
			color = '';

		$.each(data.customData, function(index, val) {
			totalTiquets += val.mod;
		});
		
		$.each(levels, function(index, this_color) {
			if (totalTiquets >= index) color = this_color;
		});

		return `
			<span class="TLmanaGer_ticketConsume_badge_cont">
				<button type="button" class="TLmanaGer_ticketConsume_edit" data-org="${orgName}"></button>
				<span class="TLmanaGer_ticketConsume_badge TLmanaGer_ticketConsume_badge_${color}">
					SLA ${data.sla} - ${totalTiquets}/${TicketConsume.slas[data.sla].tiquets} TICKETS
				</span>
				<span class="TLmanaGer_ticketConsume_checkedAgo">
					<span class="TLmanaGer_ticketConsume_checkedAgo_lbl">Last check</span>
					<span class="TLmanaGer_ticketConsume_checkedAgo_text" data-time="0">${TicketConsume.getSecondsAgo()}</span>
				</span>
			</span>`;
	},

	// updated
	parseOrganizationNotes: function(value) {
		let json = [],
			valueSplitted = value.trim().split('TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS');

		if (value.trim().length && valueSplitted) {
			json = valueSplitted[valueSplitted.length - 1];
			try {
				json = JSON.parse(json);
			} catch (error) {
				log(error.message, 'warning')
			}
		}
		return json;
	},

	// updated
	getNotesText : function(value) {
		let text = '',
			hasRecountValue = value.match(/TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS/),
			valueSplitted = value.split('TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS');

		if (hasRecountValue && valueSplitted) {
			text += valueSplitted[0] + '\n';
		} else {
			text += value;
		}
		return text;
	},

	// updated
	observer: function (active, mutation) {
		if (active && mutation.addedNodes.length) {
			let $ticketOrg = $(mutation.target).find('[data-test-id="customercontext-userinfo-organization"] [href*="organizations"]');
			
			if ($ticketOrg.length && typeof $ticketOrg.data('ovserved-org') === 'undefined') {
				
				$ticketOrg.data('ovserved-org', true);
				let findOrgId = $ticketOrg.attr('href').match(/\d{1,}/);
				
				if (findOrgId) {
					let orgId = findOrgId[0],
						orgName = $ticketOrg.text().trim().toLowerCase();

					TicketConsume_showOrganization(orgId).then((responseData) => {
						let customData = TicketConsume.parseOrganizationNotes(responseData.organization.notes);
						TicketConsume.data[orgName].id = orgId;
						TicketConsume.data[orgName].customData = customData;
						let badge = TicketConsume.getBadge(TicketConsume.data[orgName], orgName);
						TicketConsume.appendBadge(badge, $ticketOrg.closest('.ember-view.workspace').find('nav.btn-group'));
					});
				}
			}
		}
	},

	// updated
	// Update api org datas and badges
	updateAll : function () {
		let idList = '';
		$.each(TicketConsume.data, function (index, val) {
			if (val.id) idList += val.id + ',';
		});
		
		if (idList.length) idList = idList.substring(0, idList.length - 1);

		TicketConsume_showManyOrganizations(idList).then((responseData) => {
			$.each(responseData.organization, function (index, org) {
				let customData = TicketConsume.parseOrganizationNotes(responseData.org);
				TicketConsume.data[org.name].customData = customData;
			});
		});

		$('.TLmanaGer_ticketConsume_badge_cont').each(function () {
			let orgName = $(this).find('[data-org]').data('org'),
				$nav = $(this).closest('nav.btn-group'),
				badge = TicketConsume.getBadge(TicketConsume.data[orgName], orgName);

			$nav.find('.TLmanaGer_ticketConsume_badge_cont').remove();
			TicketConsume.appendBadge(badge, $nav);
		});
	}
};