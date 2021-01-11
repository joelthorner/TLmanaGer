<template>
  <div class="tab">
    <div class="user-stats-grid">
      <user-stat-data-card
        v-for="statData in getItems"
        v-bind:key="statData.name"
        :statData="statData"
      ></user-stat-data-card>
    </div>
  </div>
</template>

<script>
import UserStatDataCard from "@options/pages/user/UserStatDataCard";
import getArchievementsMixin from "@mixins/getArchievements";
import {
  award as awardIcon,
  unsplash as unsplashIcon,
  zendesk as zendeskIcon,
  toggleOn as toggleOnIcon,
  codeBranch as codeBranchIcon,
  functionMath as functionMathIcon,
  mouse as mouseIcon,
  chevronCircleDown as chevronCircleDownIcon,
  sync as syncIcon,
} from "@/data/icons";

export default {
  name: "TabStats",
  mixins: [getArchievementsMixin],
  components: {
    UserStatDataCard,
  },
  props: {
    chromeSync: Object,
  },
  computed: {
    getItems() {
      return [
        {
          icon: awardIcon,
          name: "Achievements earned",
          value: `${this.currentAchievements}/${
            this.totalAchievements
          } (${Number(this.earnedPercent.toFixed(1))}%)`,
        },
        {
          icon: unsplashIcon,
          name: "Times background changed",
          value: this.chromeSync.metrics.timesBgChanged,
        },
        {
          icon: zendeskIcon,
          name: "Zendesk active options",
          value: this.chromeSync.metrics.zendeskActiveOptsCount,
        },
        {
          icon: toggleOnIcon,
          name: "Total active options",
          value: this.chromeSync.metrics.totalActiveOptsCount,
        },
        {
          icon: codeBranchIcon,
          name: "Times open changelog",
          value: this.chromeSync.metrics.openChangelogCount,
        },
        {
          icon: functionMathIcon,
          name: "Times clicked popup action",
          value: this.chromeSync.metrics.clickedActionCount,
        },
        {
          icon: mouseIcon,
          name: "General extension clicks",
          value: this.chromeSync.metrics.clickOnExtensionCount,
        },
        {
          icon: chevronCircleDownIcon,
          name: "Times open popup",
          value: this.chromeSync.metrics.openPopupCounter,
        },
        {
          icon: syncIcon,
          name: "Activate sync",
          value: this.chromeSync.metrics.googleAccountSync,
        },
      ];
    },
  },
};
</script>