<template>
  <div class="page-content">
    <div id="changelog-content">
      <main-title title="Changelog"></main-title>

      <main-content containerClass="changelog-container">
        <div class="inner-text">Release notes for TLmanaGer</div>

        <div id="release-notes">
          <section
            class="release-block"
            v-for="release in releases"
            :key="release.id"
          >
            <h2>
              <a
                class="header"
                :href="releaseLink(release.tag_name)"
                target="_blank"
                >{{ getTagName(release.tag_name) }}</a
              >
            </h2>
            <h3 v-if="getReleaseLines('features', release.body).length">
              Features
            </h3>
            <ul>
              <li
                v-for="(line, index) in getReleaseLines(
                  'features',
                  release.body
                )"
                :key="index"
                v-html="changelogLineParse(line)"
              ></li>
            </ul>

            <h3 v-if="getReleaseLines('fixes', release.body).length">
              Fixes
            </h3>
            <ul>
              <li
                v-for="(line, index) in getReleaseLines('fixes', release.body)"
                :key="index"
                v-html="changelogLineParse(line)"
              ></li>
            </ul>

            <h3 v-if="getReleaseLines('others', release.body).length">
              Others
            </h3>
            <ul>
              <li
                v-for="(line, index) in getReleaseLines('others', release.body)"
                :key="index"
                v-html="changelogLineParse(line)"
              ></li>
            </ul>
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
import watchAchievements from "@mixins/watchAchievements";

import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import { githubChangelog as mockedData } from "@/data/mockedData";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

export default {
  name: "AppPageChangelog",
  props: {
    chromeSync: Object,
  },
  components: {
    MainTitle,
    MainContent,
  },
  created() {
    this.getReleases();
  },
  mounted() {
    this.lookChangelog50Times();
  },
  mixins: [watchAchievements],
  data() {
    return {
      releases: [],
      firedApiGithub: false,
      mockedData,
    };
  },
  methods: {
    getReleases() {
      if (process.env.NODE_ENV != "development") {
        if (!this.firedApiGithub) {
          api({
            url: `https://api.github.com/repos/joelthorner/TLmanaGer/releases`,
            method: "get",
          }).then(async (response) => {
            this.releases = response.data;
            this.firedApiGithub = true;
          });
        }
      } else {
        this.releases = this.mockedData;
      }
    },
    getReleaseLines(type, content) {
      let stringRexExp = "";

      if (type === "features") {
        stringRexExp = "\\*\\*NEW\\*\\*";
      } else if (type === "fixes") {
        stringRexExp = "\\*\\*IMPROVED\\*\\*|\\*\\*FIXED\\*\\*";
      } else {
        stringRexExp = "\\*\\*REMOVED\\*\\*|\\*\\*CHANGED\\*\\*";
      }

      let regExp = new RegExp(stringRexExp, "g");
      return content.split("\n").filter((line) => regExp.test(line));
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
      newValue = newValue.replace(/(\*\*[A-Z]{2,}\*\*)/, function(
        match,
        capture
      ) {
        // const _c = capture.replace(/\*/g, "");
        // return `<span class="badge badge-${_c.toLowerCase()}">${_c.toUpperCase()}</span>`;
        return "";
      });
      // issue
      newValue = newValue.replace(
        /(#\d{1,4})(#issuecomment-\d{1,20})?/,
        function(match, capture, capture2) {
          const _c = capture.replace("#", "");
          const _c2 = capture2 ? capture2 : "";
          return `<a href="${issueUrl}${_c}${_c2}" target="_blank" rel="noopener noreferrer">${capture}</a>`;
        }
      );
      return newValue;
    },
    releaseLink(version) {
      return `https://github.com/joelthorner/TLmanaGer/releases/tag/${version}`;
    },
  },
};
</script>
