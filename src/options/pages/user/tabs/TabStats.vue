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
  bug as bugIcon,
  github as githubIcon,
  file as fileIcon,
  functionMath as functionMathIcon,
  userFill as userFillIcon,
  download as downloadIcon,
  toilet as toiletIcon,
  mouse as mouseIcon,
  chevronCircleDown as chevronCircleDownIcon,
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
          icon: bugIcon,
          name: "Clicked issues anchor",
          value: this.chromeSync.metrics.clickedIssuesAnchor ? "Yuup!" : "Nope",
        },
        {
          icon: githubIcon,
          name: "Clicked github anchor",
          value: this.chromeSync.metrics.clickedGithubAnchor ? "Yuup!" : "Nope",
        },
        {
          icon: fileIcon,
          name: "Clicked legals anchor",
          value: this.chromeSync.metrics.clickedLegalsAnchor ? "Yuup!" : "Nope",
        },
        {
          icon: functionMathIcon,
          name: "Times clicked popup action",
          value: this.chromeSync.metrics.clickedActionCount,
        },
        {
          icon: userFillIcon,
          name: "Changed default avatar",
          value: this.chromeSync.metrics.changedAvatarOpt ? "Yuup!" : "Nope",
        },
        {
          icon: downloadIcon,
          name: "Extension installed lol",
          value: this.chromeSync.metrics.extensionInstalled ? "Yuup!" : "Nope",
        },
        {
          icon: toiletIcon,
          name: "Clicked reset data",
          value: this.chromeSync.metrics.clickedResetData ? "Yuup!" : "Nope",
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
      ];
    },
  },
};
</script>