<template>
  <div class="footer-block">
    <div class="title">{{ title }}</div>
    <ul class="list-unstyled">
      <li v-for="(item, index) in items" v-bind:key="index">
        <a
          :href="item.route"
          target="_blank"
          rel="noopener noreferrer"
          v-on:click="setAchievement(item.id)"
        >
          <span class="icon" v-html="item.icon"></span>
          <span class="text">{{ item.title }}</span>
          <div class="rippleJS"></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { achievements } from "./../../../data.js";
import chromeMethodsMixin from "../../../mixins/chromeMethods.js";

export default {
  name: "SidebarFooterBlock",
  props: {
		title: String,
		items: Array,
		chromeData: Object,
	},
	mixins: [chromeMethodsMixin],
	data() {
		return {
			achievementsData: achievements,
		}
	},
	created() {
		/* DEBUG LINE */
		// this.chromeData.achievements['intallExtension'].earned = true;
		// this.chromeData.achievements['clickGithubLink'].earned = false;
		// chrome.storage.sync.set(this.chromeData, () => {
		// });
		/* END DEBUG LINE */
	},
	methods: {
    setAchievement: function (id) {
      if (id === 'project') {
				// EARN ACHIEVEMENT BLOCK -----------------------------------------------------

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

				// END EARN ACHIEVEMENT BLOCK ---------------------------------------------------
			} else if (id === 'issues') {
				// EARN ACHIEVEMENT BLOCK -----------------------------------------------------

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
				
				// END EARN ACHIEVEMENT BLOCK ---------------------------------------------------
			}
    }
  }
};
</script>