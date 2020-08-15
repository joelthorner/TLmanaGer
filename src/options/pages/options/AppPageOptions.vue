<template>
  <div class="page-content">
    <div id="options-content">
      <main-title title="OPTIONS"></main-title>
			
			<ul class="nav">
				<li class="nav-item">
					<router-link to="/options" class="nav-link">
						Logicommerce
						<div class="rippleJS"></div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/options/fluid-tools" class="nav-link">
						Fluid tools
						<div class="rippleJS"></div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/options/zendesk" class="nav-link">
						Zendesk
						<div class="rippleJS"></div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/options/others" class="nav-link">
						Others
						<div class="rippleJS"></div>
					</router-link>
				</li>
			</ul>

      <main-content containerClass="options-container">
        <router-view></router-view>
      </main-content>
    </div>
  </div>
</template>

<script>
import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";

export default {
  name: "AppPageOptions",
  props: {
    chromeData: Object,
  },
  components: {
    MainTitle,
    MainContent,
  },
  methods: {
    // greet: function (event) {
    //   this.chromeData.logicommerce.background.thumb =
    //     "https://vuejs.org/images/logo.png";
    // },
  },
};
</script>