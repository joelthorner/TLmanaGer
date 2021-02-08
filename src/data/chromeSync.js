export default {
  options: {
    replyTicketConfirmPopup: { // TODO
      actived: true,
      priority: 301,
      category: 'zendesk',
    },
    ticketPriorityHighlightColors: { // TODO
      actived: false,
      priority: 302,
      category: 'zendesk',
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

    beyondTheme: { // doing
      actived: false,
      priority: 107,
      category: 'logicommerce',
      theme: 'default',
    },
    background: { // done
      actived: true,
      priority: 106,
      category: 'logicommerce',
      image: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      thumb: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      regular: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      userName: 'Brandon Lam',
      userLink: 'https://unsplash.com/@brandon_lam',
      downloadLocation: 'https://api.unsplash.com/photos/Dd_7xDCuuUo/download',
    },
    developerBar: { // done
      actived: true,
      priority: 101,
      category: 'logicommerce',
    },
    sandboxLoginButtons: { // TODO
      actived: true,
      priority: 102,
      category: 'logicommerce',
    },
    pagesWindowBetter: { // done
      actived: true,
      priority: 103,
      category: 'logicommerce',
      gridView: true, // done
      betterGroupHeaders: true, // done
      betterTreeLevels: true, // done
    },
    bigControlInputs: { // done
      actived: false,
      priority: 105,
      category: 'logicommerce',
    },
    themeColors: {
      actived: false,
      priority: 104,
      category: 'logicommerce',
      colors: {
        main: '#bfcc00',
        secondary: '#2c8da3',
      },
    },

    autoForceView: { // done
      actived: true,
      priority: 200,
      category: 'fluidWebTools',
    },
    flushRedisIgdDomain: { // untested, in progress
      actived: true,
      priority: 201,
      category: 'fluidWebTools',
    },
    dumpAutoScroll: { // done
      actived: true,
      priority: 202,
      category: 'fluidWebTools',
    },

    getFontWesomeIcons: { // done
      actived: true,
      priority: 400,
      category: 'others',
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
