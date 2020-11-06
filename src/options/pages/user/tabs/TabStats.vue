<template>
  <div class="tab">
    <div class="card card-stats">
      <div class="card-body">
        <b-table
          :items="getItems"
          thead-class="d-none"
          borderless
          table-class="table-stats"
        >
          <template #cell(icon)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import getArchievementsMixin from "@mixins/getArchievements";
import icons from "@/data/icons";

export default {
  name: "TabStats",
  mixins: [getArchievementsMixin],
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      icons,
    };
  },
  computed: {
    getItems() {
      return [
        {
          icon: icons.award,
          name: "Achievements earned",
          value: `${this.currentAchievements}/${
            this.totalAchievements
          } (${Number(this.earnedPercent.toFixed(1))}%)`,
        },
        {
          icon: icons.unsplash,
          name: "Times background changed",
          value: this.chromeSync.metrics.timesBgChanged,
        },
        {
          icon: icons.zendesk,
          name: "Zendesk active options",
          value: this.chromeSync.metrics.zendeskActiveOptsCount,
        },
        {
          icon: icons.toggleOn,
          name: "Total active options",
          value: this.chromeSync.metrics.totalActiveOptsCount,
        },
        {
          icon: icons.codeBranch,
          name: "Times open changelog",
          value: this.chromeSync.metrics.openChangelogCount,
        },
        {
          icon: icons.bug,
          name: "Clicked issues anchor",
          value: this.chromeSync.metrics.clickedIssuesAnchor ? 'Yuup!' : 'Nope',
        },
        {
          icon: icons.github,
          name: "Clicked github anchor",
          value: this.chromeSync.metrics.clickedGithubAnchor ? 'Yuup!' : 'Nope',
        },
        {
          icon: icons.file,
          name: "Clicked legals anchor",
          value: this.chromeSync.metrics.clickedLegalsAnchor ? 'Yuup!' : 'Nope',
        },
        {
          icon: icons.function,
          name: "Times clicked popup action",
          value: this.chromeSync.metrics.clickedActionCount,
        },
        {
          icon: icons.userFill,
          name: "Changed default avatar",
          value: this.chromeSync.metrics.changedAvatarOpt ? 'Yuup!' : 'Nope',
        },
        {
          icon: icons.download,
          name: "Extension installed lol",
          value: this.chromeSync.metrics.extensionInstalled ? 'Yuup!' : 'Nope',
        },
        {
          icon: icons.toilet,
          name: "Clicked reset data",
          value: this.chromeSync.metrics.clickedResetData ? 'Yuup!' : 'Nope',
        },
        {
          icon: icons.mouse,
          name: "General extension clicks",
          value: this.chromeSync.metrics.clickOnExtensionCount,
        },
        {
          icon: icons.chevronCircleDown,
          name: "Times open popup",
          value: this.chromeSync.metrics.openPopupCounter,
        },
      ];
    },
  },
};
</script>