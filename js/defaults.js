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
	optDevStealFa : true,
	optDevFlushCfm : true,
	
	optProfileUsername: '',
	optProfileEmail: '',
	optProfilePass: '',
	optProfileAvatar: 'img/logo.svg',

	optLcBigControls: false,
	optLcHolidays: true,
	optOsBranchesBtn: true,

	optZenTicketConfirm: true,
	optZenPriorHighs: true,
	optZenPriorHighsColors : {
		bg: { low: 'transparent', normal: '#ffd507', high: '#ff7e22', urgent: '#e11f32' },
		colors: { low: '#2f3941', normal: '#2f3941', high: '#FFF', urgent: '#FFF' }
	}
};