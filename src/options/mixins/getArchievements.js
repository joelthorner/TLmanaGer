export default {
	computed: {
		currentAchievements() {
			let t = 0;
			Object.keys(this.chromeData.achievements).forEach((key) => {
				if (this.chromeData.achievements[key].earned) t++;
			});
			return t;
		},
		totalAchievements() {
			let key,
				t = 0;
			for (key in this.chromeData.achievements) {
				if (this.chromeData.achievements.hasOwnProperty(key)) t++;
			}
			return t;
		},
		earnedPercent() {
			return (this.currentAchievements * 100) / this.totalAchievements;
		},
	},
};