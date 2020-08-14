<template>
  <div class="page-content">
    <div id="blog-content">
      <main-title title="BLOG"></main-title>

      <main-content containerClass="blog-container">
        <div class="inner-text" v-if="anyFilter">
          Filtering by
          <span v-if="checkedYears.length" class="filtering-lbl">
            <span class="lbl">Year</span>
            <span class="badge badge-primary" v-for="year in checkedYears" v-bind:key="year">
              {{ year }}
              <button @click="removeYearFilterItem(year)">x</button>
            </span>
          </span>
          <span v-if="checkedTag.length">
            <span class="lbl">Tag</span>
            <span class="badge badge-primary">
              {{ checkedTag }}
              <button @click="checkedTag = ''">x</button>
            </span>
          </span>
        </div>

        <section id="timeline" :class="timelinePageClass">
          <div class="timeline-block" v-for="post in perPagePosts" v-bind:key="post.id">
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

        <b-pagination
          v-model="currentPage"
          :total-rows="paginationRows"
          :per-page="perPage"
          @change="toTop"
        ></b-pagination>
      </main-content>
    </div>

    <sidebar-right>
      <sidebar-right-block title="YEAR FILTER" classContainer="blog-widget">
        <ul class="list-unstyled">
          <li v-for="year in postsUniqueYearsFilter" v-bind:key="year.value">
            <input type="checkbox" v-model="checkedYears" v-bind:value="year.value" />
            {{ year.name }}
          </li>
        </ul>
      </sidebar-right-block>

      <sidebar-right-block title="TAGS" classContainer="blog-widget">
        <ul class="list-unstyled">
          <li v-for="(tag, index) in postsUniqueTagsFilter" v-bind:key="index">
            <input type="radio" v-model="checkedTag" v-bind:value="tag" name="postTag" />
            {{ tag }}
          </li>
        </ul>
      </sidebar-right-block>
    </sidebar-right>
  </div>
</template>

<script>
import moment from "moment";

import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import PostCard from "./../../components/PostCard.vue";
import SidebarRight from "./sidebar-right/SidebarRight.vue";
import SidebarRightBlock from "./sidebar-right/SidebarRightBlock.vue";

import posts from "./../../../posts.js";

export default {
  name: "AppPageBlog",
  components: {
    MainTitle,
    MainContent,
    PostCard,
    SidebarRight,
    SidebarRightBlock,
  },
  data: () => {
    return {
      perPage: 9,
      currentPage: 1,
      posts,
      checkedYears: [],
      checkedTag: "",
    };
  },
  computed: {
    paginationRows() {
      return this.filteredPosts.length;
    },
    totalPagesPagination() {
      return Math.ceil(this.filteredPosts.length / this.perPage);
    },
    perPagePosts() {
      let from = this.perPage * (this.currentPage - 1),
        to = from + this.perPage;
      if (to > this.filteredPosts.length) to = this.filteredPosts.length;

      return this.filteredPosts.slice(from, to);
    },
    timelinePageClass() {
      let result = "page-" + this.currentPage;

      if (
        (this.currentPage == this.totalPagesPagination &&
          this.currentPage == 1) ||
        this.currentPage == this.totalPagesPagination
      ) {
        result += " page-last";
      }
      return result;
    },
    postsUniqueYearsFilter() {
      let years = this.posts.map(function (obj) {
        let year = moment(obj.date).year();
        return {
          name: year,
          value: year,
          checked: false,
        };
      });

      return years.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return (
          index ===
          years.findIndex((obj) => {
            return JSON.stringify(obj) === _thing;
          })
        );
      });
    },
    postsUniqueTagsFilter() {
      let tags = [];
      this.posts.map(function (obj) {
        for (var i = 0; i < obj.tags.length; i++) {
          tags.push(obj.tags[i]);
        }
      });
      return tags.filter((v, i, a) => a.indexOf(v) === i);
    },

    filteredPosts() {
      return this.posts
        .filter((post) => {
          if (this.checkedYears.length) {
            let bool = false;
            this.checkedYears.forEach((year) => {
              if (post.date.includes(year)) bool = true;
            });
            return bool;
          }
          return true;
        })
        .filter((post) => {
          if (this.checkedTag.length) {
            return post.tags.includes(this.checkedTag);
          }
          return true;
        });
    },
    anyFilter() {
      return this.checkedYears.length || this.checkedTag.length;
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
    removeYearFilterItem(year) {
      let index = this.checkedYears.indexOf(year);
      this.checkedYears.splice(index, 1);
    },
  },
};
</script>
