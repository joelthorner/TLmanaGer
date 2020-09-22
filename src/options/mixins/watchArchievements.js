import achievements from "@/data/achievements";

export default {
  data() {
    return {
      achievementsData: achievements,
      click500TimesAnything_sto: null,
    };
  },
  methods: {
    createAchievementNotify(archvievement, earned) {
      if (earned) {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const uniqid = randLetter + Date.now();

        chrome.notifications.create(uniqid, {
          type: 'basic',
          title: `You earned the "${archvievement.name}" Badge!`,
          iconUrl: archvievement.img,
          message: archvievement.desc,
          priority: 1,
          buttons: [
            { title: 'Close' },
            { title: 'View archvievements' }
          ]
        });

        chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
          if (notificationId == uniqid && buttonIndex == 1) {
            chrome.tabs.create({ url: chrome.extension.getURL('/options/options.html') + '#/achievements' });
          }
        });
      }
    },

    clickGithubLink() {
      // Update metric first
      this.chromeSync.metrics.clickedGithubAnchor = true;
      // Get data of achievement
      const archvData = this.achievementsData['clickGithubLink'];
      // Get confition() parameters
      const clickedGithubAnchor = this.chromeSync.metrics.clickedGithubAnchor;
      // Execute condition()
      const result = archvData.condition(clickedGithubAnchor);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements['clickGithubLink'].earned;

      if (beforeResult === false && result === true) {
        // Update achievement chrome data
        this.chromeSync.achievements['clickGithubLink'].earned = result;
        // Save sync and launch system notify
        chrome.storage.sync.set(this.chromeSync, () => {
          this.createAchievementNotify(archvData, result);
        });
      }
    },

    clickIssuesLink() {
      // Update metric first
      this.chromeSync.metrics.clickedIssuesAnchor = true;
      // Get data of achievement
      const archvData = this.achievementsData['clickIssuesLink'];
      // Get confition() parameters
      const clickedIssuesAnchor = this.chromeSync.metrics.clickedIssuesAnchor;
      // Execute condition()
      const result = archvData.condition(clickedIssuesAnchor);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements['clickIssuesLink'].earned;

      if (beforeResult === false && result === true) {
        // Update achievement chrome data
        this.chromeSync.achievements['clickIssuesLink'].earned = result;
        // Save sync and launch system notify
        chrome.storage.sync.set(this.chromeSync, () => {
          this.createAchievementNotify(archvData, result);
        });
      }
    },

    clickLegalsLink() {
      // Update metric first
      this.chromeSync.metrics.clickedLegalsAnchor = true;
      // Get data of achievement
      const archvData = this.achievementsData['clickLegalsLink'];
      // Get confition() parameters
      const clickedLegalsAnchor = this.chromeSync.metrics.clickedLegalsAnchor;
      // Execute condition()
      const result = archvData.condition(clickedLegalsAnchor);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements['clickLegalsLink'].earned;

      if (beforeResult === false && result === true) {
        // Update achievement chrome data
        this.chromeSync.achievements['clickLegalsLink'].earned = result;
        // Save sync and launch system notify
        chrome.storage.sync.set(this.chromeSync, () => {
          this.createAchievementNotify(archvData, result);
        });
      }
    },

    lookChangelog50Times() {
      setTimeout(() => {
        // Update metric first
        this.chromeSync.metrics.openChangelogCount++;
        // Get data of achievement
        const archvData = this.achievementsData["lookChangelog50Times"];
        // Get confition() parameters
        const openChangelogCount = this.chromeSync.metrics.openChangelogCount;
        // Execute condition()
        const result = archvData.condition(openChangelogCount);
        // Get result before update achievement
        const beforeResult = this.chromeSync.achievements['lookChangelog50Times'].earned;
        // Update achievement chrome data
        this.chromeSync.achievements["lookChangelog50Times"].earned = result;
        // Save sync and launch system notify
        chrome.storage.sync.set(this.chromeSync, () => {
          if (beforeResult == false) {
            this.createAchievementNotify(archvData, result);
          }
        });
      }, 1000);
    },

    click500TimesAnything() {
      // Update metric first
      this.chromeSync.metrics.clickOnExtensionCount++;
      // Get data of achievement
      const archvData = this.achievementsData['click500TimesAnything'];
      // Get confition() parameters
      const clickOnExtensionCount = this.chromeSync.metrics.clickOnExtensionCount;
      // Execute condition()
      const result = archvData.condition(clickOnExtensionCount);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements['click500TimesAnything'].earned;
      // Update achievement chrome data
      clearTimeout(this.click500TimesAnything_sto);
      this.click500TimesAnything_sto = setTimeout(() => {
        this.chromeSync.achievements["click500TimesAnything"].earned = result;
        // Save sync and launch system notify
        chrome.storage.sync.set(this.chromeSync, () => {
          if (beforeResult == false) {
            this.createAchievementNotify(archvData, result);
          }
        });
      }, 1000);
    },

    activeAllZenOpts() {
      // Get data
      const totalZendeskOpts = Object.keys(this.chromeSync.zendesk).length;
      // Update metric first
      let auxActiveOptsCount = 0;
      Object.keys(this.chromeSync.zendesk).forEach(key => {
        if (this.chromeSync.zendesk[key].actived) {
          auxActiveOptsCount++;
        }
      });
      this.chromeSync.metrics.zendeskActiveOptsCount = auxActiveOptsCount;
      // Get data of achievement
      const archvData = this.achievementsData["activeAllZenOpts"];
      // Get confition() parameters
      const zendeskActiveOptsCount = this.chromeSync.metrics.zendeskActiveOptsCount;
      // Execute condition()
      const result = archvData.condition(zendeskActiveOptsCount, totalZendeskOpts);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements['activeAllZenOpts'].earned;
      // Update achievement chrome data
      this.chromeSync.achievements["activeAllZenOpts"].earned = result;
      // Save sync and launch system notify
      chrome.storage.sync.set(this.chromeSync, () => {
        if (beforeResult == false) {
          this.createAchievementNotify(archvData, result);
        }
      });
    },

    activeAllOpts() {
      // Get data
      const totalOpts = Object.keys(this.chromeSync.zendesk).length +
        Object.keys(this.chromeSync.logicommerce).length +
        Object.keys(this.chromeSync.fluidWebTools).length +
        Object.keys(this.chromeSync.others).length;

      // Update metric first
      let auxActiveOptsCount = 0;
      Object.keys(this.chromeSync.zendesk).forEach(key => {
        if (this.chromeSync.zendesk[key].actived) auxActiveOptsCount++;
      });
      Object.keys(this.chromeSync.logicommerce).forEach(key => {
        if (this.chromeSync.logicommerce[key].actived) auxActiveOptsCount++;
      });
      Object.keys(this.chromeSync.fluidWebTools).forEach(key => {
        if (this.chromeSync.fluidWebTools[key].actived) auxActiveOptsCount++;
      });
      Object.keys(this.chromeSync.others).forEach(key => {
        if (this.chromeSync.others[key].actived) auxActiveOptsCount++;
      });
      this.chromeSync.metrics.totalActiveOptsCount = auxActiveOptsCount;
      // Get data of achievement
      const archvData = this.achievementsData["activeAllOpts"];
      // Get confition() parameters
      const totalActiveOptsCount = this.chromeSync.metrics.totalActiveOptsCount;
      // Execute condition()
      const result = archvData.condition(totalActiveOptsCount, totalOpts);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements['activeAllOpts'].earned;
      // Update achievement chrome data
      this.chromeSync.achievements["activeAllOpts"].earned = result;
      // Save sync and launch system notify
      chrome.storage.sync.set(this.chromeSync, () => {
        if (beforeResult == false) {
          this.createAchievementNotify(archvData, result);
        }
      });
    },

    googleAccountSync() {
      setTimeout(() => {
        // Get data of achievement
        const archvData = this.achievementsData["googleAccountSync"];
        // Execute condition()
        chrome.sessions.getDevices((response) => {
          const result = response.length ? true : false;
          // Get result before update achievement
          const beforeResult = this.chromeSync.achievements['googleAccountSync'].earned;

          if (beforeResult === false && result === true) {
            // Update achievement chrome data
            this.chromeSync.achievements['googleAccountSync'].earned = result;
            // Save sync and launch system notify
            chrome.storage.sync.set(this.chromeSync, () => {
              this.createAchievementNotify(archvData, result);
            });
          }
        });
      }, 1000);
    }
  },
};