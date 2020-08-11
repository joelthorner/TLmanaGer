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
			this.chromeData.metrics.clickedGithubAnchor = true;
			// Get data of achievement
			const archvData = this.achievementsData['clickGithubLink'];
			// Get confition() parameters
			const clickedGithubAnchor = this.chromeData.metrics.clickedGithubAnchor;
			// Execute condition()
			const result = archvData.condition(clickedGithubAnchor);
			// Get result before update achievement
			const beforeResult = this.chromeData.achievements['clickGithubLink'].earned;

			if (beforeResult === false && result === true) {
				// Update achievement chrome data
				this.chromeData.achievements['clickGithubLink'].earned = result;
				// Save sync and launch system notify
				chrome.storage.sync.set(this.chromeData, () => {
					this.createAchievementNotify(archvData);
				});
			}
		},

		clickIssuesLink() {
			// Update metric first
			this.chromeData.metrics.clickedIssuesAnchor = true;
			// Get data of achievement
			const archvData = this.achievementsData['clickIssuesLink'];
			// Get confition() parameters
			const clickedIssuesAnchor = this.chromeData.metrics.clickedIssuesAnchor;
			// Execute condition()
			const result = archvData.condition(clickedIssuesAnchor);
			// Get result before update achievement
			const beforeResult = this.chromeData.achievements['clickIssuesLink'].earned;

			if (beforeResult === false && result === true) {
				// Update achievement chrome data
				this.chromeData.achievements['clickIssuesLink'].earned = result;
				// Save sync and launch system notify
				chrome.storage.sync.set(this.chromeData, () => {
					this.createAchievementNotify(archvData);
				});
			}
		},

		lookChangelog50Times() {
			// Update metric first
			this.chromeData.metrics.openChangelogCount++;
			// Get data of achievement
			const archvData = this.achievementsData["lookChangelog50Times"];
			// Get confition() parameters
			const openChangelogCount = this.chromeData.metrics.openChangelogCount;
			// Execute condition()
			const result = archvData.condition(openChangelogCount);
			// Get result before update achievement
			const beforeResult = this.chromeData.achievements['lookChangelog50Times'].earned;
			// Update achievement chrome data
			this.chromeData.achievements["lookChangelog50Times"].earned = result;
			// Save sync and launch system notify
			chrome.storage.sync.set(this.chromeData, () => {
				if (beforeResult == false) {
					this.createAchievementNotify(archvData, result);
				}
			});
		},
	},
};