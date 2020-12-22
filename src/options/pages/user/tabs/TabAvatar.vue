<template>
  <div class="tab">
    <div class="row">
      <avatar-nav @setFilterParent="setFilter"></avatar-nav>

      <div class="col-xs-9 col-xl-10">
        <transition-group class="grid-avatars dynamic-grid" name="dynamic-grid">
          <div
            class="dynamic-grid-item"
            v-for="avatar in activeAvatars"
            v-bind:key="avatar.name"
          >
            <a
              href="#"
              v-on:click.prevent="selectAvatar(avatar)"
              v-bind:class="{
                active: currentAvatar === avatar.img,
                'avatar-item': true,
              }"
            >
              <img :src="avatar.img" :alt="getAvatarName(avatar)" />
              <div class="rippleJS"></div>
            </a>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import avatars from "@/data/avatars";
import AvatarNav from "@options/pages/user/AvatarNav";

const ALL_AVATARS = "all";

export default {
  name: "TabAvatar",
  components: {
    AvatarNav,
  },
  data() {
    return {
      avatars,
      currentFilter: ALL_AVATARS,
    };
  },
  props: {
    chromeSync: Object,
  },
  computed: {
    activeAvatars() {
      if (this.currentFilter === ALL_AVATARS) {
        let allAvatars = [];
        Object.keys(this.avatars).forEach((key) => {
          allAvatars = [...allAvatars, ...this.avatars[key]];
        });
        return this.shuffle(allAvatars);
      } else {
        return this.shuffle(this.avatars[this.currentFilter]);
      }
    },
    currentAvatar() {
      return this.chromeSync.profile.avatar.value;
    },
  },
  methods: {
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    reciveShowSavedOptions() {
      this.$emit("savedOptionsParent", true);
    },
    getAvatarName(avatar) {
      return (
        avatar.name +
        (avatar.description.length ? " - " + avatar.description : "")
      );
    },
    selectAvatar(avatar) {
      this.chromeSync.profile.avatar.actived = true;
      this.chromeSync.profile.avatar.value = avatar.img;
      this.chromeSync.profile.avatar.name = avatar.name;
      this.chromeSync.profile.avatar.description = avatar.description;

      this.reciveShowSavedOptions();
    },
    setFilter(value) {
      this.currentFilter = value;
    },
  },
};
</script>