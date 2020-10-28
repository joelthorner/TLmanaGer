<template>
  <div class="tab">
    <b-tabs
      pills
      vertical
      nav-class="avatar-nav"
      nav-wrapper-class="col-xs-3 col-xl-2"
      content-class="col-xs-9 col-xl-10"
    >
      <b-tab title="Animation" active>
        <div class="grid-avatars">
          <div
            class="avatar-item"
            v-for="(avatar, index) in avatars.animation"
            v-bind:key="index"
          >
            <img
              :src="avatar.img"
              :alt="getAlt(avatar)"
              v-on:click="selectAvatar(avatar)"
            />
          </div>
        </div>
      </b-tab>
      <b-tab title="Videogames">
        <div class="grid-avatars">
          <div
            class="avatar-item"
            v-for="(avatar, index) in avatars.videogames"
            v-bind:key="index"
          >
            <img
              :src="avatar.img"
              :alt="getAlt(avatar)"
              v-on:click="selectAvatar(avatar)"
            />
          </div>
        </div>
      </b-tab>
      <b-tab title="Movies">
        <div class="grid-avatars">
          <div
            class="avatar-item"
            v-for="(avatar, index) in avatars.movies"
            v-bind:key="index"
          >
            <img
              :src="avatar.img"
              :alt="getAlt(avatar)"
              v-on:click="selectAvatar(avatar)"
            />
          </div>
        </div>
      </b-tab>
      <b-tab title="Memes"
        ><div class="grid-avatars">
          <div
            class="avatar-item"
            v-for="(avatar, index) in avatars.memes"
            v-bind:key="index"
          >
            <img
              :src="avatar.img"
              :alt="getAlt(avatar)"
              v-on:click="selectAvatar(avatar)"
            />
          </div></div
      ></b-tab>
      <b-tab title="Other"
        ><div class="grid-avatars">
          <div
            class="avatar-item"
            v-for="(avatar, index) in avatars.other"
            v-bind:key="index"
          >
            <img
              :src="avatar.img"
              :alt="getAlt(avatar)"
              v-on:click="selectAvatar(avatar)"
            />
          </div></div
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import avatars from "@/data/avatars";

export default {
  name: "TabAvatar",
  data() {
    return {
      avatars,
    };
  },
  props: {
    chromeSync: Object,
  },
  methods: {
    reciveShowSavedOptions() {
      this.$emit("savedOptionsParent", true);
    },
    getAlt(avatar) {
      return (
        avatar.name +
        (avatar.description.length ? " - " + avatar.description.length : "")
      );
    },
    selectAvatar(avatar) {
      this.chromeSync.profile.avatar.actived = true;
      this.chromeSync.profile.avatar.value = avatar.img;

      this.reciveShowSavedOptions();
    },
  },
};
</script>