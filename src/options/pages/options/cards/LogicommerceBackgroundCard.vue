<template>
  <div
    class="card card-option card-option-lc-bg"
    v-bind:class="{ active: chromeSync[scope][itemKey].actived }"
  >
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button v-b-modal="thisModalId" variant="link" v-html="iconInfo"></b-button>
      </div>
      <b-form-checkbox
        v-model="chromeSync[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="debouncedOptionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>

    <div class="card-body">
      <div class="row no-gutters">
        <div class="col-left d-flex flex-column pr-3">
          <b-form-input v-model="searchCriteria" placeholder="Enter your search"></b-form-input>

          <div class="block collections-block">
            <div class="title">Collections</div>
            <ul class="list-unstyled">
              <li v-for="collection in collections" v-bind:key="collection.id">
                <a
                  href="#"
                  v-on:click.prevent="selectCollection(collection.id)"
                >{{ collection.name }}</a>
              </li>
            </ul>
          </div>

          <div class="block selected-bg-block">
            <div class="title">
              Current selected
              <a href="#" v-if="showBackImage" v-on:click.prevent="undo">Undo</a>
            </div>
            <div class="bg-item bg-item-selected-main">
              <div
                class="embed-responsive embed-responsive-16by9"
                v-bind:style="{ backgroundImage: 'url(' + chromeSync.logicommerce.background.thumb + ')'}"
              >
                <div class="rippleJS"></div>
              </div>
              <a
                :href="chromeSync.logicommerce.background.userLink"
                target="_blank"
                rel="noopener noreferrer"
                class="author"
              >{{ chromeSync.logicommerce.background.userName }}</a>
            </div>
          </div>
        </div>

        <div class="col-right">
          <div class="grid-background-items">
            <div class="bg-item" v-for="(image, index) in selectableImages" v-bind:key="index">
              <a
                href="#"
                class="embed-responsive embed-responsive-16by9"
                v-bind:style="{ backgroundImage: 'url(' + image.urls.small + ')'}"
                v-on:click.prevent="initSelectBackground(image)"
              >
                <div class="rippleJS"></div>
              </a>
              <a
                :href="image.user.links.html"
                target="_blank"
                rel="noopener noreferrer"
                class="author"
              >{{ image.user.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <help-modal :thisModalId="thisModalId" :data="help"></help-modal>
  </div>
</template>

<script>
import _ from "lodash";
import optionCard from "@options/mixins/optionCard";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

export default {
  name: "LogicommerceBackgroundCard",
  mixins: [optionCard],
  data() {
    return {
      endPoint: "https://api.unsplash.com",
      searchCriteria: "",
      defaultImages: [],
      images: [],
      collections: [
        {
          id: 223661,
          name: "Joel Favs",
        },
        {
          id: 4297675,
          name: "Cyber neon",
        },
        {
          id: 4297713,
          name: "Landscape",
        },
      ],
      backImage: {},
      showBackImage: false,
    };
  },
  created: function () {
    this.debouncedSelectBackground = _.debounce(this.selectBackground, 1000);
  },
  mounted() {
    this.getRandomImages();
    setTimeout(() => {
      this.backImage = this.chromeSync.logicommerce.background;
    }, 1000);
  },
  computed: {
    selectableImages() {
      return this.images.length ? this.images : this.defaultImages;
    },
  },
  methods: {
    initSelectBackground(image) {
      let data = {
        image: image.urls.full,
        thumb: image.urls.small,
        userName: image.user.name,
        userLink: image.user.links.html,
        downloadLocation: `${image.links.download_location}?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`,
      };
      this.chromeSync.logicommerce.background = {
        ...this.chromeSync.logicommerce.background,
        ...data,
      };
      this.showBackImage = true;
      this.debouncedSelectBackground(image);
    },
    selectBackground(image) {
      this.$emit("savedOptions", true);
    },
    selectCollection(id) {
      api({
        url: `${this.endPoint}/collections/${id}/photos?id=${id}&page=1&per_page=20&client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`,
        method: "get",
      }).then(async (response) => {
        try {
          this.images = response.data;
        } catch (error) {
          console.log(error);
        }
      });
    },
    getRandomImages() {
      axios
        .get(
          `${this.endPoint}/photos/random?query=wallpaper&count=20&orientation=landscape&client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`
        )
        .then((response) => {
          try {
            this.defaultImages = response.data;
          } catch (error) {
            console.log(error);
          }
        });
    },
    undo() {
      this.chromeSync.logicommerce.background = this.backImage;
      this.backImage = {};
      this.showBackImage = false;
      this.debouncedSelectBackground();
    },
  },
};
</script>