<template>
  <div
    :class="'card post-' + post.id"
    data-tilt
    data-tilt-reverse="true"
    data-tilt-max="10"
  >
    <style-tag>
      .post-{{ this.post.id }}::before { background-image: url({{
        this.post.img
      }}); }
    </style-tag>
    <router-link :to="getPostRoute(post.id)" class="link-img">
      <img :src="post.img" class="card-img-top" :alt="post.name" />
      <div class="rippleJS"></div>
    </router-link>

    <div class="card-body">
      <router-link :to="getPostRoute(post.id)">
        <div class="card-title">{{ post.name }}</div>
      </router-link>

      <p class="card-text">
        {{ getSplittedPostContent(post.content) }}
        <router-link :to="getPostRoute(post.id)" class="d-block read-more"
          >Read more</router-link
        >
      </p>

      <p class="card-text card-text-foot">
        <small class="text-muted">{{ getPostDate(post.date) }}</small>
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import VanillaTilt from "vanilla-tilt";
import StyleTag from "@options/components/StyleTag";

export default {
  name: "PostCard",
  components: {
    StyleTag,
  },
  props: {
    post: Object,
  },
  mounted() {
    VanillaTilt.init(this.$el);
  },
  methods: {
    getPostRoute(id) {
      return "/blog/" + id;
    },
    getPostDate(date) {
      return moment(date, "DD/MM/YYYY").fromNow();
    },
    getPLainPostTextContent(content) {
      let span = document.createElement("span");
      span.innerHTML = content;
      let text = span.textContent || span.innerText;
      return text;
    },
    getSplittedPostContent(content) {
      let text = this.getPLainPostTextContent(content);
      if (text.length > 100) text = text.substring(0, 100).trim() + "...";
      return text;
    },
    hasReadMore(content) {
      const text = this.getPLainPostTextContent(content);
      return text.length > 100;
    },
  },
};
</script>