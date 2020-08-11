<template>
  <div>AppPageChangelog</div>
</template>

<script>
import { achievements } from "./../../../data.js";
import watchArchievements from "../../../mixins/watchArchievements.js";

export default {
  name: "AppPageChangelog",
  props: {
    chromeData: Object,
  },
  created() {
    setTimeout(() => this.lookChangelog50Times(), 1000);
  },
  mixins: [watchArchievements],
  data() {
    return {
      achievementsData: achievements,
    };
  },
  methods: {
    listReleases() {
      return axios
        .get(`https://api.github.com/repos/joelthorner/TLmanaGer/releases`)

        .then((response) => {
          console.log(response.data[0]);
          this.version = response.data[0].tag_name;
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>