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
        <div class="col-3 col-left d-flex flex-column pr-3">
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
            <div class="title">Current selected</div>
            <div class="bg-item bg-item-selected-main">
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
        </div>

        <div class="col-9 col-right">asd</div>
      </div>
    </div>

    <help-modal :thisModalId="thisModalId" :data="help"></help-modal>
  </div>
</template>

<script>
import _ from "lodash";
import optionCard from "@options/mixins/optionCard";
import axios from "axios";

export default {
  name: "LCBackgroundCard",
  mixins: [optionCard],
  data() {
    return {
      endPoint: "https://api.unsplash.com",
			searchCriteria: "",
			defaultImages: [],
			images: [],
			accessKey: process.env.VUE_APP_UNSPLASH_ACCESS_KEY,//process.env.VUE_APP_UNSPLASH_ACCESS_KEY,
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
    };
  },
  mounted() {
		console.log(process.env.VUE_APP_UNSPLASH_ACCESS_KEY) // SOME_KEY_VALUE


    this.getRandomImages();
  },
  methods: {
    selectCollection(id) {
      // TODO
    },
    getRandomImages() {

			console.log(this.accessKey);
      // axios
      //   .get(`${this.endPoint}/photos/random?query=wallpaper&count=20&orientation=landscape&client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`)
      //   .then((response) => {
			// 		console.log(response);
			// 		// this.defaultImages = response
			// 	});
    },
  },
};
</script>