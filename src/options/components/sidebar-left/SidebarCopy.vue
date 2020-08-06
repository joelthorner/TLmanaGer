<template>
  <div class="copy-container">
		<a href="https://github.com/joelthorner/TLmanaGer/blob/master/PRIVACY_POLICY.md#pol%C3%ADtica-de-privacidad" target="_blank" rel="noopener noreferrer">
			Privacy Policy
			<div class="rippleJS"></div>
		</a>

		<div class="copy-text">© TLmanaGer {{ thisYear }}</div>
	</div>
</template>

<script>
export default {
	name: "SidebarCopy",
	computed: {
		thisYear: () => {
			return new Date().getFullYear()
		}
	},
};
</script>