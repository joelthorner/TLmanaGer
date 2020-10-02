export default {
  zendesk: {
    replyTicketConfirmPopup: {
      actived: true,
    },
    ticketPriorityHighlightColors: {
      actived: false,
      onlyIncidents: true,
      colors: {
        low: {
          bg: '#ffffff',
          text: '#222222',
        },
        normal: {
          bg: '#ffffdb',
          text: '#222222',
        },
        high: {
          bg: '#fdb976',
          text: '#222222',
        },
        urgent: {
          bg: '#fd7878',
          text: '#222222',
        },
      }
    },
  },
  logicommerce: {
    beyondTheme: {
      actived: false,
      theme: 'default',
    },
    background: {
      actived: true,
      image: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      thumb: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      regular: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      userName: 'Brandon Lam',
      userLink: 'https://unsplash.com/@brandon_lam',
      downloadLocation: 'https://api.unsplash.com/photos/Dd_7xDCuuUo/download',
    },
    developerBar: {
      actived: true,
    },
    sandboxLoginButtons: {
      actived: true,
    },
    pagesWindowBetter: { // injectat & opt programada
      actived: true,
      gridView: true,  // injectat & opt programada
      betterGroupHeaders: true,  // injectat & opt programada
      betterTreeLevels: true, // injectat & opt programada
    }
  },
  fluidWebTools: {
    autoForceView: {
      actived: true,
    },
    flushRedisIgdDomain: {
      actived: true,
    },
    dumpAutoScroll: {
      actived: true,
    }
  },
  others: {
    getFontWesomeIcons: { // injectat & opt programada
      actived: true,
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
    },
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
    activeAllZenOpts: { // programed
      earned: false,
    },
    activeAllOpts: { // programed
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
    clickLegalsLink: { // programed
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
    click500TimesAnything: { // programed (falta inside popup)
      earned: false,
    },
    openPopup100Times: {
      earned: false,
    },
  },
};
