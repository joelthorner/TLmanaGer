chrome.storage.sync.get(['optLcBgActive', 'optLcBgValue'], function(result) {

	if (result.optLcBgActive && !$('#loginForm').length) {
		var style = `
			<style>
				body {
					background-color: #FFF;
					background-image: url('${result.optLcBgValue}');
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
					background-clip: border-box;
					background-origin: padding-box;
					background-attachment: fixed;
				}
				.lastposts{
					display:none !important;
				}
				#desktop .search img {
					filter: brightness(3);
				}
				#desktop .search input::placeholder {
					color: #FFF;
				}
				#desktop .search input, #desktop .shortcut {
					background-color: rgba(0, 0, 0, 0.5);
					border: 0;
					color: #FFF;
				}
				#desktop .shortcut:not(:hover) img {
					filter: brightness(2);
				}
				#desktop .shortcut div {
					text-transform: none;
					color: #fff;
				}
				#desktop .logo img {
					display: none;
				}
			</style>
		`;
		$('body').append(style);
	}
});