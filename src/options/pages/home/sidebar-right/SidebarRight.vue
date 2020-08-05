<template>
  <aside class="aside-right">
    <sidebar-right-resume>
			<a :href="releaseLink" target="_blank" rel="noopener noreferrer">
				<span class="title">VERSION</span>
				<span class="content">{{ getVersion }}</span>
				<span class="icon" v-html="caret"></span>
			</a>
    </sidebar-right-resume>
  </aside>
</template>

<script>
import axios from "axios";

import SidebarRightResume from "./SidebarRightResume";
import { icons } from "./../../../../data.js";

export default {
  name: "SidebarRight",
  data: () => {
    return {
			version: "1.0.0",
			caret: icons.caretRight
    };
  },
  components: {
    SidebarRightResume,
	},
	computed: {
		getVersion() {
			return chrome.runtime.getManifest().version;
		},
		releaseLink() {
			return `https://github.com/joelthorner/TLmanaGer/releases/tag/v${this.getVersion}`;
		},
	}
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