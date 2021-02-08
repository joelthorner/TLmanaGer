<template>
  <ul class="nav">
    <li class="nav-item">
      <a
        class="nav-link"
        v-bind:class="{ active: currentFilter === 'all' }"
        href="#"
        v-on:click.prevent="sendFilter('all')"
        >All
        <div class="rippleJS"></div
      ></a>
    </li>
    <li class="nav-item" v-for="cat in categories" v-bind:key="cat.value">
      <a
        class="nav-link"
        v-bind:class="{ active: currentFilter === cat.value }"
        href="#"
        v-on:click.prevent="sendFilter(cat.value)"
      >
        {{ cat.text }}
        <div class="rippleJS"></div>
      </a>
    </li>
  </ul>
</template>

<script>
const ALL_CATEGORIES = "all";

// import {
//   shoppingCart as shoppingCartIcon,
//   wrench as wrenchIcon,
//   zendesk as zendeskIcon,
//   lemon as lemonIcon,
// } from "@/data/icons";

export default {
  name: "OptionsNav",
  props: {
    categories: Array,
  },
  methods: {
    sendFilter(value) {
      this.currentFilter = value;
      this.$emit("setFilterParent", value);
    },
  },
  data() {
    return {
      currentFilter: ALL_CATEGORIES,
      // shoppingCartIcon,
      // wrenchIcon,
      // zendeskIcon,
      // lemonIcon,
    };
  },
  computed: {},
};
</script>
