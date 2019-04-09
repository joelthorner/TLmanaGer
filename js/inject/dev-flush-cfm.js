chrome.storage.sync.get({ optDevFlushCfm: defaults.optDevFlushCfm }, function(result) {
	
	var bseUrl = window.location.origin;

	if (result.optDevFlushCfm && bseUrl.match(/[0-9]{2,6}\.igd\.production/g)) {

		$('body').append(`
			<style class="tlg-flush-shrtcut-style">
				.tlg-flush-shrtcut {
					position: fixed !important;
					z-index: 999999999 !important;
					top: 0;
					left: 0;
					width: 116px !important;
					height: 34px !important;
					overflow: hidden;
					opacity: 0;
				}
				.tlg-flush-shrtcut.init {
					opacity: 1;
				}
				.tlg-flush-shrtcut iframe {
					width: 300px !important;
					height: 120px !important;
					-webkit-transform: translate(-152px, -69px) !important;
					transform: translate(-152px, -69px) !important;
				}
			</style>
			<div class="tlg-flush-shrtcut">
				<iframe src="${bseUrl}/flushredis.cfm?forceview=1" frameborder="0"></iframe>
			</div>
		`);

		setTimeout(() => {
			$('.tlg-flush-shrtcut iframe')
				.contents()
				.find('[type="submit"]')
				.css({
					'border-radius': 0,
					'width': 116,
					'height': 34
				})
				.on('click', function () {
					window.location = window.location;
				});

			$('.tlg-flush-shrtcut').addClass('init');
		}, 500);
	}
});
