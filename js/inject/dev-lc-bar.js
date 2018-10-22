chrome.storage.sync.get(['optLcDevBarActive'], function(result) {

	if (typeof result.optLcDevBarActive == 'undefined') result.optLcDevBarActive = true;

	if (result.optLcDevBarActive/* && $("#SML_osUtils").length*/) {

		// console.log($("#SML_osUtils").length);
		if (!$("#SML_osUtils").length) {
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
									<input type="button" class="green __cleanCacheCode__" ls="opensaas.utilCleanCacheCode" value="Flush redis">
									<input type="button" class="green __downloadProjectCode__" ls="opensaas.utilDownloadProjectCode" value="Download code">
									<input type="button" class="green __updateCacheProducts__" ls="opensaas.utilUpdateCacheProducts" value="Product update">
									<input type="button" class="green __updateCacheCategories__" ls="opensaas.utilUpdateCacheCategories" value="Category update">
									<input type="button" class="green __reloadApps__" ls="opensaas.utilReloadApps" value="App update">
									<input type="button" class="green __reloadEvents__" ls="opensaas.utilReloadEvents" value="Event update">
								</div>
							</div>
						</div>
					</div>
			`);
		}

		// ----------------------

		$('html').addClass('dev-lc-bar');
		$("#SML_osUtils").click();

		var siOsBar = setInterval(function(){
			var $wind = $('properties[data*="opensaasUtils"]').parents('.window');
			if ($wind.length) {
				clearInterval(siOsBar);
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

				$wind.addClass('opensaasWindow');

				// fix close all not close bar
				$('body').append('<script>window.windows.windows = [];</script>')
				
				$('[ls="opensaas.utilCleanCacheCode"]').val('Flush redis');
				$('[ls="opensaas.utilUpdateCacheProducts"]').val('Product update');
				$('[ls="opensaas.utilUpdateCacheCategories"]').val('Category update');
				$('[ls="opensaas.utilReloadApps"]').val('App update');
				$('[ls="opensaas.utilReloadEvents"]').val('Event update');
				$('[ls="opensaas.utilDownloadProjectCode"]').val('Download code');

				$('#windowContainer').after(
					$(".opensaasWindow")
				);
				$('.taskMenuLink').first().remove();
				$('body').addClass('hidden-tlg-window');

				$('.__downloadProjectCode__').after(
					'<button title="Pages" type="button" onclick="openPages();" class="btn-os-xtra btn-os-xtra-pag"></button>'
				);
				$('.__downloadProjectCode__').after(
					'<button title="Banners" type="button" onclick="openBanners();" class="btn-os-xtra btn-os-xtra-ban"></button>'
				);
				$('.__downloadProjectCode__').after(
					'<button title="Customtags" type="button" onclick="openCustomTagsGroups();" class="btn-os-xtra btn-os-xtra-tag"></button>'
				);
				$('.__downloadProjectCode__').after(
					'<button title="Sections" type="button" onclick="openRelatedDefinitions();" class="btn-os-xtra btn-os-xtra-sec"></button>'
				);
				$('.__downloadProjectCode__').after(
					'<button title="FTP" type="button" onclick="openFileManager();" class="btn-os-xtra btn-os-xtra-ftp"></button>'
				);

				// move search
				$('#searchMenu').appendTo($wind);
			}
		}, 50);
	}

});