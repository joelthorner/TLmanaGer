chrome.storage.sync.get(['optLcOpBarActive'], function(result) {

	if (typeof result.optLcOpBarActive == 'undefined') result.optLcOpBarActive = true;

	if (result.optLcOpBarActive && $("#SML_osUtils").length) {

		$('html').addClass('dev-opensaas-bar');
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