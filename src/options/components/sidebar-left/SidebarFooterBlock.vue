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

export default {
  name: "SidebarFooterBlock",
  props: {
		title: String,
		items: Array,
		chromeData: Object,
	},
	data() {
		return {
			archivementsData: archivements,
		}
	},
	methods: {
    setArchivement: function (id) {
      if (id === 'project') {
				// agafo data de archivement
				const archvData = this.archivementsData['clickGithubLink'];
				// agafo metrics de chrome data
				let clicked = this.chromeData.metrics.clickedGithubAnchor;
				// miro si metric que vull + condicio de data
				let result = archvData.condition(clicked);
				// actualitzo la variable chromedata global tambe
				this.chromeData.archivements['clickGithubLink'].earned = true;
				// guardo chrome archivement.earned
				chrome.storage.sync.set(this.chromeData, function() {
          console.log('Value is set to ' + value);
				});


				
				// this.chromeData.archivements['clickGithubLink']
			} else if (id === 'issues') {
				
			}
    }
  }
};
</script>