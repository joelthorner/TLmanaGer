function afterBarJs($wind) {
	var $opWindCont = $('.opensaasWindow .windowContent');

	$opWindCont.after(
		'<button title="Pages" type="button" onclick="openPages();" class="btn-os-xtra btn-os-xtra-pag"></button>' +
		'<button title="Banners" type="button" onclick="openBanners();" class="btn-os-xtra btn-os-xtra-ban"></button>' +
		'<button title="Customtags" type="button" onclick="openCustomTagsGroups();" class="btn-os-xtra btn-os-xtra-tag"></button>' +
		'<button title="Sections" type="button" onclick="openRelatedDefinitions();" class="btn-os-xtra btn-os-xtra-sec"></button>' +
		'<button title="FTP" type="button" onclick="openFileManager();" class="btn-os-xtra btn-os-xtra-ftp"></button>'
	);

	// move search
	$('#searchMenu').appendTo($wind);

	$('#windowContainer').after( $(".opensaasWindow") );
}

chrome.storage.sync.get(['optLcDevBarActive'], function(result) {

	if (typeof result.optLcDevBarActive == 'undefined') result.optLcDevBarActive = true;

	if (result.optLcDevBarActive) {
		$('html').addClass('dev-lc-bar');
		
		// snbx_os, real_os, others
		var enviroment;

		if ($("#SML_osUtils").length) enviroment = 'snbx_os';
		else if ($('#SML_osRepo').length) enviroment = 'real_os';
		else enviroment = 'others';
		// end get enviroment

		if (enviroment == 'real_os') {
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
				</div>
			`);

			afterBarJs($('.opensaasWindow-REAL'));
			$('body').addClass('hidden-tlg-window');
		}

		if (enviroment == 'snbx_os') {
			$("#SML_osUtils").click();

			var siOsBar = setInterval(function(){
				var $wind = $('properties[data*="opensaasUtils"]').parents('.window');
				if ($wind.length) {
					clearInterval(siOsBar);
					
					// click flush
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

					$wind.addClass('opensaasWindow opensaasWindow-SNBX');

					afterBarJs($wind);

					// fix close all not close bar
					$('body').append('<script>window.windows.windows = [];</script>')
					
					$('[ls="opensaas.utilCleanCacheCode"]').val('Flush redis');
					$('[ls="opensaas.utilUpdateCacheProducts"]').val('Product update');
					$('[ls="opensaas.utilUpdateCacheCategories"]').val('Category update');
					$('[ls="opensaas.utilReloadApps"]').val('App update');
					$('[ls="opensaas.utilReloadEvents"]').val('Event update');
					$('[ls="opensaas.utilDownloadProjectCode"]').val('Download code');

					$('.taskMenuLink').first().remove();
					$('body').addClass('hidden-tlg-window');
				}
			}, 50);
		}

		if (enviroment == 'others') {
			$('#windowContainer').after(`
				<div class="window resizableWindow activedWindow opensaasWindow opensaasWindow-OTHERS" style="visibility: visible; zoom: 1; opacity: 1; top: 65px; left: 60px; z-index: 101;">
					<div class="windowMask">
						<div class="titleBar">
							<div class="windowTitle"><img class="windowIcon" align="absmiddle" src="interface/img/pixel.gif" style="background-image: url(&quot;interface/css/main/img/icons/windows/opensaasUtils.png&quot;);"><span><ls ls="opensaas.utils">Utilidades</ls></span></div>
						</div>
						<div class="windowContent">
							<properties data="opensaasUtils"></properties>
							<div class="windowLayout" style="position: relative; width: 800px; height: 540px;">
								<div class="autosize row" style="overflow: auto; height: 540px;">
								</div>
							</div>
						</div>
					</div>
				</div>
			`);

			afterBarJs($('.opensaasWindow-OTHERS'));
			$('body').addClass('hidden-tlg-window');
		}

	}

});