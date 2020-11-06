<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link to="/options/logicommerce" :class="customActiveNavItem">
        <span class="icon" v-html="shoppingCartIcon"></span>
        Logicommerce
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/options/fluid-tools" class="nav-link">
        <span class="icon" v-html="wrenchIcon"></span>
        Fluid tools
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/options/zendesk" class="nav-link">
        <span class="icon" v-html="zendeskIcon"></span>
        Zendesk
        <div class="rippleJS"></div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/options/others" class="nav-link">
        <span class="icon" v-html="lemonIcon"></span>
        Others
        <div class="rippleJS"></div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import {
  shoppingCart as shoppingCartIcon,
  wrench as wrenchIcon,
  zendesk as zendeskIcon,
  lemon as lemonIcon,
} from "@/data/icons";

export default {
  name: "OptionsNav",
  data() {
    return {
      shoppingCartIcon,
      wrenchIcon,
      zendeskIcon,
      lemonIcon,
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
