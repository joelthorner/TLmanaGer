$(function() {
	var font1 = chrome.extension.getURL('fonts/Deus-Antics.woff2');
	var font2 = chrome.extension.getURL('fonts/Deus-Antics.woff');
	var font3 = chrome.extension.getURL('fonts/Deus-Antics.ttf');

	if ($('#deus-antics-font').length) {
		$('#deus-antics-font, #deus-antics-font-credit').remove();
	} else {
		$('head').append(`
			<style id="deus-antics-font">
				@font-face {
					font-family: 'Deus Antics';
					src: url('${font1}') format('woff2'), url('${font2}') format('woff'), url('${font3}') format('truetype');
					font-weight: normal;
					font-style: normal;
				}
				html > body * , html > body * *, html > body * * *{
					font-family: "Deus Antics" !important;
				}
				#deus-antics-font-credit {
					position: fixed !important;
					bottom: 0 !important;
					left: 0 !important;
					display: block !important;
					box-size: border-box !important;
					background-color: #FFF !important;
					border-top: 1px solid #DDD !important;
					border-right: 1px solid #DDD !important;
					font-family: inherit !important;
					z-index: 999999 !important;
				}
				#deus-antics-font-credit > a{
					font-family: inherit !important;
					display: block !important;
					padding: 10px !important;
					line-height: 22px !important;
					font-size: 14px !important;
				}
			</style>
		`);
		$('body').append(`
			<div id="deus-antics-font-credit">
				<a href="https://www.instagram.com/unoriginal_02/" target="_blank" rel="nofollow">
					${chrome.i18n.getMessage("by")} @unoriginal_02
				</a>
			</div>
		`);
	}
});