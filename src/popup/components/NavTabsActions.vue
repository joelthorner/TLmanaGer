<template>
  <div class="nav-tabs-actions">
    <b-tabs fill>
      <b-tab
        v-for="(element, index) in elements"
        :key="element.key"
        :active="index === 0"
      >
        <template #title>
          {{ element.name }}
          <div class="rippleJS"></div>
        </template>
        <div class="grid">{{ element.name }}</div></b-tab
      >
    </b-tabs>
  </div>
</template>

<script>
// import { settings as settingsIcon } from "@/data/icons";

export default {
  name: "NavTabsActions",
  data() {
    return {
      elements: [
        {
          name: "Utils",
          key: "utils",
          items: [{}],
        },
        {
          name: "Testing",
          key: "testing",
          items: [{}],
        },
        {
          name: "Hacks",
          key: "hacks",
          items: [{}],
        },
      ],
    };
  },
};
</script>
