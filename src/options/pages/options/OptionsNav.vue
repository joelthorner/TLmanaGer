<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link to="/options/logicommerce" :class="customActiveNavItem">
        <span class="icon" v-html="icons.shoppingCart"></span>
        Logicommerce
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/options/fluid-tools" class="nav-link">
        <span class="icon" v-html="icons.wrench"></span>
        Fluid tools
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/options/zendesk" class="nav-link">
        <span class="icon" v-html="icons.zendesk"></span>
        Zendesk
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/options/others" class="nav-link">
        <span class="icon" v-html="icons.lemon"></span>
        Others
        <div class="rippleJS"></div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import icons from "@/data/icons";

export default {
  name: "OptionsNav",
  data() {
    return {
      icons,
    };
  },
  computed: {
    customActiveNavItem() {
      return this.$route.path === "/options"
        ? "nav-link router-link-active-custom"
        : "nav-link";
    },
  },
};
</script>
