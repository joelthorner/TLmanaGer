export default {
	zendesk: {
		replyTicketConfirmPopup: {
			actived: false
		},
		ticketPriorityHighlightColors: {
			actived: false,
			onlyIncidents: false,
			colors: {
				low: {
					bg: '#fff',
					text: '#222',
				},
				normal: {
					bg: '#ffd',
					text: '#222',
				},
				high: {
					bg: '#fb7',
					text: '#222',
				},
				urgent: {
					bg: '#f77',
					text: '#222',
				},
			}
		},
	},
	logicommerce: {
		beyondTheme: {
			actived: false,
			theme: 'default'
		},
		background: {
			actived: true,
			image: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
			thumb: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
			userName: 'Brandon Lam',
			userLink: 'https://unsplash.com/@brandon_lam',
			downloadLocation: 'https://api.unsplash.com/photos/Dd_7xDCuuUo/download?client_id=***REMOVED***',
		},
		developerBar: {
			actived: true
		},
		sandboxLoginButtons: {
			actived: true
		},
		pagesGridView: {
			actived: true
		}
	},
	fluidWebTools: {
		autoForceView: {
			actived: true
		},
		flushRedisIgdDomain: {
			actived: true
		},
		dumpAutoScroll: {
			actived: true
		}
	},
	others: {
		stealFontWesomeIcons: {
			actived: true
		},
	},
	profile: {
		avatar: {
			actived: false,
			value: 'img/logo.svg',
		},
		shopTestingEmail: {
			actived: false,
			value: '',
		},
		shopTestingUsername: {
			actived: false,
			value: '',
		},
		shopTestingPassword: {
			actived: false,
			value: '',
		}
	},
	metrics: {
		timesBgChanged: 0,
		zendeskActiveOptsCount: 0,
		totalActiveOptsCount: 0,
		openChangelogCount: 0,
		// syncGoogleAccount: false,
		clickedIssuesAnchor: false,
		clickedGithubAnchor: false,
		clickedLegalsAnchor: false,
		clickedActionCount: 0,
		changedAvatarOpt: false,
		extensionInstalled: true,
		clickedResetData: false,
		clickOnExtensionCount: 0,
		openPopupCounter: 0,
	},
	achievements: {
		intallExtension: { // programed
			earned: true,
		},
		changeBg500Times: {
			earned: false,
		},
		activeAllZenOpts: {
			earned: false,
		},
		activeAllOpts: {
			earned: false,
		},
		lookChangelog50Times: { // programed
			earned: false,
		},
		googleAccountSync: { // programed
			earned: false,
		},
		clickIssuesLink: { // programed
			earned: false,
		},
		clickGithubLink: { // programed
			earned: false,
		},
		clickLegalsLink: {
			earned: false,
		},
		clickAction500Times: {
			earned: false,
		},
		changeAvatar: {
			earned: false,
		},
		resetSyncData: {
			earned: false,
		},
		click500TimesAnything: {
			earned: false,
		},
		openPopup100Times: {
			earned: false,
		},
	},
};
