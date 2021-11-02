<template>
  <div class="user-background">
    <div
      class="image"
      v-bind:style="{
        backgroundImage: 'url(' + backgroundImage + ')',
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

    <router-link to="/options/background" class="btn btn-edit-cover">
      <span class="icon" v-html="penIcon"></span>
      <span class="text">Edit cover</span>
      <div class="rippleJS"></div>
    </router-link>
  </div>
</template>

<script>
// import axios from "axios";
import { pen as penIcon } from "@/data/icons";
import { optionBackgroundImage as mockedData } from "@/data/mockedData";

export default {
  name: "UserBackground",
  props: {
    chromeSync: Object,
  },
  created() {
    // console.log(this.chromeSyncLoaded);
    if (process.env.NODE_ENV != "development") {
      // if (!this.firedDownloadLocation) {
      //   let url = this.chromeSync.options.background.downloadLocation;
      //   if (!url.includes(process.env.VUE_APP_UNSPLASH_ACCESS_KEY)) {
      //     url += "?client_id=" + process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
      //   }
      //   axios.get(url).then((response) => {
      //     this.firedDownloadLocation = true;
      //   });
      // }

      this.backgroundImage = this.chromeSync.options.background.regular;
    } else {
      this.backgroundImage = this.mockedData.image;
    }
  },
  data() {
    return {
      penIcon,
      firedDownloadLocation: false,
      backgroundImage: "",
      mockedData,
    };
  },
};
</script>
