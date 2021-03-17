export default {
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
  activeAllOptions: {
    name: 'Full equip',
    desc: 'Activate all options',
    img: chrome.extension.getURL('img/archv/activeAllOptions.png'),
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
    name: 'Press \'F\' to pay respects',
    desc: 'Reset to default options',
    img: chrome.extension.getURL('img/archv/resetSyncData.png'),
    condition: function (clickedResetData) {
      return clickedResetData === true
    }
  },
  click500TimesAnything: {
    name: 'Sick',
    desc: 'Click 500 times on extension pages/popup',
    img: chrome.extension.getURL('img/archv/click500TimesAnything.png'),
    condition: function (clickOnExtensionCount) {
      return clickOnExtensionCount >= 500
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
