<template>
  <div class="user-background">
    <div
      class="image"
      v-bind:style="{
        backgroundImage: 'url(' + chromeSync.options.background.image + ')',
      }"
    ></div>

    <div class="credits">
      <span class="lbl">Photo by</span>
      <a
        :href="chromeSync.options.background.userLink"
        target="_blank"
        rel="noopener noreferrer"
        >{{ chromeSync.options.background.userName }}</a
      >
    </div>

    <router-link to="/options" class="btn btn-edit-cover">
      <span class="icon" v-html="penIcon"></span>
      <span class="text">Edit cover</span>
      <div class="rippleJS"></div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import { pen as penIcon } from "@/data/icons";

export default {
  name: "UserBackground",
  props: {
    chromeSync: Object,
  },
  mounted() {
    if (!this.firedDownloadLocation) {
      let url = this.chromeSync.options.background.downloadLocation;
      if (!url.includes(process.env.VUE_APP_UNSPLASH_ACCESS_KEY)) {
        url += "?client_id=" + process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
      }
      axios.get(url).then((response) => {
        this.firedDownloadLocation = true;
      });
    }
  },
  data() {
    return {
      penIcon,
      firedDownloadLocation: false,
    };
  },
};
</script>
