<template>
  <div>
    <div id="home-content">
      <div class="background-widget">
        <div class="image" v-bind:style="{ backgroundImage: 'url(' + background.thumb + ')' }"></div>
      </div>
    </div>
    <sidebar-right></sidebar-right>
  </div>
</template>

<script>
import axios from "axios";

import SidebarRight from "./sidebar-right/SidebarRight.vue";
import { chromeData } from "./../../../data.js";

export default {
  name: "AppPageHome",
  components: {
    SidebarRight,
  },
  data: () => {
    return {
      background: {},
    };
  },
  created() {
    this.getBackground();
  },
  methods: {
    getBackground: function () {
      chrome.storage.sync.get(chromeData.logicommerce.background, (result) => {
				this.background = result;
				this.background.thumb = this.background.thumb.replace("w=400", "w=" + window.innerWidth);
				
        axios
          .get(this.background.downloadLocation)

          .then((response) => {
            // console.log(response);
          })

          .catch((err) => {
            // console.log(err);
          });
      });
    },
  },
};
</script>