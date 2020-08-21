export default {
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