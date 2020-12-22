<template>
  <ul class="nav nav-menu-user">
    <li class="nav-item nav-item-avatar">
      <router-link to="/user/avatar" title="Change avatar">
        <img
          :src="chromeSync.profile.avatar.value"
          alt="User avatar"
          v-b-tooltip.hover
        />
        <span class="icon hover" v-html="penIcon"></span>
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user/info" :class="customActiveNavItem">
        <span class="icon" v-html="penIcon"></span>
        Personal Info
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user/stats" class="nav-link">
        <span class="icon" v-html="chartIcon"></span>
        Stats
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user/reset" class="nav-link">
        <span class="icon" v-html="toiletPaperIcon"></span>
        Reset data
        <div class="rippleJS"></div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import {
  pen as penIcon,
  chart as chartIcon,
  toiletPaper as toiletPaperIcon,
} from "@/data/icons";

export default {
  name: "UserNav",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      penIcon,
      chartIcon,
      toiletPaperIcon,
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
