<template>
  <div class="card card-user card-user-info card-user-info-avatar">
    <div class="card-header">
      <div class="card-title">Avatar</div>
    </div>
    <div class="card-body">
      <div class="avatar-card-img" title="Change avatar" v-b-tooltip.hover>
        <router-link to="/user/avatar">
          <img :src="chromeSync.profile.avatar.value" alt="User avatar" />
          <span class="icon hover" v-html="penIcon"></span>
          <div class="rippleJS"></div>
        </router-link>
      </div>

      <div class="avatar-name">
        <strong>{{ chromeSync.profile.avatar.name }}</strong>
        <p v-if="chromeSync.profile.avatar.description.length">
          {{ chromeSync.profile.avatar.description }}
        </p>
        <router-link to="/user/avatar" class="btn btn-primary">
          Change avatar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { pen as penIcon } from "@/data/icons";

export default {
  name: "CardInfoAvatar",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      penIcon,
    };
  },
};
</script>
