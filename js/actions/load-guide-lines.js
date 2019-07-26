$(function() {
	var cookie = Cookies.get('add-guide-lines-active');

	if (typeof cookie == 'undefined') cookie = 0;

	cookie = parseInt(cookie);

	if (cookie == 1) {
		console.log(chrome.i18n.getMessage("loadGuideLines_consoleLog"));

		Cookies.set('add-guide-lines-active', '1');

		function Gstart() {
			$('body')
				.prepend(`
					<div id="g-container" class="container g-container-utility-tlg"></div>
					<div id="g-container-2" class="container g-container-utility-tlg"></div>
					<div id="g-container-middle" class="container g-container-utility-tlg"></div>
					<div id="g-container-data" class="container g-container-utility-tlg">
						<span>Inner width: <span class="g-width-val"></span></span>
						<span>Outer Width: <span class="g-width-val-2"></span></span>
						<span class="g-p-i">Lateral paddings: <span class="g-paddings-val"></span></span>
					</div>
				`);
			
			var containerPadding = $('#g-container').css('padding-left');
			var containerWidth = $('#g-container').width() + '' + $('#g-container').css('width').replace(/[0-9]{1,}/, '');
			var containerOWidth = $('#g-container').outerWidth() + containerWidth.replace(/[0-9]{1,}/, '');
	
			$('head')
				.append(`
					<style id="g-style" class="g-container-utility-tlg">
						#g-container, #g-container-2, #g-container-middle, #g-container-data {
							position: fixed;
							z-index: 9999999;
							left: 0;
							right: 0;
						}
						#g-container-data {
							bottom: 0;
							background-color: rgba(255, 255, 255, 0.6);
							z-index: 9999998;
						}
						#g-container:after, #g-container-2:after,
						#g-container:before, #g-container-2:before,
						#g-container-middle:before {
							content: "";
							position: absolute;
							height: 100000px;
							width: 1px;
							background-color: red;
							top: -5000px;
							z-index: 9999999;
						}
						#g-container:before, #g-container-2:before {
							left: 0;
						}
						#g-container-2:before {
							left: ${containerPadding};
						}
						#g-container:after, #g-container-2:after {
							right: 0;
						}
						#g-container-2:after {
							right: ${containerPadding};
						}
						#g-container-middle:before {
							left: 50%;
							transform: translateX(-50%);
							background-color: blue;
						}
						#g-container-data > span {
							font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
							font-size: 12px;
							line-height: 1;
							padding: 5px;
							margin: 0;
							width: 100%;
							display: block;
							text-align: center;
						}
						#g-container-data > span:nth-child(1) {
							color: blueviolet;
							border-bottom: 1px solid blueviolet;
						}
						#g-container-data > span:nth-child(2) {
							color: blue;
							border-bottom: 1px solid blue;
							width: calc(100% + ${containerPadding} + ${containerPadding});
							margin-left: -${containerPadding};
							margin-right: -${containerPadding};
						}
						#g-container-data > span.g-p-i {
							color: red;
						}
					</style>
				`);

			$('#g-container-data .g-width-val').text(containerWidth);
			$('#g-container-data .g-paddings-val').text(containerPadding);
			$('#g-container-data .g-width-val-2').text(containerOWidth);
		}

		function GdeleteAll() {
			$('.g-container-utility-tlg').remove();
		}

		Gstart();

		var to = null;
		$(window).resize(function(event) {
			clearTimeout(to);
			setTimeout(() => {
				GdeleteAll();
				Gstart();
			}, 50);
		});
	}
});