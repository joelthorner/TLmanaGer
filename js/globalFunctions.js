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
 *  - js/actions/add-guide-lines.js
 *  - js/actions/load-guide-lines.js
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

/**
 * guideLines_del.
 *
 * Remove html, css and events of guide lines from document, used in:
 *  - js/actions/remove-guide-lines.js
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
	$('.g-container-utility-tlg').remove();
	$(window).off('resize.guideLines_resize');
}

/**
 * guideLines_resize.
 *
 * Reset guide lines on window resize, use guideLines_del() and guideLines_add()
 *  - js/actions/add-guide-lines.js
 *  - js/actions/load-guide-lines.js
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