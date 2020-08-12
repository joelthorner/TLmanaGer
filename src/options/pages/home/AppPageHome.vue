<template>
  <div class="page-content">
    <div id="home-content">
      <div class="background-widget">
        <div class="image" v-bind:style="{ backgroundImage: 'url(' + backgroundWindowSize + ')' }"></div>
        <div class="credits">
          <span class="lbl">Photo by</span>
          <a
            :href="chromeData.logicommerce.background.userLink"
            target="_blank"
            rel="noopener noreferrer"
          >{{ chromeData.logicommerce.background.userName }}</a>
        </div>
      </div>

      <main-title title="LAST BLOG POSTS"></main-title>

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

    <sidebar-right :chromeData="chromeData"></sidebar-right>
  </div>
</template>

<script>
import SidebarRight from "./sidebar-right/SidebarRight.vue";
import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import PostCard from "./../../components/PostCard.vue";
import posts from "./../../../posts.js";

export default {
  name: "AppPageHome",
  components: {
    SidebarRight,
    MainTitle,
    MainContent,
    PostCard,
  },
  props: {
    chromeData: Object,
  },
  data: () => {
    return {
      // background: {},
      posts,
      maxLastPosts: 3,
    };
  },
  computed: {
    last3Posts() {
      return this.posts
        .slice(Math.max(this.posts.length - this.maxLastPosts, 0))
        .reverse();
    },
    backgroundWindowSize() {
      return this.chromeData.logicommerce.background.thumb.replace(
        "w=400",
        "w=" + window.innerWidth
      );
    },
  },
};
</script>