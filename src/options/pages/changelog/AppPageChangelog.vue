<template>
  <div class="page-content">
    <div id="changelog-content">
      <main-title title="CHANGELOG"></main-title>

      <main-content containerClass="changelog-container">
        <div class="inner-text">Release notes for TLmanaGer</div>

        <div id="release-notes">
          <section class="release-block card" v-for="release in releases" v-bind:key="release.id">
            <div class="card-body">
              <header>
                <div class="d-flex">
                  <div class="icon" v-html="icon"></div>
                  <span class="version">{{ getTagName(release.tag_name) }}</span>
                </div>
                <div class="date">
                  <small class="text-muted">{{ getReleaseDate(release.created_at) }}</small>
                </div>
              </header>

              <ul class="list-unstyled">
                <li
                  v-for="(line, index) in getReleaseLines(release.body)"
                  v-bind:key="index"
                  v-html="changelogLineParse(line)"
                ></li>
              </ul>
            </div>
          </section>
        </div>
      </main-content>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { setupCache } from "axios-cache-adapter";
import { achievements, icons } from "./../../../data.js";
import watchArchievements from "../../../mixins/watchArchievements.js";

import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

export default {
  name: "AppPageChangelog",
  props: {
    chromeData: Object,
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
      achievementsData: achievements, // required for mixins
      releases: [],
      icon: icons.changelog,
    };
  },
  methods: {
    getReleases() {
      // return axios
      //   .get(`https://api.github.com/repos/joelthorner/TLmanaGer/releases`)

      //   .then((response) => {
      //     console.log(response.data);
      //     this.releases = response.data;
      //   })

      //   .catch((err) => {
      //     console.log(err);
      //   });
      api({
        url: `https://api.github.com/repos/joelthorner/TLmanaGer/releases`,
        method: "get",
      }).then(async (response) => {
        console.log(response.data);
        this.releases = response.data;
      });
    },
    getReleaseLines(content) {
      return content.split("\n").sort();
    },
    getReleaseDate(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    getTagName(tag) {
      return tag.replace(/^[vV]{1}/, "");
    },
    changelogLineParse(value) {
      let newValue = value;
      let issueUrl = "https://github.com/joelthorner/TLmanaGer/issues/";
      // list clean
      newValue = newValue.replace(/^-\s{1}/, "");
      // badge
      newValue = newValue.replace(/(\*\*[A-Z]{2,}\*\*)/, function (
        match,
        capture
      ) {
        const _c = capture.replace(/\*/g, "");
        return `<span class="badge badge-${_c.toLowerCase()}">${_c.toUpperCase()}</span>`;
      });
      // issue
      newValue = newValue.replace(
        /(#\d{1,4})(#issuecomment-\d{1,20})?/,
        function (match, capture, capture2) {
          const _c = capture.replace("#", "");
          const _c2 = capture2 ? capture2 : "";
          return `<a href="${issueUrl}${_c}${_c2}" target="_blank" rel="noopener noreferrer">${capture}</a>`;
        }
      );
      return newValue;
    },
  },
};
</script>