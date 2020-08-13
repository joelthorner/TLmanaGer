<template>
  <div class="page-content">
    <div id="blog-content">
      <main-title title="BLOG"></main-title>

      <main-content containerClass="blog-container">
        <div class="row">
          <div class="col col-content">
            <section id="cd-timeline">
              <div class="cd-timeline-block" v-for="post in posts" v-bind:key="post.id">
                <div class="cd-timeline-img cd-location"></div>

                <div class="cd-timeline-content">
                  <post-card :post="post"></post-card>
                  <span class="cd-date">
                    {{ cdDate(post.date) }}
                    <span>{{ cdDateAgo(post.date) }}</span>
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div class="col col-column">col</div>
        </div>
      </main-content>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import PostCard from "./../../components/PostCard.vue";
import posts from "./../../../posts.js";

export default {
  name: "AppPageBlog",
  components: {
    MainTitle,
    MainContent,
    PostCard,
  },
  data: () => {
    return {
      posts,
    };
  },
  methods: {
    cdDate(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    cdDateAgo(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
