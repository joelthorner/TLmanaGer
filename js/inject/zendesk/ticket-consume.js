/**
 * TicketConsume.
 *
 * Object for count client opened tickets in a month
 * More information: https://github.com/joelthorner/TLmanaGer/wiki/Ticket-consume-(Zendesk) .
 *
 * @since      08.08.19
 */
TicketConsume = {
	debug: false,
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
	siChecker1: null,
	siChecker2: null,
	stoChecker: null,
	data: {},
	secondsUpdate: 1,
	splitVal: 'TICKET_RECOUNT_NOT_MODIFY_UNDER_THIS',
	modalTableHead: `<thead>
		<tr class="TLmanaGer_ticketConsume_table__row TLmanaGer_ticketConsume_table__row--header">
			<th class="TLmanaGer_ticketConsume_table__row__cell">User</th>
			<th class="TLmanaGer_ticketConsume_table__row__cell">Modification <small>(1 or -1)</small></th>
			<th class="TLmanaGer_ticketConsume_table__row__cell">Date</th>
			<th class="TLmanaGer_ticketConsume_table__row__cell">Reason</th>
			<th class="TLmanaGer_ticketConsume_table__row__cell">Action</th>
		</tr>
	</thead>`,
	newIcon: '<svg viewBox="0 0 16 16"><circle cx="7.5" cy="8.5" r="7" fill="none" stroke="currentColor"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" d="M7.5 4.5v8m4-4h-8"></path></svg>',
	closeIcon: '<svg viewBox="0 0 16 16"><g fill="none" stroke="currentColor"><circle cx="7.5" cy="8.5" r="7" stroke-linejoin="round"></circle><path stroke-linecap="round" d="M4.5 11.5l6-6m0 6l-6-6"></path></g></svg>',
	
	init: function (active) {
		if (active) {
			let userId = parseInt(localStorage.getItem('ajs_user_id').replace(/"/g, ''));
			if (userId) {
				ZendeskApi_showUser(userId).then((responseData) => {
					TicketConsume.user = responseData.user;
					if (TicketConsume.user.role == 'agent') {
						TicketConsume.insertIframe();
					}
				});
			}
			var ticketConsume_isTop = true; // no remove
			TicketConsume.globalEvents();
			chrome.runtime.onMessage.addListener(function (details) {
				try {
					var data = JSON.parse(details);
					log('TicketConsume intranet', 'success');
					console.log(data);
					$.extend(true,TicketConsume.data, data)
					TicketConsume.initIntervals();
				} catch (error) {
					log('TicketConsume invalid data', 'danger');
				}
			});
		}
	},

	globalEvents : function() {

		$(document).on('click', '.TLmanaGer_ticketConsume_table [data-action-btn="new"]', function(event) {
			TicketConsume.globalEvent_new($(this));
		});

		$(document).on('click', '.TLmanaGer_ticketConsume_table [data-action-btn="delete"]', function (event) {
			TicketConsume.globalEvent_del($(this));
		});

		$(document).on('click', '.TLmanaGer_ticketConsume_edit', function(event) {
			TicketConsume.globalEvent_edit(event);
		});
	},

	globalEvent_new : function ($this) {
		let orgName = $this.data('org'), validRow = true, $row = $this.closest('tr');

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

			ZendeskApi_showOrganization(TicketConsume.data[orgName].id).then((responseData) => {
				let newData = TicketConsume.getNotesText(responseData.organization.notes);
				newData += TicketConsume.splitVal + '\n' + JSON.stringify(TicketConsume.data[orgName].customData);

				ZendeskApi_updateOrganization(TicketConsume.data[orgName].id, {
					"organization": { "notes": newData }
				}).then((responseData) => {
					TicketConsume.appendNewTableRow(newObj, orgName);
					TicketConsume.updateNotesHtmlNode(responseData.organization);
					TicketConsume.updateAll();
				});
			});
		}
	},

	globalEvent_del: function ($this) {
		let orgName = $this.data('org'), id = $this.data('id'), $row = $this.closest('tr');

		$.each(TicketConsume.data[orgName].customData, function (index, val) {
			if (val.id == id) {
				TicketConsume.data[orgName].customData.splice(index, 1);
				return false;
			}
		});

		ZendeskApi_showOrganization(TicketConsume.data[orgName].id).then((responseData) => {
			let newData = TicketConsume.getNotesText(responseData.organization.notes);

			if (TicketConsume.data[orgName].customData.length) {
				newData += TicketConsume.splitVal + '\n' + JSON.stringify(TicketConsume.data[orgName].customData);
			}
			ZendeskApi_updateOrganization(TicketConsume.data[orgName].id, {
				"organization": { "notes": newData }
			}).then((responseData) => {
				$row.remove();
				TicketConsume.updateNotesHtmlNode(responseData.organization);
				TicketConsume.updateAll();
			});
		});
	},

	globalEvent_edit: function (event) {
		TicketConsume.updateAll();

		let orgName = $(event.target).data('org'),
			modalIcon = '<svg viewBox="0 0 16 16" width="100%" height="100%"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4.5 2.5H2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h12c.28 0 .5-.22.5-.5V3c0-.28-.22-.5-.5-.5h-2.5m-6.5 8l2 2L11.5 8m-.05-3.5c.02-.16.05-.33.05-.5C11.5 2.07 9.93.5 8 .5S4.5 2.07 4.5 4c0 .17.03.34.05.5h6.9z"></path></svg>',
			modalTitle = chrome.i18n.getMessage('zenDesk_tiketConsume_title')
				.replace('%organization%', orgName.charAt(0).toUpperCase() + orgName.slice(1))
				.replace('%month%', moment().format('MMMM YYYY')),
			modalMessage = chrome.i18n.getMessage('zenDesk_tiketConsume_message');
		
		TicketConsume.data[orgName].customData = TicketConsume.clearOldCustomDataEntries(TicketConsume.data[orgName].customData);
		let data = TicketConsume.data[orgName];

		let existingRows = TicketConsume.getFilledTableRows(data.customData, orgName),
			modalHtml = TicketConsume.getModalHtml(modalMessage, orgName, existingRows);

		Swal.fire({
			html: modalHtml,
			title: modalIcon + modalTitle,
			showCancelButton: false,
			showConfirmButton: false,
			width: '65rem',
			customClass: {
				container: 'swal-zendesk-popup swal-zendesk-ticket-consume'
			}
		})
	},

	clearOldCustomDataEntries : function(customDataArr) {
		let clonedArr = customDataArr;
		$.each(clonedArr, function (index, val) {
			if (moment(val.date).format('MMMM YYYY') != moment().format('MMMM YYYY')) {
				customDataArr.splice(index, 1);
			}
		});
		return customDataArr;
	},

	appendNewTableRow: function (newObj, orgName) {
		$('.TLmanaGer_ticketConsume_table tbody tr[data-tr="new"]').after(`
			<tr class="TLmanaGer_ticketConsume_table__row">
				<td class="TLmanaGer_ticketConsume_table__row__cell" data-user>${newObj.user}</td>
				<td class="TLmanaGer_ticketConsume_table__row__cell" data-num>${newObj.mod}</td>
				<td class="TLmanaGer_ticketConsume_table__row__cell" data-date>${newObj.date}</td>
				<td class="TLmanaGer_ticketConsume_table__row__cell" data-reason>${newObj.reas}</td>
				<td class="TLmanaGer_ticketConsume_table__row__cell" data-action="delete">
					<button type="button" data-action-btn="delete" data-id="${newObj.id}" data-org="${orgName}">
						${TicketConsume.closeIcon}
					</button>
				</td>
			</tr>`);
	},

	getModalHtml: function (modalMessage, orgName, existingRows) {
		return `<div id="swal2-content" style="display: block;">${modalMessage}</div>
			<table class="TLmanaGer_ticketConsume_table TLmanaGer_ticketConsume_table">
				${TicketConsume.modalTableHead}
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
							<button type="button" data-action-btn="new" data-org="${orgName}">${TicketConsume.newIcon}</button>
						</td>
					</tr> 
					${existingRows}
				</tbody>
			</table>`;
	},

	getFilledTableRows: function (customData, orgName) {
		let result = '';
		$.each(customData, function (index, obj) {
			result += `
				<tr class="TLmanaGer_ticketConsume_table__row TLmanaGer_ticketConsume_table__row_${index}">
					<td class="TLmanaGer_ticketConsume_table__row__cell" data-user>${obj.user}</td>
					<td class="TLmanaGer_ticketConsume_table__row__cell" data-num>${obj.mod}</td>
					<td class="TLmanaGer_ticketConsume_table__row__cell" data-date>${obj.date}</td>
					<td class="TLmanaGer_ticketConsume_table__row__cell" data-reason>${obj.reas}</td>
					<td class="TLmanaGer_ticketConsume_table__row__cell" data-action="delete">
						<button type="button" data-action-btn="delete" data-id="${obj.id}" data-org="${orgName}">
							${TicketConsume.closeIcon}
						</button>
					</td>
				</tr>`;
		});
		return result;
	},

	updateNotesHtmlNode: function (organization) {
		var orgName = organization.name.trim().toLowerCase();
		$('[data-org="' + orgName + '"]').closest('.workspace').find('.property_box.details label').each(function (index, el) {
			if ($(el).text().trim().toLowerCase() == 'notes') {
				$(el).next('.editable').html(organization.notes);
			}
		});
	},

	insertIframe : function() {
		$('body').append(
			'<iframe src="//192.168.110.109:12853/zdreports/rtm.cfm/?refresh=1" class="TlmanaGer_consumeIframe"></iframe>'
		);
	},
	
	appendBadge : function (badge, $navbar) {
		$navbar.find('.TLmanaGer_ticketConsume_badge_cont').remove();
		$navbar.append(badge);
	},

	refreshTimeAgo : function () {
		$('.TLmanaGer_ticketConsume_checkedAgo_text').each(function () {
			var secondsAgo = moment().subtract(TicketConsume.secondsUpdate, 'seconds').fromNow();
			$(this).text(secondsAgo);
		});
	},

	initIntervals : function() {
		clearInterval(TicketConsume.siChecker1);
		TicketConsume.siChecker1 = setInterval(() => {
			TicketConsume.secondsUpdate++;
		}, 1000); // 1"

		clearInterval(TicketConsume.siChecker2);
		TicketConsume.siChecker2 = setInterval(() => {
			TicketConsume.refreshTimeAgo();
			log('TicketConsume update timer info');
		}, 10000); // 10"

		clearTimeout(TicketConsume.stoChecker);
		TicketConsume.stoChecker = setInterval(() => {
			TicketConsume.updateAll();
			TicketConsume.secondsUpdate = 1;
		}, (60 * 1000) * 5); // 5'
	},

	getBadge: function (data, orgName) {
		let totalTiquets = data.tickets,
			levels = TicketConsume.slas[data.sla].levels, 
			color = '';

		$.each(data.customData, function(index, val) {
			if (moment(val.date).format('MMMM YYYY') == moment().format('MMMM YYYY')) totalTiquets += val.mod;
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
					<span class="TLmanaGer_ticketConsume_checkedAgo_text">a few seconds ago</span>
				</span>
			</span>`;
	},

	parseOrganizationNotes: function(value) {
		let json = [],
			valueSplitted = value.trim().split(TicketConsume.splitVal);

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

	getNotesText : function(value) {
		let text = '',
			hasRecountValue = value.match(new RegExp(TicketConsume.splitVal)),
			valueSplitted = value.split(TicketConsume.splitVal);

		if (hasRecountValue && valueSplitted) {
			text += valueSplitted[0] + '\n';
		} else {
			text += value;
		}
		return text;
	},

	observer: function (active, mutation) {
		if (active && mutation.addedNodes.length) {
			let $ticketOrg = $(mutation.target).find('[data-test-id="customercontext-userinfo-organization"] [href*="organizations"]');
			
			if ($ticketOrg.length && typeof $ticketOrg.data('ovserved-org') === 'undefined') {
				
				$ticketOrg.data('ovserved-org', true);
				let findOrgId = $ticketOrg.attr('href').match(/\d{1,}/);
				
				if (findOrgId) {
					let orgId = findOrgId[0],
						orgName = $ticketOrg.text().trim().toLowerCase();

					TicketConsume.observerInit(orgId, orgName, $ticketOrg);
				}
			}
		}
	},

	observerInit: function (orgId, orgName, $ticketOrg) {
		if (typeof TicketConsume.user !== 'undefined' && TicketConsume.user.role == 'agent') {
			ZendeskApi_showOrganization(orgId).then((responseData) => {
				let customData = TicketConsume.parseOrganizationNotes(responseData.organization.notes);
				if (TicketConsume.data[orgName]) {
					TicketConsume.data[orgName].id = orgId;
					TicketConsume.data[orgName].customData = customData;
					let badge = TicketConsume.getBadge(TicketConsume.data[orgName], orgName);
					TicketConsume.appendBadge(badge, $ticketOrg.closest('.ember-view.workspace').find('nav.btn-group'));
				}
			});
		}
	},

	updateAll : function () {
		let idList = '';
		$.each(TicketConsume.data, function (index, val) {
			if (val.id) idList += val.id + ',';
		});

		if (idList.length) idList = idList.substring(0, idList.length - 1);
		TicketConsume.updateViaIframe();
		TicketConsume.updateViaApi(idList);

		$('.TLmanaGer_ticketConsume_badge_cont').each(function () {
			let orgName = $(this).find('[data-org]').data('org'),
				$nav = $(this).closest('nav.btn-group'),
				badge = TicketConsume.getBadge(TicketConsume.data[orgName], orgName);

			$nav.find('.TLmanaGer_ticketConsume_badge_cont').remove();
			TicketConsume.appendBadge(badge, $nav);
		});
	},

	updateViaApi: function (idList) {
		if (idList.length) {
			ZendeskApi_showManyOrganizations(idList).then((responseData) => {
				$.each(responseData.organization, function (index, org) {
					let customData = TicketConsume.parseOrganizationNotes(responseData.org);
					TicketConsume.data[org.name].customData = customData;
				});
				log('TicketConsume updateAll api data', 'success');
				console.log(responseData);
			});
		}
	},

	updateViaIframe : function () {
		$('.TlmanaGer_consumeIframe').attr('src', function () {
			if ($(this).attr('src').includes('?')) refreshGetSymb = '&';
			else refreshGetSymb = '?';
			return $(this).attr('src') + refreshGetSymb + 'refresh=' + new Date().getUTCMilliseconds();
		});
	}
};