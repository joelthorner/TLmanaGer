<template>
  <aside class="aside-right">
    <sidebar-right-resume>
      <div class="title">VERSION</div>
      <div class="content">{{ version }}</div>
    </sidebar-right-resume>
  </aside>
</template>

<script>
import axios from "axios";

import SidebarRightResume from "./SidebarRightResume";

export default {
  name: "SidebarRight",
  data: () => {
    return {
      version: "1.0.0",
    };
  },
  components: {
    SidebarRightResume,
  },
  created() {
    this.listReleases();
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