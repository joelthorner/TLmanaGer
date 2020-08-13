export const chromeData = {
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
      themeName: ''
    },
    background: {
      actived: true,
      image: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      thumb: 'https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM0NjEwfQ',
      userName: 'Brandon Lam',
      userLink: 'https://unsplash.com/@brandon_lam',
      downloadLocation: 'https://api.unsplash.com/photos/Dd_7xDCuuUo/download?client_id=c5f892b18c1cc3e5bc85943326ba93faacea502bf41e5f09d70fbe90e360c827',
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
      actived: true,
      value: 'img/logo.svg',
    },
    shopTestingEmail: {
      actived: true,
      value: 'john.doe@example.com',
    },
    shopTestingUsername: {
      actived: true,
      value: 'John Doe',
    },
    shopTestingPassword: {
      actived: true,
      value: '123132',
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

export const achievements = {
  intallExtension: {
    name: 'Easy peasy',
    desc: 'Install TLmanaGer extension',
    img: chrome.extension.getURL('img/archv/intallExtension.png'),
    condition: function () {
      return true
    }
  },
  changeBg500Times: {
    name: 'Reroll!',
    desc: 'Change background option 500 times',
    img: chrome.extension.getURL('img/archv/changeBg500Times.png'),
    condition: function (timesBgChanged) {
      return timesBgChanged >= 500
    }
  },
  activeAllZenOpts: {
    name: 'Zendesk master',
    desc: 'Activate all zendesk options',
    img: chrome.extension.getURL('img/archv/activeAllZenOpts.png'),
    condition: function (zendeskActiveOptsCount, totalZendeskOpts) {
      return zendeskActiveOptsCount === totalZendeskOpts
    }
  },
  activeAllOpts: {
    name: 'Full equip',
    desc: 'Activate all options',
    img: chrome.extension.getURL('img/archv/activeAllOpts.png'),
    condition: function (totalActiveOptsCount, activeOptsCount) {
      return totalActiveOptsCount === activeOptsCount
    }
  },
  lookChangelog50Times: {
    name: 'Eat sleep code repeat',
    desc: 'Watch the changelog 50 times',
    img: chrome.extension.getURL('img/archv/lookChangelog50Times.png'),
    condition: function (openChangelogCount) {
      return openChangelogCount >= 50
    }
  },
  googleAccountSync: {
    name: 'G, o, o, g, l, e, glu glu!',
    desc: 'Activate chrome extensions synchronization, from your google account',
    img: chrome.extension.getURL('img/archv/googleAccountSync.png'),
    condition: function () {
			return null;
    }
  },
  clickIssuesLink: {
    name: 'Houston we have a problem',
    desc: 'Click issues link',
    img: chrome.extension.getURL('img/archv/clickIssuesLink.png'),
    condition: function (clickedIssuesAnchor) {
      return clickedIssuesAnchor === true
    }
  },
  clickGithubLink: {
    name: 'Trust me, I\'m a developer',
    desc: 'Click github page link',
    img: chrome.extension.getURL('img/archv/clickGithubLink.png'),
    condition: function (clickedGithubAnchor) {
      return clickedGithubAnchor === true
    }
  },
  clickLegalsLink: {
    name: '@policy(a)',
    desc: 'Read the privacy policy',
    img: chrome.extension.getURL('img/archv/clickLegalsLink.png'),
    condition: function (clickedLegalsAnchor) {
      return clickedLegalsAnchor === true
    }
  },
  clickAction500Times: {
    name: 'Doneclick',
    desc: 'Click a popup action 500 times',
    img: chrome.extension.getURL('img/archv/clickAction500Times.png'),
    condition: function (clickedActionCount) {
      return clickedActionCount >= 500
    }
  },
  changeAvatar: {
    name: 'Ese soy yo!',
    desc: 'Change profile avatar',
    img: chrome.extension.getURL('img/archv/changeAvatar.png'),
    condition: function (changedAvatarOpt) {
      return changedAvatarOpt === true
    }
  },
  resetSyncData: {
    name: 'Press \'F\'',
    desc: 'Reset to default options',
    img: chrome.extension.getURL('img/archv/resetSyncData.png'),
    condition: function (clickedResetData) {
      return clickedResetData === true
    }
  },
  click500TimesAnything: {
    name: 'Sick',
    desc: 'Click 5000 times on extension pages/popup',
    img: chrome.extension.getURL('img/archv/click500TimesAnything.png'),
    condition: function (clickOnExtensionCount) {
      return clickOnExtensionCount >= 5000
    }
  },
  openPopup100Times: {
    name: 'Once you pop you can\'t stop',
    desc: 'Open popup 100 times',
    img: chrome.extension.getURL('img/archv/openPopup100Times.png'),
    condition: function (openPopupCounter) {
      return openPopupCounter >= 100
    }
  },
};
