/**
 * Requires a chromeSync prop {object}
 */

import achievements from "@/data/achievements";
import optionsData from "@/data/optionsData";

export default {
  data() {
    return {
      optionsData,
      achievementsData: achievements,
      click500TimesAnything_sto: null,
    };
  },
  methods: {
    /**
     * Create chrome notify
     * @param {object} archvievement - object from achievements.js
     * @param {boolean} earned 
     */
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
          if (notificationId == uniqid && buttonIndex == 0) {
            chrome.notifications.clear(notificationId);
          } else if (notificationId == uniqid && buttonIndex == 1) {
            chrome.tabs.create({ url: chrome.extension.getURL('/options/options.html') + '#/achievements' });
          }
        });
      }
    },

    _onceClickAchievement(metricsKey, achievementKey) {
      // Update metric first
      this.chromeSync.metrics[metricsKey] = true;
      // Get data of achievement
      const archvData = this.achievementsData[achievementKey];
      // Get confition() parameters
      const condition = this.chromeSync.metrics[metricsKey];
      // Execute condition()
      const result = archvData.condition(condition);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements[achievementKey].earned;

      if (beforeResult === false && result === true) {
        // Update achievement chrome data
        this.chromeSync.achievements[achievementKey].earned = result;
        // Save sync and launch system notify
        chrome.storage.sync.set(this.chromeSync, () => {
          this.createAchievementNotify(archvData, result);
        });
      }
    },

    clickGithubLink() {
      this._onceClickAchievement('clickedGithubAnchor', 'clickGithubLink');
    },

    clickIssuesLink() {
      this._onceClickAchievement('clickedIssuesAnchor', 'clickIssuesLink');
    },

    clickLegalsLink() {
      this._onceClickAchievement('clickedLegalsAnchor', 'clickLegalsLink');
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
      let totalZendeskOpts = 0;
      let auxActiveOptsCount = 0;
      for (const optionKey in this.chromeSync.options) {
        const category = this.optionsData[optionKey].category;
        const actived = this.chromeSync.options[optionKey].actived;

        if (category == 'zendesk') {
          totalZendeskOpts++;
          if (actived) {
            auxActiveOptsCount++;
          }
        }
      }

      // Update metric first
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
      // Get data total
      let totalOpts = Object.keys(this.chromeSync.options).length;
      // Update metric first
      let auxActiveOptsCount = 0;
      Object.keys(this.chromeSync.options).forEach(element => {
        if (this.chromeSync.options[element].actived) auxActiveOptsCount++;
      });

      this.chromeSync.metrics.totalActiveOptsCount = auxActiveOptsCount;
      // Get data of achievement
      const archvData = this.achievementsData.activeAllOpts;
      // Get confition() parameters
      const totalActiveOptsCount = this.chromeSync.metrics.totalActiveOptsCount;
      // Execute condition()
      const result = archvData.condition(totalActiveOptsCount, totalOpts);
      // Get result before update achievement
      const beforeResult = this.chromeSync.achievements.activeAllOpts.earned;
      // Update achievement chrome data
      this.chromeSync.achievements.activeAllOpts.earned = result;
      // Save sync and launch system notify
      chrome.storage.sync.set(this.chromeSync, () => {
        if (beforeResult == false) this.createAchievementNotify(archvData, result);
      });
    },

    googleAccountSync() {
      setTimeout(() => {
        // Get data of achievement
        const archvData = this.achievementsData.googleAccountSync;
        // Execute condition()
        chrome.identity.getProfileUserInfo((data) => {
          const result = data.id ? true : false;
          // Update metric first
          this.chromeSync.metrics.googleAccountSync = result;
          // Get result before update achievement
          const beforeResult = this.chromeSync.achievements.googleAccountSync.earned;

          if (beforeResult === false && result === true) {
            // Update achievement chrome data
            this.chromeSync.achievements.googleAccountSync.earned = result;
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