<template>
  <ul class="nav nav-menu">
    <li class="nav-item nav-item-avatar">
      <router-link to="/user/avatar">
        <img
          :src="chromeSync.profile.avatar.value"
          alt="User avatar"
          v-b-tooltip.hover
          title="Change avatar"
        />
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user/info" :class="customActiveNavItem">
        <!-- <span class="icon" v-html="icons.shoppingCart"></span> -->
        Personal Info
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user/stats" class="nav-link">
        Stats
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user/reset" class="nav-link">
        Reset data
        <div class="rippleJS"></div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import icons from "@/data/icons";

export default {
  name: "UserNav",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      icons,
    };
  },
  computed: {
    customActiveNavItem() {
      return this.$route.path === "/user"
        ? "nav-link router-link-active-custom"
        : "nav-link";
    },
  },
};
</script>
