<template>
  <div class="page-content" v-if="finded">
    <main-title
      title="Blog"
      :subtitle="` / ${post.name}`"
      titleLink="/blog"
    ></main-title>
    <main-content containerClass="post-container">
      <div class="row">
        <div class="col-auto">
          <img :src="post.img" class="img-fluid rounded" />
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body flex-column">
              <h5 class="card-title">{{ post.name }}</h5>
              <p class="card-text" v-html="post.content"></p>
              <p class="card-text mt-auto">
                <small class="text-muted">{{ date }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <router-link
        to="/blog"
        class="back-to-blog mt-5 d-flex align-items-center"
      >
        <span class="icon" v-html="caretLeftIcon"></span>Tornar al blog
      </router-link>
    </main-content>
  </div>
</template>

<script>
import moment from "moment";
import { caretLeft as caretLeftIcon } from "@/data/icons";

import MainContent from "@options/components/main/MainContent";
import MainTitle from "@options/components/main/MainTitle";
import StyleTag from "@options/components/StyleTag";

import posts from "@/data/posts";

export default {
  name: "AppPagePost",
  components: {
    MainContent,
    MainTitle,
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
      caretLeftIcon,
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
      return moment(this.post.date, "MM-DD-YYYY").format("MMMM Do YYYY");
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
