<template>
  <div>AppPagePost - {{ post.name }}</div>
</template>

<script>
import { posts } from "./../../../data.js";

export default {
  name: "AppPagePost",
  props: {
    id: Number,
  },
  created() {
    this.getPostData();
  },
  data() {
    return {
      post: {},
      finded: false,
    };
  },
  watch: {
    id: function (newVal, oldVal) {
      this.getPostData();
    },
  },
  methods: {
    getPostData: function () {
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