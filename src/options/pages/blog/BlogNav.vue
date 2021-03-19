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
    <li class="nav-item" v-for="tag in tags" v-bind:key="tag.value">
      <a
        class="nav-link"
        v-bind:class="{ active: currentFilter === tag.value }"
        href="#"
        v-on:click.prevent="sendFilter(tag.value)"
      >
        {{ tag.text }}
        <div class="rippleJS"></div>
      </a>
    </li>
  </ul>
</template>

<script>
import posts from "@/data/posts";

const ALL_POSTS = "all";

export default {
  name: "BlogNav",
  data: () => {
    return {
      posts,
      currentFilter: ALL_POSTS,
    };
  },
  methods: {
    sendFilter(value) {
      this.currentFilter = value;
      this.$emit("setFilterParent", value);
    },
  },
  computed: {
    tags() {
      let tags = [];
      this.posts.map(function (obj) {
        for (var i = 0; i < obj.tags.length; i++) {
          tags.push({
            text: obj.tags[i].charAt(0).toUpperCase() + obj.tags[i].slice(1),
            value: obj.tags[i],
          });
        }
      });

      return tags.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return (
          index ===
          tags.findIndex((obj) => {
            return JSON.stringify(obj) === _thing;
          })
        );
      });
    },
  },
};
</script>
