<template>
  <div class="footer-block">
    <div class="title">{{ title }}</div>
    <ul class="list-unstyled">
      <li v-for="(item, index) in items" v-bind:key="index">
        <a
          :href="item.route"
          target="_blank"
          rel="noopener noreferrer"
          v-on:click="setArchivement(item.id)"
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
import { archivements } from "./../../../data.js";
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
			archivementsData: archivements,
		}
	},
	created() {
		/* DEBUG LINE */
		// this.chromeData.archivements['intallExtension'].earned = true;
		// this.chromeData.archivements['clickGithubLink'].earned = false;
		// chrome.storage.sync.set(this.chromeData, () => {
		// });
		/* END DEBUG LINE */
	},
	methods: {
    setArchivement: function (id) {
      if (id === 'project') {
				// Earn archivement block -----------------------------------------------------
				// Update metric first
				this.chromeData.metrics.clickedGithubAnchor = true;
				// Get data of archivement
				const archvData = this.archivementsData['clickGithubLink'];
				// Get confition() parameters
				const clickedGithubAnchor = this.chromeData.metrics.clickedGithubAnchor;
				// Execute condition()
				const result = archvData.condition(clickedGithubAnchor);
				// Get result before update archivement
				const beforeResult = this.chromeData.archivements['clickGithubLink'].earned;
				
				if (beforeResult === false && result === true) {
					// Update archivement chrome data
					this.chromeData.archivements['clickGithubLink'].earned = result;
					// Save sync and launch system notify
					chrome.storage.sync.set(this.chromeData, () => {
						this.createArchivementNotify(archvData);
					});
				}
				// End earn archivement block ---------------------------------------------------
			} else if (id === 'issues') {
				
			}
    }
  }
};
</script>