var defaults = {
	optLcBgActive: true,
	optLcBgValue: {
		image: chrome.extension.getURL('img/background-default.jpg'),
		thumb: chrome.extension.getURL('img/background-default.jpg'),
		userName: 'Matteo Fusco',
		userLink: 'https://unsplash.com/@matteofusco?utm_source=TLmanaGer&utm_medium=referral',
		downloadLocation: ''
	},
	optLcPagridActive: false,
	optLcDevBarActive: true,
	optDevForceview: true,
	optDevStealFa: true,
	optDevFlushCfm: true,
	optDevDumpScrollCfm: true,
	
	optProfileUsername: '',
	optProfileEmail: '',
	optProfilePass: '',
	optProfileAvatar: 'img/logo.svg',

	optLcBigControls: false,
	optLcHolidays: true,
	optOsBranchesBtn: true,

	optZenTicketConfirm: true,
	optZenPriorHighs: true,
	optZenPriorHighsIncident: true,
	optZenPriorHighsColors: {
		bg: {
			low: '#fff',
			normal: '#ffd',
			high: '#fb7',
			urgent: '#f77'
		},
		colors: {
			low: '#222',
			normal: '#222',
			high: '#222',
			urgent: '#222'
		}
	},
	optZenDisableAutofocus: false
};