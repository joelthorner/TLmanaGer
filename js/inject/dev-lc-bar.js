var _BASIC_STRUCT_ = `
	<nav class="nav-dev-lc-bar">
		<div class="bar-icon">
			<div class="icon"></div>
		</div>
		<div class="bar-dev-buttons"></div>
		<div class="bar-dev-search"></div>
		<div class="bar-dev-extra">
			<button title="${chrome.i18n.getMessage("pages")}" type="button" class="btn-os-xtra btn-os-xtra-pag"></button>
			<button title="${chrome.i18n.getMessage("banners")}" type="button" class="btn-os-xtra btn-os-xtra-ban"></button>
			<button title="${chrome.i18n.getMessage("customtags")}" type="button" class="btn-os-xtra btn-os-xtra-tag"></button>
			<button title="${chrome.i18n.getMessage("sections")}" type="button" class="btn-os-xtra btn-os-xtra-sec"></button>
			<button title="${chrome.i18n.getMessage("ftp")}" type="button" class="btn-os-xtra btn-os-xtra-ftp"></button>
		</div>
	</nav>
	<script>
		jQuery('.btn-os-xtra-pag').click(function(event) { openPages() });
		jQuery('.btn-os-xtra-ban').click(function(event) { openBanners() });
		jQuery('.btn-os-xtra-tag').click(function(event) { openCustomTagsGroups() });
		jQuery('.btn-os-xtra-sec').click(function(event) { openRelatedDefinitions() });
		jQuery('.btn-os-xtra-ftp').click(function(event) { openFileManager() });
	</script>
`;

function initBasicBar() {
	$('body').append(_BASIC_STRUCT_);
	
	$('.bar-dev-search').append(
		$('#searchMenu').detach()
	);
	
	$('#bottomBar #startMenuUser').before(`
		<div class="search-custom">
			<input class="search-bar-custom menuEntry noClose" type="text" placeholder="${chrome.i18n.getMessage("devLcBar_customSearchPlaceholder")}">
		</div>
	`);
	
	var $customSearch = $('#bottomBar .search-bar-custom');
	
	$customSearch.on('input', function(event) {
		$("#searchMenu input").val($(this).val());
	});

	$customSearch.on('keypress', function(event) {
		if (event.keyCode == 13) {
			$("#searchMenu input").focus();
			$customSearch.val('');
		}
	});
}

function flushSnbxOsBar() {
	$(document).on('click', '.__cleanCacheCode__', function(event) {
		$('body').addClass('hidden-tlg');
		
		var $utilCleanCacheCode = $('[ls="opensaas.utilCleanCacheCode"]').val(' ... ');
		
		setTimeout(function() {
			$('.messageBox .rightButtons input').first().click();
			
			setTimeout(function() {
				$('.messageBox .rightButtons input').first().click();
				$utilCleanCacheCode.val(chrome.i18n.getMessage("devLcBar_done"));
				
				setTimeout(function() {
					$('body').removeClass('hidden-tlg');
					$utilCleanCacheCode.val(chrome.i18n.getMessage("devLcBar_utilCleanCacheCode"));
				}, 650);
			}, 1000);
		}, 300);
	});
}

function btnsSnbxOsBar() {
	$('[ls*="utilCleanCacheCode"]').val(chrome.i18n.getMessage("devLcBar_utilCleanCacheCode"));
	$('[ls*="utilUpdateCacheProducts"]').val(chrome.i18n.getMessage("devLcBar_utilUpdateCacheProducts"));
	$('[ls*="utilUpdateCacheCategories"]').val(chrome.i18n.getMessage("devLcBar_utilUpdateCacheCategories"));
	$('[ls*="utilReloadApps"]').val(chrome.i18n.getMessage("devLcBar_utilReloadApps"));
	$('[ls*="utilReloadEvents"]').val(chrome.i18n.getMessage("devLcBar_utilReloadEvents"));
	$('[ls*="utilDownloadProjectCode"]').val(chrome.i18n.getMessage("devLcBar_utilDownloadProjectCode"));
}

function initSnbxOsBar() {
	$("#SML_osUtils").click();

	var siOsBar = setInterval(function(){
		var $window = $('properties[data*="opensaasUtils"]').parents('.window'),
			 $navButtons = $('.nav-dev-lc-bar .bar-dev-buttons');

		if ($window.length) {
			clearInterval(siOsBar);

			$window
				.removeAttr('style class')
				.addClass('os-utils-window')
				.appendTo($navButtons);

			// clear window openeds
			$('body').append('<script>window.windows.windows = [];</script>');
			$('#taskBar .taskMenuLink').remove();

			btnsSnbxOsBar();
			flushSnbxOsBar();
		}
	}, 50);
}

function initRealOsBar() {
	$('.nav-dev-lc-bar .bar-dev-buttons').append(`
		<input type="button" class="green btn-os-xtra-rep" value="Open repo">
		<input type="button" class="green btn-os-xtra-pub" value="Publish">

		<script>
			jQuery('.btn-os-xtra-rep').click(function(event) { openOSRepo() });
			jQuery('.btn-os-xtra-pub').click(function(event) { openOSPublish() });
		</script>
	`);
}

function setEnviroment() {
	if ($("#SML_osUtils").length) return 'snbx_os';
	else if ($('#SML_osRepo').length) return 'real_os';
	else if (!location.href.includes('login')) return 'others';

	return 'no_bar';
}

chrome.storage.sync.get({ optLcDevBarActive : true }, function(result) {

	if (result.optLcDevBarActive) {
		$('html').addClass('dev-lc-bar');
		
		var enviroment = setEnviroment();

		if (enviroment == 'real_os') {
			initBasicBar();
			initRealOsBar();
		}

		if (enviroment == 'snbx_os') {
			initBasicBar();
			initSnbxOsBar();
		}

		if (enviroment == 'others') {
			initBasicBar();
		}

		$('body').addClass('hidden-tlg-window');
	}

});
