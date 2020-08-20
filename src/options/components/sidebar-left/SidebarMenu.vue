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
import icons from "@/data/icons";

export default {
  name: "SidebarMenu",
  data: () => {
    return {
      menuItems: [
        {
          title: "Home",
          icon: icons.home,
					route: "/",
					exact: true,
        },
        {
          title: "Options",
          icon: icons.settings,
					route: "/options",
					exact: false,
        },
        {
          title: "Achievements",
          icon: icons.achievements,
					route: "/achievements",
					exact: false,
        },
        {
          title: "User",
          icon: icons.user,
					route: "/user",
					exact: false,
        },
        {
          title: "Changelog",
          icon: icons.changelog,
					route: "/changelog",
					exact: false,
        },
        {
          title: "Blog",
          icon: icons.archive,
					route: "/blog",
					exact: false,
        },
      ],
    };
  },
};
</script>