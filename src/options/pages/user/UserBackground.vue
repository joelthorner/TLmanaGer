<template>
  <div class="user-background">
    <div
      class="image"
      v-bind:style="{
        backgroundImage:
          'url(' + chromeSync.logicommerce.background.image + ')',
      }"
    ></div>
    <div class="credits">
      <span class="lbl">Photo by</span>
      <a
        :href="chromeSync.logicommerce.background.userLink"
        target="_blank"
        rel="noopener noreferrer"
        >{{ chromeSync.logicommerce.background.userName }}</a
      >
    </div>

    <router-link to="/options/logicommerce" class="btn btn-edit-cover">
      <span class="icon" v-html="icons.pen"></span>
      <span class="text">Edit cover</span>
      <div class="rippleJS"></div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import icons from "@/data/icons";

export default {
  name: "UserBackground",
  props: {
    chromeSync: Object,
  },
  mounted() {
    if (!this.firedDownloadLocation) {
      axios
        .get(this.chromeSync.logicommerce.background.downloadLocation)
        .then((response) => {
          this.firedDownloadLocation = true;
        });
    }
  },
  data() {
    return {
      icons,
      firedDownloadLocation: false,
    };
  },
};
</script>
