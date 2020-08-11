<template>
  <div class="page-content">
    <div id="achievements-content">
      <main-title title="Release notes for TLmanaGer"></main-title>

      <main-content containerClass="achievements-container">
        <div class="inner-text"></div>
      </main-content>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { achievements } from "./../../../data.js";
import watchArchievements from "../../../mixins/watchArchievements.js";

import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";

export default {
  name: "AppPageChangelog",
  props: {
    chromeData: Object,
    releases: [],
  },
  components: {
    MainTitle,
    MainContent,
  },
  created() {
    this.getReleases();
  },
  mounted() {
    setTimeout(() => this.lookChangelog50Times(), 1000);
  },
  mixins: [watchArchievements],
  data() {
    return {
      achievementsData: achievements,
    };
  },
  methods: {
    getReleases() {
      return axios
        .get(`https://api.github.com/repos/joelthorner/TLmanaGer/releases`)

        .then((response) => {
          console.log(response.data);
          // this.version = response.data[0].tag_name;
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>