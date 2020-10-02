<template>
  <div
    class="card card-option card-option-lc-bg"
    v-bind:class="{ active: chromeSync[scope][itemKey].actived }"
  >
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button variant="link" v-html="iconInfo" @click="openModalClick(itemKey)"></b-button>
      </div>
      <b-form-checkbox
        v-model="chromeSync[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="optionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>

    <div class="card-body" :title="disabledOptionMessage">
      <div class="row no-gutters">
        <div class="col-left d-flex flex-column pr-lg-3 mb-3 mb-lg-0">
          <b-form-input
            v-model="searchCriteria"
            placeholder="Enter your search"
            v-on:input="debouncedInputSearch"
            type="search"
            :state="isValidSearch"
            aria-describedby="input-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-live-feedback">No results</b-form-invalid-feedback>

          <div class="block collections-block">
            <div class="title">Collections</div>
            <ul class="list-unstyled">
              <li v-for="collection in collections" v-bind:key="collection.id">
                <a
                  href="#"
                  v-on:click.prevent="clickCollection(collection.id)"
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
              <a
                class="zoom-btn"
                href="#"
                v-b-modal.bgCardZoom
                v-on:click.prevent="setZoomData(chromeSync.logicommerce.background.regular, chromeSync.logicommerce.background.userName)"
                v-html="icons.zoom"
              ></a>
              <div
                class="embed-responsive embed-responsive-16by9"
                v-bind:style="{ backgroundImage: 'url(' + chromeSync.logicommerce.background.thumb + ')'}"
              ></div>
              <a
                :href="chromeSync.logicommerce.background.userLink"
                target="_blank"
                rel="noopener noreferrer"
                class="author"
              >{{ chromeSync.logicommerce.background.userName }}</a>
            </div>
          </div>

          <div class="pagination-space-equalizer page-link" v-if="showPagination">&nbsp;</div>
        </div>

        <div class="col-right">
          <div class="grid-background-items">
            <div
              class="bg-item"
              v-for="(image, index) in selectableImages"
              v-bind:key="index + '-finded'"
            >
              <a
                class="zoom-btn"
                href="#"
                v-b-modal.bgCardZoom
                v-on:click.prevent="setZoomData(image.urls.regular, image.user.name)"
                v-html="icons.zoom"
              ></a>
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

            <div
              class="bg-item empty"
              v-for="(item, index) in emptyItems"
              v-bind:key="index + '-empty'"
            >
              <div class="embed-responsive embed-responsive-16by9"></div>
            </div>
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            v-on:input="changePage"
            v-if="showPagination"
          >
            <template v-slot:first-text>
              <span class="icon" v-html="icons.caretDoubleLeft"></span>
            </template>
            <template v-slot:prev-text>
              <span class="icon" v-html="icons.caretLeft"></span>
            </template>
            <template v-slot:next-text>
              <span class="icon" v-html="icons.caretRight"></span>
            </template>
            <template v-slot:last-text>
              <span class="icon" v-html="icons.caretDoubleRight"></span>
            </template>
          </b-pagination>
        </div>
      </div>
    </div>

    <full-image-modal thisModalId="bgCardZoom" :sourceUrl="imageZoom" :title="imageZoomAuthor"></full-image-modal>
  </div>
</template>

<script>
import _ from "lodash";
import optionCard from "@mixins/optionCard";
import FullImageModal from "@options/components/FullImageModal";
import axios from "axios";
import icons from "@/data/icons";

const MODE_COLLECTION = "collection";
const MODE_SEARCH = "search";

export default {
  name: "LogicommerceBackgroundCard",
  mixins: [optionCard],
  components: {
    FullImageModal,
  },
  data() {
    return {
      icons,
      endPoint: "https://api.unsplash.com",
      searchCriteria: "",
      randomImages: [],
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
        {
          id: 1131562,
          name: "Insert Coin(s)",
        },
        {
          id: 3694365,
          name: "Gradient Nation",
        },
        {
          id: 1103088,
          name: "One Color",
        },
      ],
      backImage: {},
      showBackImage: false,

      perPage: 20,
      currentPage: 1,
      totalRows: 0,

      clientId: process.env.VUE_APP_UNSPLASH_ACCESS_KEY,
      mode: null,
      selectedCollection: 0,
      imageZoom: "",
      imageZoomAuthor: "",
    };
  },
  created: function () {
    this.debouncedInputSearch = _.debounce(this.inputSearch, 500);
  },
  mounted() {
    this.ajaxRandoms();
    setTimeout(() => {
      this.backImage = this.chromeSync.logicommerce.background;
    }, 1000);
  },
  computed: {
    emptyItems() {
      let n = 20;
      if (this.images.length) n = n - this.images.length;
      else if (this.randomImages.length) n = n - this.randomImages.length;
      return Array(n);
    },
    selectableImages() {
      if (this.images.length) return this.images;
      else return this.randomImages;
    },
    cleanSearchCriteria() {
      return encodeURI(this.searchCriteria.trim());
    },
    showPagination() {
      return this.totalRows / this.perPage > 1;
    },
    isValidSearch() {
      if (this.mode !== MODE_SEARCH) return null;
      return this.cleanSearchCriteria.length > 0 && this.images.length > 0;
    },
  },
  methods: {
    changePage() {
      if (this.mode === MODE_COLLECTION) {
        this.ajaxCollection();
      } else if (this.mode === MODE_SEARCH) {
        this.ajaxSearch();
      }
    },
    inputSearch() {
      this.mode = MODE_SEARCH;
      this.currentPage = 1;
      this.totalRows = 0;
      this.ajaxSearch();
    },
    clickCollection(id) {
      this.mode = MODE_COLLECTION;
      this.currentPage = 1;
      this.totalRows = 0;

      this.selectedCollection = id;
      this.ajaxCollection();
    },
    ajaxSearch() {
      if (this.cleanSearchCriteria.length) {
        axios
          .get(
            `${this.endPoint}/search/photos?query=${this.cleanSearchCriteria}&page=${this.currentPage}&per_page=${this.perPage}&orientation=landscape&client_id=${this.clientId}`
          )
          .then((response) => {
            try {
              this.images = response.data.results;
              this.totalRows = response.data.total;
            } catch (error) {
              console.log(error);
            }
          });
      } else {
        this.mode = null;
      }
    },
    ajaxCollection() {
      axios
        .get(
          `${this.endPoint}/collections/${this.selectedCollection}/photos?id=${this.selectedCollection}&page=${this.currentPage}&per_page=${this.perPage}&client_id=${this.clientId}`
        )
        .then((response) => {
          try {
            this.images = response.data;
            this.totalRows = parseInt(response.headers["x-total"]);
          } catch (error) {
            console.log(error);
          }
        });
    },
    ajaxRandoms() {
      axios
        .get(
          `${this.endPoint}/photos/random?query=wallpaper&count=${this.perPage}&orientation=landscape&client_id=${this.clientId}`
        )
        .then((response) => {
          try {
            this.randomImages = response.data;
          } catch (error) {
            console.log(error);
          }
        });
    },
    initSelectBackground(image) {
      let data = {
        image: image.urls.full,
        thumb: image.urls.small,
        regular: image.urls.regular,
        userName: image.user.name,
        userLink: image.user.links.html,
        downloadLocation: image.links.download_location,
      };
      this.chromeSync.logicommerce.background = {
        ...this.chromeSync.logicommerce.background,
        ...data,
      };
      this.showBackImage = true;
      this.selectBackground(image);
    },
    selectBackground(image) {
      this.$emit("savedOptions", true);
    },
    undo() {
      this.chromeSync.logicommerce.background = this.backImage;
      this.backImage = {};
      this.showBackImage = false;
      this.selectBackground();
    },
    setZoomData(image, author) {
      this.imageZoom = image;
      this.imageZoomAuthor = 'By ' + author;
    },
  },
};
</script>