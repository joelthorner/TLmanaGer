<template>
  <div :class="classList" data-tilt data-tilt-reverse="true" data-tilt-max="10">
    <a href="#" v-on:click.prevent="openCard">
      <img
        src="https://via.placeholder.com/600x250"
        class="card-img-top"
        alt="..."
      />
    </a>

    <div class="card-body">
      <a href="#" v-on:click.prevent="openCard">
        <div class="card-title">{{ optionKey }}</div>
      </a>

      <p class="card-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
        cupiditate quae voluptatem, quaerat molestias aperiam pariatur aliquid,
        quis corporis reiciendis quo placeat tempore ducimus recusandae
        excepturi sit praesentium quod. A.
      </p>

      MOSTRAR check active / desactive
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "OptionCard",
  props: {
    option: Object,
    optionKey: String,
  },
  data() {
    return {
      opened: false,
    };
  },
  mounted() {
    VanillaTilt.init(this.$el);
  },
  computed: {
    classList() {
      return [
        "card",
        "card-option",
        "option-" + this.optionKey,
        this.opened ? "opened" : "",
      ].join(" ");
    },
  },
  methods: {
    openCard(event) {
      // console.log(event.target.closest('.dynamic-grid-item'));
      this.opened = true;
    },
  },
};
</script>