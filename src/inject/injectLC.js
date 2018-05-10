chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// LC inject ----------------------------------------------------------------
			if ($('#loginForm').length == 0 && $('#bottomBar #startMenu').length) {
				// ALL
				var img = "";
				chrome.storage.sync.get(['optBgLc', 'optOSMode'], function(result) {
					img = result.optBgLc;
					
					var style = `
						<style>
							body{
								background-color: #FFF;
								background-image: url('${img}');
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
						</style>
					`;
					$('body').append(style);

					// OS
					if ($("#SML_osUtils").length && result.optOSMode == true) {
						
						$("#SML_osUtils").click();

						setTimeout(function(){
							var $wind = $('properties[data*="opensaasUtils"]').parents('.window');
							if ($wind.length) {
								$wind.addClass('opensaasWindow');
								
								$('[ls="opensaas.utilCleanCacheCode"]').val('FLUSH');
								$('[ls="opensaas.utilUpdateCacheProducts"]').val('PROD UPDATE');
								$('[ls="opensaas.utilUpdateCacheCategories"]').val('CAT UPDATE');
								$('[ls="opensaas.utilReloadApps"]').val('APP UPDATE');
								$('[ls="opensaas.utilReloadEvents"]').val('EVENT UPDATE');
								$('[ls="opensaas.utilDownloadProjectCode"]').val('');

								var style = `
									<style>
										body {
											height: calc(100% - 40px);
										}
										.lastposts {
											display: none !important;
										}
										#windowContainer {
											top: 40px;
										}
										.opensaasWindow .windowButtons,
										.opensaasWindow .windowTitle>span {
											display: none
										}
										.opensaasWindow.window {
											position: fixed;
											top: 0!important;
											left: 0!important;
											right: 0!important;
											height: 40px!important;
											border: 0
										}
										.opensaasWindow.window div.titleBar {
											background-color: #333
										}
										.opensaasWindow.window input.green {
											position: fixed;
											top: 3px;
											left: 42px;
											height: 34px;
											border-radius: 0;
											padding-left: 0;
											padding-right: 0;
											width: 140px;
											transition: all 150ms ease;
											background-color: #222;
											padding-top: 7px
										}
										.opensaasWindow.window input.green:hover {
											background-color: #444
										}
										.opensaasWindow.window input.green.__updateCacheProducts__ {
											left: 185px
										}
										.opensaasWindow.window input.green.__updateCacheCategories__ {
											left: 328px
										}
										.opensaasWindow.window input.green.__reloadApps__ {
											left: 471px
										}
										.opensaasWindow.window input.green.__reloadEvents__ {
											left: 614px
										}
										.opensaasWindow.window input.green.__downloadProjectCode__ {
											left: auto;
											right: 3px;
											width: 34px;
											padding-top: 3px;
											background-image : url('data:image/svg+xml;utf8,<svg aria-hidden="true" fill="#FFF" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>');
											background-size: 20px;
											background-position: center;
											background-repeat: no-repeat;
										}
										.opensaasWindow div.windowContent {
											height: 0
										}
										.messageBox [value=No] {
											margin-left: 0
										}
										.messageBox input[value="Sí"],
										.messageBox input[value=OK] {
											width: 180px;
											height: 50px;
											display: block;
											margin: 0 auto 10px;
											clear: both;
											float: none;
											margin-left: auto!important
										}
										.messageBox {
											top: 0!important;
											left: 0!important
										}
										.lastposts {
											display: none !important;
										}
									</style>
								`;
									
								$('body').append(style);
								$('#windowContainer').after(
									$(".opensaasWindow")
								);
								$('.taskMenuLink').first().remove();
							}
						}, 975);
					}

				});
			}
			// LC inject ----------------------------------------------------------------

		}
	}, 10);
});