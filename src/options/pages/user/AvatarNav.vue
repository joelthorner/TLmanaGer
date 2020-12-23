<template>
  <div class="col-xs-3 col-xl-2">
    <ul class="nav flex-column nav-pills avatar-nav">
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
      <li
        class="nav-item"
        v-for="avatarCat in avatarCats"
        v-bind:key="avatarCat"
      >
        <a
          class="nav-link"
          v-bind:class="{ active: currentFilter === avatarCat }"
          href="#"
          v-on:click.prevent="sendFilter(avatarCat)"
        >
          {{ avatarCat | capitalize }}
          <div class="rippleJS"></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import avatars from "@/data/avatars";

const ALL_AVATARS = "all";

export default {
  name: "AvatarNav",
  data: () => {
    return {
      avatars,
      currentFilter: ALL_AVATARS,
    };
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    sendFilter(value) {
      this.currentFilter = value;
      this.$emit("setFilterParent", value);
    },
  },
  computed: {
    avatarCats() {
      return Object.keys(this.avatars);
    },
  },
};
</script>
