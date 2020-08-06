<template>
  <aside class="aside-right">
    <div class="resume">
    	<sidebar-right-resume-item>
				<a :href="releaseLink" target="_blank" rel="noopener noreferrer">
					<span class="title">VERSION</span>
					<span class="content">{{ getVersion }}</span>
					<span class="icon" v-html="caret"></span>
					<div class="rippleJS"></div>
				</a>
			</sidebar-right-resume-item>
			<sidebar-right-resume-item>
				<router-link to="/achievements">
					<span class="title">ACHIEVEMENTS</span>
					<span class="content">{{ currentAchievements }}/{{ totalAchievements }}</span>
					<span class="icon" v-html="caret"></span>
					<div class="rippleJS"></div>
				</router-link>
			</sidebar-right-resume-item>
    </div>
  </aside>
</template>

<script>
import axios from "axios";

import SidebarRightResumeItem from "./SidebarRightResumeItem";
import { icons, archivements, chromeData } from "./../../../../data.js";

export default {
  name: "SidebarRight",
  data: () => {
    return {
			version: "1.0.0",
			caret: icons.caretRight,
			currentAchievements: 0,
			totalAchievements: 0,
    };
  },
  components: {
    SidebarRightResumeItem,
	},
	created() {
    this.getCurrentAchievements();
    this.getTotalAchievements();
  },
	computed: {
		getVersion() {
			return chrome.runtime.getManifest().version;
		},
		releaseLink() {
			return `https://github.com/joelthorner/TLmanaGer/releases/tag/v${this.getVersion}`;
		},
	},
	methods: {
		getCurrentAchievements() {
			chrome.storage.sync.get(chromeData.archivements, (result) => {
				Object.keys(result).forEach(key => {
					if (result[key]) this.currentAchievements++;
				});
			});
		},
		getTotalAchievements() {
			let key;
			for (key in archivements) {
				if (archivements.hasOwnProperty(key)) this.totalAchievements++;
			}
		}
	},
  // created() {
  //   this.listReleases();
  // },
  // methods: {
  //   listReleases() {
  //     return axios
  //       .get(`https://api.github.com/repos/joelthorner/TLmanaGer/releases`)

  //       .then((response) => {
  //         console.log(response.data[0]);
  //         this.version = response.data[0].tag_name;
  //       })

  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  // },
};
</script>