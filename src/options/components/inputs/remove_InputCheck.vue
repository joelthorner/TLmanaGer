<template>
  <div :class="containerClass" style="display: contents">
    <div :class="itemClass" v-for="option in options" :key="option.value">
      <label>
        <input
          type="checkbox"
          :value="option.value"
          :checked="option.value == value"
          @change="$emit('input', option.value)"
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputCheck",
  props: {
    containerClass: String,
    itemClass: {
      type: String,
      default: "form-group",
    },
    name: String,
    value: {
      required: true,
    },
    options: Array,
  },
};
</script>
