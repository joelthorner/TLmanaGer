<template>
  <div class="page-content">
    <div id="changelog-content">
      <main-title title="Changelog"></main-title>

      <main-content containerClass="changelog-container">
        <div class="inner-text">Release notes for TLmanaGer</div>

        <div id="release-notes">
          <section
            class="release-block card"
            v-for="release in releases"
            :key="release.id"
          >
            <div class="card-body">
              <a
                class="header"
                :href="releaseLink(release.tag_name)"
                target="_blank"
              >
                <div class="d-flex">
                  <div class="icon" v-html="icon"></div>
                  <span class="version">{{
                    getTagName(release.tag_name)
                  }}</span>
                </div>
                <div class="date">
                  <small class="text-muted">{{
                    getReleaseDate(release.created_at)
                  }}</small>
                </div>
              </a>

              <ul class="list-unstyled">
                <li
                  v-for="(line, index) in getReleaseLines(release.body)"
                  :key="index"
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
import { changelog as changelogIcon } from "@/data/icons";
import watchAchievements from "@mixins/watchAchievements";

import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";

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
      icon: changelogIcon,
      firedApiGithub: false,
    };
  },
  methods: {
    getReleases() {
      if (!this.firedApiGithub) {
        api({
          url: `https://api.github.com/repos/joelthorner/TLmanaGer/releases`,
          method: "get",
        }).then(async (response) => {
          // console.log(response.data);
          this.releases = response.data;
          this.firedApiGithub = true;
        });
      }
    },
    getReleaseLines(content) {
      return content.split("\n").sort(function compare(a, b) {
        if (
          a.match(/NEW/) ||
          (a.match(/FIXED/) && b.match(/IMPROVED/)) ||
          (a.match(/FIXED/) && b.match(/CHANGED/)) ||
          (a.match(/FIXED/) && b.match(/REMOVED/)) ||
          (a.match(/IMPROVED/) && b.match(/CHANGED/)) ||
          (a.match(/IMPROVED/) && b.match(/REMOVED/)) ||
          (a.match(/CHANGED/) && b.match(/REMOVED/))
        )
          return -1;

        if (
          b.match(/NEW/) ||
          (a.match(/IMPROVED/) && b.match(/FIXED/)) ||
          (a.match(/CHANGED/) && b.match(/FIXED/)) ||
          (a.match(/CHANGED/) && b.match(/IMPROVED/)) ||
          (a.match(/REMOVED/) && b.match(/FIXED/)) ||
          (a.match(/REMOVED/) && b.match(/IMPROVED/)) ||
          (a.match(/REMOVED/) && b.match(/CHANGED/))
        )
          return 1;
      });
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
      newValue = newValue.replace(
        /(\*\*[A-Z]{2,}\*\*)/,
        function (match, capture) {
          const _c = capture.replace(/\*/g, "");
          return `<span class="badge badge-${_c.toLowerCase()}">${_c.toUpperCase()}</span>`;
        }
      );
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
    releaseLink(version) {
      return `https://github.com/joelthorner/TLmanaGer/releases/tag/${version}`;
    },
  },
};
</script>