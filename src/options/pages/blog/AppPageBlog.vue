<template>
  <div class="page-content">
    <div id="blog-content">
      <main-title title="BLOG"></main-title>

      <main-content containerClass="blog-container">
        <section id="timeline" :class="timeLineContainerClass">
          <div class="timeline-block" v-for="post in pagePosts" v-bind:key="post.id">
            <div class="timeline-img"></div>

            <div class="timeline-content">
              <post-card :post="post"></post-card>
              <span class="date">
                {{ date(post.date) }}
                <span>{{ dateAgo(post.date) }}</span>
              </span>
            </div>
          </div>
        </section>

        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" @change="toTop"></b-pagination>
      </main-content>
    </div>

    <sidebar-right :items="posts"></sidebar-right>
  </div>
</template>

<script>
import moment from "moment";

import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import PostCard from "./../../components/PostCard.vue";
import SidebarRight from "./sidebar-right/SidebarRight.vue";

import posts from "./../../../posts.js";

export default {
  name: "AppPageBlog",
  components: {
    MainTitle,
    MainContent,
		PostCard,
		SidebarRight,
  },
  data: () => {
    return {
      perPage: 9,
      currentPage: 1,
      posts,
    };
  },
  computed: {
    rows() {
      return this.posts.length;
    },
    lastPage() {
      return Math.ceil(this.posts.length / this.perPage);
    },
    pagePosts() {
      let from = this.perPage * (this.currentPage - 1),
        to = from + this.perPage;
      if (to > this.posts.length) to = this.posts.length;

      return this.posts.slice(from, to);
    },
    timeLineContainerClass() {
      let result = "page-" + this.currentPage;

      if (
        (this.currentPage == this.lastPage && this.currentPage == 1) ||
        this.currentPage == this.lastPage
      ) {
        result += " page-last";
      }
      return result;
    },
  },
  methods: {
    date(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    dateAgo(date) {
      return moment(date).fromNow();
    },
    toTop(event) {
      document.getElementsByTagName("main")[0].scrollTo(0, 0);
    },
  },
};
</script>
