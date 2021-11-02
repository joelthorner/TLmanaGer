export default {
  options: {
    // Zendesk
    coolTicketSubmit: {
      actived: true,
      replyTicketConfirmPopup: true,
    },
    ticketPriorityHighlightColors: {
      actived: true,
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

    // Logicommerce
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
    pagesWindowBetter: {
      actived: true,
      gridView: true,
      betterGroupHeaders: true,
      betterTreeLevels: true,
    },
    bigControlInputs: {
      actived: false,
    },
    themeColors: {
      actived: false,
      colors: {
        main: '#bfcc00',
        secondary: '#2c8da3',
      },
    },

    // FluidWebTools
    autoForceView: {
      actived: true,
    },
    flushRedisIgdDomain: {
      actived: true,
    },
    dumpAutoScroll: {
      actived: true,
    },

    // Others
    getFontWesomeIcons: {
      actived: true,
    },
  },

  profile: {
    avatar: {
      actived: false,
      value: chrome.extension.getURL('img/user.svg'),
      name: 'Default',
      description: 'Nothing to say!',
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
    clickedIssuesAnchor: false,
    clickedGithubAnchor: false,
    clickedLegalsAnchor: false,
    clickedActionCount: 0,
    changedAvatarOpt: false,
    extensionInstalled: true,
    clickedResetData: false,
    clickOnExtensionCount: 0,
    openPopupCounter: 0,
    googleAccountSync: false,
  },

  achievements: {
    intallExtension: {
      earned: true,
    },
    changeBg500Times: {
      earned: false,
    },
    activeAllZenOpts: {
      earned: false,
    },
    activeAllOptions: {
      earned: false,
    },
    lookChangelog50Times: {
      earned: false,
    },
    googleAccountSync: {
      earned: false,
    },
    clickIssuesLink: {
      earned: false,
    },
    clickGithubLink: {
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

  // Si fas una nova key lvl1 vigila TabReset.vue
};
