/**
 * guideLines_add.
 *
 * Print a extension formatted log.
 *
 * @since      05.08.19
 * @access     private
 *
 * @global
 * @param {String}	text          Text to console log.
 * @param {type}    [type='info'] Type of console log (visual).
 */
function log(text, type = 'info') {
	if (text.length) {
		let typeCss = '';
		
		switch (type) {
			case 'danger':
				typeCss = 'background-color: #dc3545;color: #FFF;';
				break;
			case 'success':
				typeCss = 'background-color: #28a745;color: #FFF;';
				break;
			case 'warning':
				typeCss = 'background-color: #ffc107;color: #343a40;';
				break;
			default:
				typeCss = 'background-color: #19d2f0;color: #FFF;';
				break;
		}

		console.log(
			`%c(${type})%c[TLmanaGer]%c ${text} `, 
			`${typeCss}padding: 2px 4px;`, 
			`background-color: #007aff;color: #FFF;padding: 2px 4px;`, 
			`background-color: #f2f2f2;color: #343a40;padding: 2px 4px;`
		)
	}
}

/**
 * guideLines_add.
 *
 * Add html and css guide lines to document, used in:
 *  - js/actions/guideLines/add.js
 *  - js/actions/guideLines/load.js
 * .
 *
 * @since      05.08.19
 * @access     private
 *
 * @memberof guideLines
 *
 * @global
 */
function guideLines_add() {
	$('body')
		.prepend(`
			<div id="guideLines-container" class="container guideLines-container-utility-tlg"></div>
			<div id="guideLines-container-2" class="container guideLines-container-utility-tlg"></div>
			<div id="guideLines-container-middle" class="container guideLines-container-utility-tlg"></div>
			<div id="guideLines-container-data" class="container guideLines-container-utility-tlg">
				<span>Inner width: <span class="guideLines-width-val"></span></span>
				<span>Outer Width: <span class="guideLines-width-val-2"></span></span>
				<span class="guideLines-p-i">Lateral paddings: <span class="guideLines-paddings-val"></span></span>
			</div>
		`);
	
	var containerPadding = $('#guideLines-container').css('padding-left');
	var containerWidth = $('#guideLines-container').width() + '' + $('#guideLines-container').css('width').replace(/[0-9]{1,}/, '');
	var containerOWidth = $('#guideLines-container').outerWidth() + containerWidth.replace(/[0-9]{1,}/, '');

	$('head')
		.append(`
			<style id="guideLines-style" class="guideLines-container-utility-tlg">
				#guideLines-container, #guideLines-container-2, #guideLines-container-middle, #guideLines-container-data {
					position: fixed;
					z-index: 9999999;
					left: 0;
					right: 0;
				}
				#guideLines-container-data {
					bottom: 0;
					background-color: rgba(255, 255, 255, 0.6);
					z-index: 9999998;
				}
				#guideLines-container:after, #guideLines-container-2:after,
				#guideLines-container:before, #guideLines-container-2:before,
				#guideLines-container-middle:before {
					content: "";
					position: absolute;
					height: 100000px;
					width: 1px;
					background-color: red;
					top: -5000px;
					z-index: 9999999;
				}
				#guideLines-container:before, #guideLines-container-2:before {
					left: 0;
				}
				#guideLines-container-2:before {
					left: ${containerPadding};
				}
				#guideLines-container:after, #guideLines-container-2:after {
					right: 0;
				}
				#guideLines-container-2:after {
					right: ${containerPadding};
				}
				#guideLines-container-middle:before {
					left: 50%;
					transform: translateX(-50%);
					background-color: blue;
				}
				#guideLines-container-data > span {
					font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
					font-size: 12px;
					line-height: 1;
					padding: 5px;
					margin: 0;
					width: 100%;
					display: block;
					text-align: center;
				}
				#guideLines-container-data > span:nth-child(1) {
					color: blueviolet;
					border-bottom: 1px solid blueviolet;
				}
				#guideLines-container-data > span:nth-child(2) {
					color: blue;
					border-bottom: 1px solid blue;
					width: calc(100% + ${containerPadding} + ${containerPadding});
					margin-left: -${containerPadding};
					margin-right: -${containerPadding};
				}
				#guideLines-container-data > span.g-p-i {
					color: red;
				}
			</style>
		`);

	$('#guideLines-container-data .guideLines-width-val').text(containerWidth);
	$('#guideLines-container-data .guideLines-paddings-val').text(containerPadding);
	$('#guideLines-container-data .guideLines-width-val-2').text(containerOWidth);
}

/**
 * guideLines_del.
 *
 * Remove html, css and events of guide lines from document, used in:
 *  - js/actions/guideLines/del.js
 * .
 *
 * @since      05.08.19
 * @access     private
 *
 * @memberof guideLines
 *
 * @global
 */
function guideLines_del() {
	$('.guideLines-container-utility-tlg').remove();
	$(window).off('resize.guideLines_resize');
}

/**
 * guideLines_resize.
 *
 * Reset guide lines on window resize, use guideLines_del() and guideLines_add()
 *  - js/actions/guideLines/add.js
 *  - js/actions/guideLines/load.js
 * .
 *
 * @since      05.08.19
 * @access     private
 *
 * @memberof guideLines
 *
 * @global
 */
function guideLines_resize() {
	let to = null;
	$(window).on('resize.guideLines_resize', function () {
		clearTimeout(to);
		setTimeout(() => {
			guideLines_del();
			guideLines_add();
		}, 50);
	});
}