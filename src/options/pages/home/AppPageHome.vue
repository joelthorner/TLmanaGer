<template>
  <div class="page-content">
    <div id="home-content">
      <div class="background-widget">
        <div class="image" v-bind:style="{ backgroundImage: 'url(' + backgroundWindowSize + ')' }"></div>
        <div class="credits">
          <span class="lbl">Photo by</span>
          <a
            :href="chromeData.logicommerce.background.userLink"
            target="_blank"
            rel="noopener noreferrer"
          >{{ chromeData.logicommerce.background.userName }}</a>
        </div>
      </div>

      <main-title title="LAST BLOG POSTS"></main-title>

      <main-content containerClass="home-last-posts">
        <div class="container-fluid">
          <div class="row">
            <div class="col" v-for="post in posts" v-bind:key="post.id">
              <div class="card">
                <img :src="post.img" class="card-img-top" :alt="post.name" />
                <div class="card-body">
                  <div class="card-title">{{ post.name }}</div>
                  <p class="card-text" v-html="post.content"></p>
                  <p class="card-text">
                    <small class="text-muted">{{ getPostDate(post.date) }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main-content>
    </div>

    <sidebar-right :chromeData="chromeData"></sidebar-right>
  </div>
</template>

<script>
import axios from "axios";

import SidebarRight from "./sidebar-right/SidebarRight.vue";
import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import { posts } from "./../../../data.js";

export default {
  name: "AppPageHome",
  components: {
    SidebarRight,
    MainTitle,
    MainContent,
  },
  props: {
    chromeData: Object,
  },
  computed: {
    backgroundWindowSize() {
      return this.chromeData.logicommerce.background.thumb.replace(
        "w=400",
        "w=" + window.innerWidth
      );
    },
	},
	methods: {
		getPostDate(date) {
			return moment(date).duration()
		}
	},
  data: () => {
    return {
      // background: {},
      posts,
    };
  },
  // created() {
  //   this.getBackground();
  // },
  // methods: {
  //   getBackground: function () {
  //     chrome.storage.sync.get(chromeData.logicommerce.background, (result) => {
  // 			this.background = result;
  // 			this.background.thumb = this.background.thumb.replace("w=400", "w=" + window.innerWidth);

  //       axios
  //         .get(this.background.downloadLocation)

  //         .then((response) => {
  //           // console.log(response);
  //         })

  //         .catch((err) => {
  //           // console.log(err);
  //         });
  //     });
  //   },
  // },
};
</script>