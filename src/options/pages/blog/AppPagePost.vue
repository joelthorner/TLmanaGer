<template>
  <div class="page-content" v-if="finded">
    <style-tag>
      main {
      background-image: url({{ this.post.img }});
      background-position: center;
      background-size: cover;
      }
      .page-content {
      backdrop-filter: blur(10px);
      height: 100%;
      }
    </style-tag>
    <div id="post-content">
      <main-content containerClass="post-container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post.name }}</h5>
            <p class="card-text" v-html="post.content"></p>
            <p class="card-text">
              <small class="text-muted">{{ date }}</small>
            </p>
          </div>
        </div>
      </main-content>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import MainContent from "@options/components/main/MainContent";
import StyleTag from "@options/components/StyleTag";

import posts from "@/data/posts";

export default {
  name: "AppPagePost",
  components: {
    MainContent,
    StyleTag,
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
  computed: {
    date() {
      return moment(this.post.date).format("MMMM Do YYYY");
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
