async function ZendeskApi_showOrganization(id) {
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

async function ZendeskApi_showManyOrganizations(idList) {
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

async function ZendeskApi_updateOrganization(id, obj) {
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

async function ZendeskApi_showUser(id) {
	// https://developer.zendesk.com/rest_api/docs/support/users#show-user
	const rawResponse = await fetch(`/api/v2/users/${id}`, {
		method: 'GET',
		headers: {
			'x-csrf-token': ZendeskGeneral.apiToken,
			'Content-Type': 'application/json'
		}
	});
	let data = await rawResponse.json();
	return data;
};

/**
 * ZendeskGeneral.
 *
 * General Zendesk manager union of all zendesk objects.
 *
 * @since      18.08.19
 */
ZendeskGeneral = {
	init: function () {
		this.user = undefined;
		this.apiToken = $('[name="csrf-token"]').attr('content');
		this.createMenuSettings();
	},

	createMenuSettings: function () {
		var $li = $('<li/>', {
			html:
				`<button class="toolbar_link toolbar_link_extension_settings" type="button">
					<svg xmlns="http://www.w3.org/2000/svg" width="328.7" height="381.878" viewBox="91.648 65.063 328.7 381.878" fill="#333">
						<path d="M417.854 153.285c-5.479-28.378-21.693-52.948-45.637-69.114-17.998-12.18-38.92-18.608-60.565-18.608-36.043 0-69.58 17.805-89.747 47.581L110.753 277.549C94.556 301.508 88.658 330.32 94.15 358.73c5.479 28.379 21.694 52.938 45.642 69.104 17.979 12.195 38.92 18.607 60.563 18.607 36.027 0 69.563-17.81 89.715-47.603l111.15-164.371c16.228-23.991 22.108-52.787 16.634-81.182zm-157.64 225.307c-13.431 19.883-35.865 31.789-59.858 31.77-14.396 0-28.378-4.307-40.35-12.401-15.957-10.78-26.771-27.146-30.438-46.086-3.664-18.935.289-38.138 11.072-54.072l56.171-82.985L316.334 295l-56.12 83.592z" />
					</svg>
					<span class="tooltip-text">TLmanaGer settings</span>
				</button>
				`
		}).click(function (event) {
			window.open(chrome.extension.getURL('/src/options/index.html'), '_blank');
		});
		$('#main_navigation > ul').append($li);
	},
	
	timeout: null,

	observer: function (mutation) {
		clearTimeout(ZendeskGeneral.timeout);
		ZendeskGeneral.timeout = setTimeout(() => {
			ZendeskGeneral.run(mutation);
		}, 275);
	},

	run: function (mutation) {
		this.madridTimeZone(mutation);
	},

	madridTimeZone: function (mutation) {
		if (mutation.addedNodes.length) {
			var $textNode = $(mutation.target)
				.find('[data-test-id="customercontext-userinfo-timezone"]')
				.find('[data-customercontext-id="userinfo.property.line"]');
			
			var text = $textNode.text().trim().toLowerCase(); $textNode
			if (text == 'madrid') $textNode.text('Catalunya');
		}
	}
};

chrome.storage.sync.get({
	optZenPriorHighs: defaults.optZenPriorHighs,
	optZenPriorHighsIncident: defaults.optZenPriorHighsIncident,
	optZenPriorHighsColors: defaults.optZenPriorHighsColors,

	optZenTicketConfirm: defaults.optZenTicketConfirm,
	optZenDisableAutofocus: defaults.optZenDisableAutofocus,
	optZenTicketConsume: defaults.optZenTicketConsume
}, function (result) {
	
	// Global inits
	ZendeskGeneral.init();
	ExtraCommands.init();
	SubmitExpander.init(result.optZenTicketConfirm);
	PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors, result.optZenPriorHighsIncident);
	DisableEditorAutofocus.init();
	TicketConsume.init(result.optZenTicketConsume);

	var globalObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			SubmitExpander.init(result.optZenTicketConfirm);
			PriorityHighlights.init(result.optZenPriorHighs, result.optZenPriorHighsColors, result.optZenPriorHighsIncident);
			DisableEditorAutofocus.observer(result.optZenDisableAutofocus, mutation);
			TicketConsume.observer(result.optZenTicketConsume, mutation);
			ZendeskGeneral.observer(mutation);
		});
	});
	globalObserver.observe($('body')[0], {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
	
	var navTabsObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			ExtraCommands.onFindTabSelected(mutation);
		});
	});
	navTabsObserver.observe($('#tabs')[0], {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
});