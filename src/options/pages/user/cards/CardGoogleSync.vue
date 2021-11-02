<template>
  <div v-bind:class="[cardClass, activedClass]">
    <div class="card-body">
      <svg
        class="icon-google"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 533.5 544.3"
      >
        <path
          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
          fill="#fff"
        />
        <path
          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
          fill="#fff"
        />
        <path
          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
          fill="#fff"
        />
        <path
          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
          fill="#fff"
        />
      </svg>

      <div
        class="caption d-flex flex-column align-items-start justify-content-center"
      >
        <div class="card-title text-white">{{ title }}</div>
        <button
          v-if="!this.actived"
          type="button"
          v-on:click="openSyncSetup"
          v-bind:class="[btnClass, btnActivedClass]"
        >
          Open Chrome configuration
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGoogleSync",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      cardClass: "card card-user card-user-info card-user-info-google-sync",
      btnClass: "btn btn-light",
    };
  },
  computed: {
    actived() {
      return this.chromeSync.metrics.googleAccountSync;
    },
    title() {
      return this.actived
        ? "La sincronització de Google està activa."
        : "Activa la sincronització de Google per guardar les dades per sempre.";
    },
    btnActivedClass() {
      return this.actived ? "" : "text-danger";
    },
    activedClass() {
      return this.actived ? "" : "bg-danger";
    },
  },
  methods: {
    openSyncSetup() {
      chrome.tabs.create({
        url: "chrome://settings/syncSetup",
      });
    },
  },
};
</script>
