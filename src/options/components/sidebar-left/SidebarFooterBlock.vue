<template>
  <div class="footer-block">
    <div class="title">{{ title }}</div>
		<ul class="list-unstyled">
			<li v-for="(item, index) in items" v-bind:key="index">
				<a :href="item.route" target="_blank" rel="noopener noreferrer">
					<span class="icon" v-html="item.icon"></span>
					<span class="text">{{ item.title }}</span>
					<div class="rippleJS"></div>
				</a>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
	name: "SidebarFooterBlock",
	props: ['title', 'items']
};
</script>