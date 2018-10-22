chrome.storage.sync.get(['optLcDevBarActive'], function(result) {

	if (typeof result.optLcDevBarActive == 'undefined') result.optLcDevBarActive = true;

	if (result.optLcDevBarActive/* && $("#SML_osUtils").length*/) {

		var real_environment = false; 
		if (!$("#SML_osUtils").length) {
			real_environment = true;

			$('#windowContainer').after(`
				<div class="window resizableWindow activedWindow opensaasWindow opensaasWindow-REAL" style="visibility: visible; zoom: 1; opacity: 1; top: 65px; left: 60px; z-index: 101;">
					<div class="windowMask">
						<div class="titleBar">
							<div class="windowTitle"><img class="windowIcon" align="absmiddle" src="interface/img/pixel.gif" style="background-image: url(&quot;interface/css/main/img/icons/windows/opensaasUtils.png&quot;);"><span><ls ls="opensaas.utils">Utilidades</ls></span></div>
						</div>
						<div class="windowContent">
							<properties data="opensaasUtils"></properties>
							<div class="windowLayout" style="position: relative; width: 800px; height: 540px;">
								<div class="autosize row" style="overflow: auto; height: 540px;">
									<input type="button" class="green __openRepo__" value="Open repo" onclick="openOSRepo();">
									<input type="button" class="green __publish__" value="Publish" onclick="openOSPublish();">
								</div>
							</div>
						</div>
					</div>
			`);
		}

		// ----------------------

		$('html').addClass('dev-lc-bar');
		if (!real_environment) $("#SML_osUtils").click();

		var siOsBar = setInterval(function(){
			var $wind = $('properties[data*="opensaasUtils"]').parents('.window');
			if ($wind.length) {
				clearInterval(siOsBar);
				
				if (!real_environment) {
					$(document).on('click', '.__cleanCacheCode__', function(event) {
						$('body').addClass('hidden-tlg');
						$('[ls="opensaas.utilCleanCacheCode"]').val(' ... ');
						setTimeout(function() {
							$('.messageBox .rightButtons input').first().click();
							setTimeout(function() {
								$('.messageBox .rightButtons input').first().click();
								$('[ls="opensaas.utilCleanCacheCode"]').val('Done!');
								setTimeout(function() {
									$('body').removeClass('hidden-tlg');
									$('[ls="opensaas.utilCleanCacheCode"]').val('Flush redis');
								}, 650);
							}, 1000);
						}, 300);
					});
				}

				$wind.addClass('opensaasWindow');

				// fix close all not close bar
				$('body').append('<script>window.windows.windows = [];</script>')
				
				// only os
				if (!real_environment) {
					$('[ls="opensaas.utilCleanCacheCode"]').val('Flush redis');
					$('[ls="opensaas.utilUpdateCacheProducts"]').val('Product update');
					$('[ls="opensaas.utilUpdateCacheCategories"]').val('Category update');
					$('[ls="opensaas.utilReloadApps"]').val('App update');
					$('[ls="opensaas.utilReloadEvents"]').val('Event update');
					$('[ls="opensaas.utilDownloadProjectCode"]').val('Download code');
				}

				$('#windowContainer').after(
					$(".opensaasWindow")
				);
				$('.taskMenuLink').first().remove();
				$('body').addClass('hidden-tlg-window');

				// all
				var $opWindCont = $('.opensaasWindow .windowContent');

				$opWindCont.after(
					'<button title="Pages" type="button" onclick="openPages();" class="btn-os-xtra btn-os-xtra-pag"></button>'
				);
				$opWindCont.after(
					'<button title="Banners" type="button" onclick="openBanners();" class="btn-os-xtra btn-os-xtra-ban"></button>'
				);
				$opWindCont.after(
					'<button title="Customtags" type="button" onclick="openCustomTagsGroups();" class="btn-os-xtra btn-os-xtra-tag"></button>'
				);
				$opWindCont.after(
					'<button title="Sections" type="button" onclick="openRelatedDefinitions();" class="btn-os-xtra btn-os-xtra-sec"></button>'
				);
				$opWindCont.after(
					'<button title="FTP" type="button" onclick="openFileManager();" class="btn-os-xtra btn-os-xtra-ftp"></button>'
				);
				
				// move search
				$('#searchMenu').appendTo($wind);

				// only real
				if (real_environment) {

				}
			}
		}, 50);
	}

});