<template>
  <div class="page-content">
    <div id="blog-content">
      <main-content containerClass="blog-container">
        <div class="inner-text" v-if="anyFilter">
          Filtering by
          <span v-if="checkedYears.length" class="filtering-lbl">
            <span class="lbl">Year:</span>
            <span class="badge badge-primary" v-for="year in checkedYears" v-bind:key="year">
              {{ year }}
              <button
                class="btn btn-link"
                @click="removeYearFilterItem(year)"
                v-html="iconClose"
              ></button>
            </span>
          </span>
          <span v-if="checkedTag.length" class="filtering-lbl">
            <span class="lbl">Tag:</span>
            <span class="badge badge-primary">
              {{ checkedTag | capitalize }}
              <button
                class="btn btn-link"
                @click="checkedTag = ''"
                v-html="iconClose"
              ></button>
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
          prev-text="Older"
          next-text="Newer"
          :hide-goto-end-buttons="true"
          pills
          v-if="posts.length > perPage"
        ></b-pagination>
      </main-content>
    </div>

    <sidebar-right>
      <sidebar-right-block title="ARCHIVE" classContainer="blog-widget">
        <b-form-group>
          <b-form-checkbox-group
            id="checkbox-group-years"
            v-model="checkedYears"
            :options="postsUniqueYearsFilter"
            stacked
            size="lg"
          ></b-form-checkbox-group>
        </b-form-group>
      </sidebar-right-block>

      <sidebar-right-block title="TAGS" classContainer="blog-widget">
        <b-form-group>
          <b-form-radio-group
            id="radio-group-labels"
            v-model="checkedTag"
            :options="postsUniqueTagsFilter"
            stacked
            size="lg"
          ></b-form-radio-group>
        </b-form-group>
      </sidebar-right-block>
    </sidebar-right>
  </div>
</template>

<script>
import moment from "moment";

import MainContent from "@options/components/main/MainContent";
import PostCard from "@options/components/PostCard";
import SidebarRight from "@options/pages/blog/sidebar-right/SidebarRight";
import SidebarRightBlock from "@options/pages/blog/sidebar-right/SidebarRightBlock";

import posts from "@/data/posts";
import icons from "@/data/icons";

export default {
  name: "AppPageBlog",
  components: {
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
      iconClose: icons.times,
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
          text: year,
          value: year,
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
          tags.push({
            text: obj.tags[i].charAt(0).toUpperCase() + obj.tags[i].slice(1),
            value: obj.tags[i],
          });
        }
      });

      return tags.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return (
          index ===
          tags.findIndex((obj) => {
            return JSON.stringify(obj) === _thing;
          })
        );
      });
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
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
