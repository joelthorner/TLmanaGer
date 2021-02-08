<template>
  <div class="menu">
    <ul class="list-unstyled">
      <li v-for="menuItem in menuItems" :key="menuItem.title">
        <router-link :to="menuItem.route" :exact="menuItem.exact">
          <span class="icon" v-html="menuItem.icon"></span>
          <span class="text">{{ menuItem.title }}</span>
          <div class="rippleJS"></div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  home as homeIcon,
  settings as settingsIcon,
  user as userIcon,
  achievements as achievementsIcon,
  changelog as changelogIcon,
  archive as archiveIcon,
} from "@/data/icons";

export default {
  name: "SidebarMenu",
  data: () => {
    return {
      menuItems: [
        {
          title: "Home",
          icon: homeIcon,
          route: "/",
          exact: true,
        },
        {
          title: "Options",
          icon: settingsIcon,
          route: "/options",
          exact: false,
        },
        {
          title: "User",
          icon: userIcon,
          route: "/user",
          exact: false,
        },
        {
          title: "Achievements",
          icon: achievementsIcon,
          route: "/achievements",
          exact: false,
        },
        {
          title: "Changelog",
          icon: changelogIcon,
          route: "/changelog",
          exact: false,
        },
        {
          title: "Blog",
          icon: archiveIcon,
          route: "/blog",
          exact: false,
        },
      ],
    };
  },
};
</script>