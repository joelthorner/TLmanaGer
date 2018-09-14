chrome.storage.sync.get(['optLcBgActive', 'optLcBgValue'], function(result) {

	if (typeof result.optLcBgActive == 'undefined') result.optLcBgActive = true;
	if (typeof result.optLcBgValue == 'undefined') result.optLcBgValue = chrome.extension.getURL('img/background-default.jpg');

	if (result.optLcBgActive && !$('#loginForm').length) {
		$('html').addClass('dev-background-bar');
		var style = `
			<style>
				html.dev-background-bar body {
					background-color: #FFF;
					background-image: url('${result.optLcBgValue}');
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
					background-clip: border-box;
					background-origin: padding-box;
					background-attachment: fixed;
				}
				html.dev-background-bar .lastposts{
					display:none !important;
				}
				html.dev-background-bar #desktop .search img {
					filter: brightness(3);
				}
				html.dev-background-bar #desktop .search input::placeholder {
					color: #FFF;
				}
				html.dev-background-bar #desktop .search input, #desktop .shortcut {
					background-color: rgba(0, 0, 0, 0.5);
					border: 0;
					color: #FFF;
				}
				html.dev-background-bar #desktop .shortcut:not(:hover) img {
					filter: brightness(2);
				}
				html.dev-background-bar #desktop .shortcut div {
					text-transform: none;
					color: #fff;
				}
				html.dev-background-bar #desktop .logo img {
					display: none;
				}
			</style>
		`;
		$('body').append(style);
	}
});