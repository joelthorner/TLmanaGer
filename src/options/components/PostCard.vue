<template>
  <div class="card" data-tilt data-tilt-reverse="true" data-tilt-max-glare="0.9" data-tilt-scale="1.05">
    <router-link :to="getPostRoute(post.id)" class="link-img">
      <img :src="post.img" class="card-img-top" :alt="post.name" />
      <div class="rippleJS"></div>
    </router-link>
    <div class="card-body">
      <router-link :to="getPostRoute(post.id)">
        <div class="card-title">{{ post.name }}</div>
        <div class="rippleJS"></div>
      </router-link>
      <p class="card-text">
        {{ getSplittedPostContent(post.content) }}
        <router-link v-if="hasReadMore(post.content)" :to="getPostRoute(post.id)">Read more</router-link>
      </p>
      <p class="card-text card-text-foot">
        <small class="text-muted">{{ getPostDate(post.date) }}</small>
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import VanillaTilt from "vanilla-tilt";

export default {
  name: "PostCard",
  props: {
    post: Object,
  },
  data() {
    return {
    };
  },
	mounted () {
		VanillaTilt.init(this.$el, {
			// max: 25,
			// speed: 400
		});
  },
  methods: {
    getPostRoute(id) {
      return "/post/" + id;
    },
    getPostDate(date) {
      let mdate = moment(date);
      return moment.duration(moment().diff(mdate)).humanize();
    },
    getPLainPostTextContent(content) {
      let span = document.createElement("span");
      span.innerHTML = content;
      let text = span.textContent || span.innerText;
      return text;
    },
    getSplittedPostContent(content) {
      let text = this.getPLainPostTextContent(content);
      if (text.length > 100) text = text.substring(0, 100).trim() + "...";
      return text;
    },
    hasReadMore(content) {
      const text = this.getPLainPostTextContent(content);
      return text.length > 100;
    },
  },
};
</script>