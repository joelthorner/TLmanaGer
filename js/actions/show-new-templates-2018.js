console.log('TLmanaGer Action: "show-new-templates-2018";');

$('body').append(`
	<style>
		[data-module] {
			border: 1px solid #aa00ff !important;
			position: relative;
		}
		[data-module]:after {
			position: absolute;
			top: 25%;
			left: 0;
			content: attr(data-module) !important;
			display: block !important;
			background-color: #aa00ff !important;
			color: #FFF !important;
			padding: 5px !important;
			z-index: 100000;
		}
	</style>
`);

