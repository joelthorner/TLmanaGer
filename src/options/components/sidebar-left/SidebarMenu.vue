<template>
  <div class="menu">
    <ul class="list-unstyled">
      <li v-for="menuItem in menuItems" :key="menuItem.title">
      	<router-link :to="menuItem.route">
					<span class="icon" v-html="menuItem.icon"></span>
					<span class="text">{{ menuItem.title }}</span>
				</router-link>
			</li>
    </ul>
  </div>
</template>

<script>
import { icons } from './../../../data.js'

export default {
  name: "SidebarMenu",
  data: () => {
    return {
      menuItems: [
				{
					title: 'Home',
					icon: icons.home,
					route: '/'
				},
				{
					title: 'Settings',
					icon: icons.settings,
					route: '/settings'
				},
				{
					title: 'Achievements',
					icon: icons.achievements,
					route: '/achievements'
				},
				{
					title: 'User',
					icon: icons.user,
					route: '/user'
				},
				{
					title: 'Changelog',
					icon: icons.changelog,
					route: '/changelog'
				},
				{
					title: 'Blog',
					icon: icons.archive,
					route: '/blog'
				}
			]
    };
  },
};
</script>