<template>
  <div class="page-content">
    <div id="home-content">
      <div class="background-widget">
        <div class="image" v-bind:style="{ backgroundImage: 'url(' + backgroundWindowSize + ')' }"></div>
        <div class="credits">
          <span class="lbl">Photo by</span>
          <a
            :href="chromeSync.logicommerce.background.userLink"
            target="_blank"
            rel="noopener noreferrer"
          >{{ chromeSync.logicommerce.background.userName }}</a>
        </div>
      </div>

      <main-title title="Last blog posts"></main-title>

      <main-content containerClass="home-last-posts">
        <div class="row">
          <div
            class="col col-md-12 col-lg-6 col-xl-4"
            v-for="post in last3Posts"
            v-bind:key="post.id"
          >
            <post-card :post="post"></post-card>
          </div>
        </div>
      </main-content>
    </div>

    <sidebar-right :chromeSync="chromeSync"></sidebar-right>
  </div>
</template>

<script>
import SidebarRight from "@options/pages/home/sidebar-right/SidebarRight";
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import PostCard from "@options/components/PostCard";
import posts from "@/data/posts";
import axios from "axios";

export default {
  name: "AppPageHome",
  components: {
    SidebarRight,
    MainTitle,
    MainContent,
    PostCard,
  },
  props: {
    chromeSync: Object,
  },
  data: () => {
    return {
      posts,
      maxLastPosts: 3,
      firedDownloadLocation: false,
    };
  },
  mounted() {
    if (!this.firedDownloadLocation) {
      axios
        .get(
          `${this.chromeSync.logicommerce.background.downloadLocation}?&client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`
        )
        .then((response) => {
          this.firedDownloadLocation = true;
        });
    }
  },
  computed: {
    last3Posts() {
      return this.posts.slice(0, 3);
    },
    backgroundWindowSize() {
      return this.chromeSync.logicommerce.background.image;
    },
  },
};
</script>