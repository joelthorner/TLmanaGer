<template>
  <div class="row">
    <div
      class="col-12 col-xl-6 col-last-blog"
      v-for="post in last3Posts"
      v-bind:key="post.id"
    >
      <post-card :post="post"></post-card>
    </div>
  </div>
</template>

<script>
import PostCard from "@options/components/PostCard";
import posts from "@/data/posts";

export default {
  name: "LastPosts",
  components: {
    PostCard,
  },
  data() {
    return {
      posts,
      maxLastPosts: 3,
    };
  },
  computed: {
    last3Posts() {
      return this.posts.slice(0, 3);
    },
  },
};
</script>