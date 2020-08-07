<template>
  <div class="contributors">
		<div class="title">CONTRIBUTORS</div>
		<ul class="list-unstyled">
			<li v-for="(contributor, index) in contributors" v-bind:key="index">
				<a :href="contributor.route" target="_blank" rel="noopener noreferrer" :title="linkTitle(contributor.name)">
					<img :src="contributor.img" :alt="contributor.name">
					<div class="content">
						<span class="name">{{ contributor.name }}</span>
						<span class="role">{{ contributor.role }}</span>
					</div>
					<div class="rippleJS"></div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	name: "SidebarRightContributors",
	data: () => {
    return {
			contributors: [
				{
					name: 'joelthorner',
					route: 'https://github.com/joelthorner',
					img: 'https://avatars2.githubusercontent.com/u/16495000?s=120&v=4',
					role: 'owner'
				},
				{
					name: 'pol-93',
					route: 'https://github.com/pol-93',
					img: 'https://avatars2.githubusercontent.com/u/16819509?s=120&v=4',
					role: 'contributor'
				},
				{
					name: 'Unoriginal02',
					route: 'https://github.com/Unoriginal02',
					img: 'https://avatars0.githubusercontent.com/u/11269504?s=120&v=4',
					role: 'beta tester'
				},
			],
    };
	},
	methods: {
		linkTitle(name) {
			return `View ${name}'s profile`
		}
	},
};
</script>