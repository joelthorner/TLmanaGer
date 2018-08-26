chrome.storage.sync.get(['optLcOpBarActive'], function(result) {

	if (result.optLcOpBarActive && $("#SML_osUtils").length) {

		$("#SML_osUtils").click();

		setTimeout(function(){
			var $wind = $('properties[data*="opensaasUtils"]').parents('.window');
			if ($wind.length) {
				$(document).on('click', '.__cleanCacheCode__', function(event) {
					$('body').addClass('hidden-tlg');
					$('[ls="opensaas.utilCleanCacheCode"]').val(' ... ');
					setTimeout(function() {
						$('.messageBox .rightButtons input').first().click();
						setTimeout(function() {
							$('.messageBox .rightButtons input').first().click();
							$('[ls="opensaas.utilCleanCacheCode"]').val('DONE!');
							setTimeout(function() {
								$('body').removeClass('hidden-tlg');
								$('[ls="opensaas.utilCleanCacheCode"]').val('FLUSH');
							}, 500)
						}, 1000)
					}, 250)
				});

				$wind.addClass('opensaasWindow');
				
				$('[ls="opensaas.utilCleanCacheCode"]').val('FLUSH');
				$('[ls="opensaas.utilUpdateCacheProducts"]').val('PROD UPDATE');
				$('[ls="opensaas.utilUpdateCacheCategories"]').val('CAT UPDATE');
				$('[ls="opensaas.utilReloadApps"]').val('APP UPDATE');
				$('[ls="opensaas.utilReloadEvents"]').val('EVENT UPDATE');
				$('[ls="opensaas.utilDownloadProjectCode"]').val('');

				$('#windowContainer').after(
					$(".opensaasWindow")
				);
				$('.taskMenuLink').first().remove();
				$('body').addClass('hidden-tlg-window');
			}
		}, 975);
	}

});