<template>
  <!-- <ul>
    <li v-for="(item, index) in menu" :key="index">{{ item.text }}</li>
  </ul>-->

  <aside class="aside-left">
		<app-logo></app-logo>

    <b-nav vertical>
      <b-nav-item active>Active</b-nav-item>
      <b-nav-item>Link</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
  </aside>

  <!-- <div class="slider" ref="slider">
    <div class="slider__controls">
      <a
        @click="moveSlider(n)"
        href="#"
        v-for="n in slides.length"
        :key="n"
        class="slider__controls__link"
        >{{ n }}</a
      >
    </div>
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :style="`background-image:url(${slide.image})`"
      class="slider__content"
    >
    {{ slide.text }}
    </div>
  </div>-->
</template>

<script>
import AppLogo from "./AppLogo.vue";

export default {
  name: "AppSiderbar",
  // mounted() {
  //   this.slider = this.$refs.slider;
  //   this.height = this.slider.offsetHeight;
  // },
  // props: {
  //   slides: {
  //     type: Array,
  //     required: true,
  //   }
  // },
  data() {
    return {
      menu: [
        {
          icon: "",
          text: "Home",
        },
      ],
    };
	},
	components: {
		AppLogo
	}
  // methods: {
  //   moveSlider(n) {
  //     //n = n === 1 ? 0 : n;
  //     n = n-1;
  //     this.slider.scrollTo({
  //       top: this.height * n,
  //       behavior: 'smooth'
  //     })
  //   }
  // }
};
</script>

<style lang="scss" scoped>

</style>