<template>
  <div class="page-content">
    <main-title title="Blog"></main-title>

    <blog-nav @setFilterParent="setFilter"></blog-nav>

    <main-content containerClass="blog-container">
      <transition-group class="grid-posts dynamic-grid" name="dynamic-grid">
        <div
          class="dynamic-grid-item"
          v-for="post in activePosts"
          v-bind:key="post.id"
        >
          <post-card :post="post"></post-card>
        </div>
      </transition-group>
    </main-content>
  </div>
</template>

<script>
import posts from "@/data/posts";

import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import PostCard from "@options/components/PostCard";
import BlogNav from "@options/pages/blog/BlogNav";

const ALL_POSTS = "all";

export default {
  name: "AppPageBlog",
  components: {
    MainTitle,
    MainContent,
    BlogNav,
    PostCard,
  },
  props: {
    chromeSync: Object,
  },
  data: () => {
    return {
      posts,
      currentFilter: ALL_POSTS,
    };
  },
  computed: {
    activePosts() {
      return this.posts.filter((post) => {
        return (
          post.tags.indexOf(this.currentFilter) ||
          this.currentFilter === ALL_POSTS
        );
      });
    },
  },
  methods: {
    setFilter(value) {
      this.currentFilter = value;
    },
  },
};
</script>
