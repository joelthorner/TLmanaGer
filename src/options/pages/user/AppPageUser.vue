<template>
  <div class="page-content">
    <div id="user-content">
      <user-background :chromeSync="chromeSync"></user-background>
      <user-nav :chromeSync="chromeSync"></user-nav>
    </div>
  </div>
</template>

<script>
import UserBackground from "@options/pages/user/UserBackground";
import UserNav from "@options/pages/user/UserNav";

export default {
  name: "AppPageUser",
  components: {
    UserBackground,
    UserNav,
  },
  props: {
    chromeSync: Object,
  },
};
</script>
