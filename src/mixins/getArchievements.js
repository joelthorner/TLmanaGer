export default {
	computed: {
		currentAchievements() {
			let t = 0;
			Object.keys(this.chromeData.archivements).forEach((key) => {
				if (this.chromeData.archivements[key].earned) t++;
			});
			return t;
		},
		totalAchievements() {
			let key,
				t = 0;
			for (key in this.chromeData.archivements) {
				if (this.chromeData.archivements.hasOwnProperty(key)) t++;
			}
			return t;
		},
		earnedPercent() {
			return (this.currentAchievements * 100) / this.totalAchievements;
		},
	},
};