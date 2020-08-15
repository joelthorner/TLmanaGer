<template>
  <div class="page-content" v-if="finded">
    <div id="post-content">
      <main-title :title="post.name"></main-title>

      <main-content containerClass="post-container"></main-content>
    </div>
  </div>
</template>

<script>
import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";

import posts from "./../../../posts.js";

export default {
  name: "AppPagePost",
  components: {
    MainTitle,
    MainContent,
  },
  created() {
    this.getPostData();
  },
  data() {
    return {
      id: parseInt(this.$route.params.id),
      post: {},
      finded: false,
    };
  },
  watch: {
    $route(to, from) {
      this.id = parseInt(to.params.id);
      this.getPostData();
    },
  },
  methods: {
    getPostData() {
      this.post = {};
      this.finded = false;

      posts.forEach((post) => {
        if (post.id === this.id) {
          this.post = post;
          this.finded = true;
          return;
        }
      });
    },
  },
};
</script>
