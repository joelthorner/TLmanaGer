<template>
  <div class="white-block contributors">
    <div class="title">CONTRIBUTORS</div>
    <ul class="list-unstyled">
      <li v-for="(contributor, index) in contributors" v-bind:key="index">
        <a
          :href="contributor.route"
          target="_blank"
          rel="noopener noreferrer"
          :title="linkTitle(contributor.name)"
        >
          <img :src="contributor.img" :alt="contributor.name" />
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
  name: "SidebarRightBlock",
  data: () => {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>