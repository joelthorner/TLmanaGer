<template>
  <div :class="'content-block ' + containerClass">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "MainContent",
	props: {
		containerClass: String
	}
};
</script>