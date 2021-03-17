export default {
  options: {
    // Zendesk
    replyTicketConfirmPopup: { // TODO
      actived: true,
    },
    ticketPriorityHighlightColors: { // TODO
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

    // Logicommerce
    beyondTheme: { // doing
      actived: false,
      theme: 'default',
    },
    background: { // done
      actived: true,
      image: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      thumb: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      regular: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      userName: 'Brandon Lam',
      userLink: 'https://unsplash.com/@brandon_lam',
      downloadLocation: 'https://api.unsplash.com/photos/Dd_7xDCuuUo/download',
    },
    developerBar: { // done
      actived: true,
    },
    sandboxLoginButtons: { // TODO
      actived: true,
    },
    pagesWindowBetter: { // done
      actived: true,
      gridView: true, // done
      betterGroupHeaders: true, // done
      betterTreeLevels: true, // done
    },
    bigControlInputs: { // done
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
    autoForceView: { // done
      actived: true,
    },
    flushRedisIgdDomain: { // untested, in progress
      actived: true,
    },
    dumpAutoScroll: { // done
      actived: true,
    },

    // Others
    getFontWesomeIcons: { // done
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
    intallExtension: { // programed
      earned: true,
    },
    changeBg500Times: {
      earned: false,
    },
    activeAllZenOpts: { // programed
      earned: false,
    },
    activeAllOptions: { // programed
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
