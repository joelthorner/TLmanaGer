<template>
  <div class="debug">
		
		<button class="btn btn-secondary" v-on:click="reset">clear storage</button>

	</div>
</template>

<script>

export default {
  name: "AppDebug",
  props: {
    chromeData: Object,
  },
  created() {
    
  },
  data() {
    return {
     
    };
  },
  methods: {
    reset: function() {
      chrome.storage.sync.clear(function() {
				var error = chrome.runtime.lastError;
				if (error) {
						console.error(error);
				}
				console.log('reset');
			});
    },
  },
};
</script>