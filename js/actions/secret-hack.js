$(document).ready(function() {
	var font1 = chrome.extension.getURL('fonts/Deus-Antics.woff2');
	var font2 = chrome.extension.getURL('fonts/Deus-Antics.woff');
	var font3 = chrome.extension.getURL('fonts/Deus-Antics.ttf');

	$('head').append(`
		<style>
			@font-face {
				font-family: 'Deus Antics';
				src: url('${font1}') format('woff2'), url('${font2}') format('woff'), url('${font3}') format('truetype');
				font-weight: normal;
				font-style: normal;
			}
			html > body * , html > body * *, html > body * * *{
				font-family: "Deus Antics" !important;
			}
		</style>
	`)
});