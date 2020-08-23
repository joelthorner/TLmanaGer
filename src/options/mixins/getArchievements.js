export default {
  computed: {
    currentAchievements() {
      let t = 0;
      Object.keys(this.chromeSync.achievements).forEach((key) => {
        if (this.chromeSync.achievements[key].earned) t++;
      });
      return t;
    },
    totalAchievements() {
      let key,
        t = 0;
      for (key in this.chromeSync.achievements) {
        if (this.chromeSync.achievements.hasOwnProperty(key)) t++;
      }
      return t;
    },
    earnedPercent() {
      return (this.currentAchievements * 100) / this.totalAchievements;
    },
  },
};