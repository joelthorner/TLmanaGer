<template>
  <div class="row">
    <div
      class="col col-md-12 col-lg-6 col-xl-4"
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