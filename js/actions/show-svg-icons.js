log(chrome.i18n.getMessage("showSvgIcons_consoleLog"));

/**
 * searchIcons.
 *
 * Search parent container of svg icons.
 *
 * @since      05.08.19
 *
 * @param {String}	selector Html selector.
 * @param {String}	type		 nodeName, expects 'svg' or 'symbol'.
 * @return {String} Return finded parent of icons.
 */
function searchIcons(selector, type) {
	var $parent = null,
		 $selector = $(selector);

	$selector.each(function(index, el) {
		
		var iconLen = $(el).parent().find(type).length;

		if (iconLen >= 3) {
			$parent = $(el).parent();
		}
	});

	return $parent;
}

/**
 * insertIconsHtml.
 *
 * Add html skeleton, set the icon contents, 
 * and close/remove all system event.
 *
 * @since      05.08.19
 *
 * @param {HTMLElement}	$source Cloned and edited container node with svg icons (Node with jQuery).
 */
function insertIconsHtml($source) {
	$('body').append(`
		${cssNode}
		<div id="showSvgIcons-container" class="showSvgIcons-element">
			<div class="showSvgIcons-body">
				<div class="showSvgIcons-inner">
					${$source.html()}
				</div>
			</div>
		</div>
	`);

	// set input <svg> code value for copy
	$('#showSvgIcons-container .showSvgIcons-icon-wrap').each(function (index, el) {
		const svgValue = $(el).find('.showSvgIcons-svg-icon-wrap').html();
		$(el).find('.showSvgIcons-input-code').val(svgValue);
	})

	// Remove all system elements
	$('#showSvgIcons-container').on('click', function (event) {
		if (!$(event.target).parents('.showSvgIcons-body').length && !$(event.target).is('.showSvgIcons-body')) {
			$('.showSvgIcons-element').remove();
		}
	});
}

var cssNode = `
	<style class="showSvgIcons-element">
		#showSvgIcons-container {
			display: flex;
			flex-wrap: wrap;
			font-family: "Consolas", sans-serif;
			font-size: 12px;
			justify-content: center;
			position: fixed;
			z-index: 9999999999999;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,0.70);
		}
		.showSvgIcons-body {
			width: 80%;
			height: 75%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background-color: #FFF;
			padding: 10px;
			border-radius: 7px;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.70);
			overflow: auto;
		}
		.showSvgIcons-inner {
			display: grid;
			grid-template-columns: repeat(auto-fill, 200px);
			grid-gap: 15px;
			justify-content: center;
		}
		#showSvgIcons-container .showSvgIcons-icon-wrap svg {
			width: 80%;
			height: 100px;
			display: block;
			margin: 0 auto 15px;
		}
		#showSvgIcons-container .showSvgIcons-icon-wrap {
			width: 100%;
			float: left;
			padding: 15px 5px;
			text-align: center;
			border-radius: 3px;
			background-color: #dfe2ea;
			position: relative;
		}
		#showSvgIcons-container .showSvgIcons-icon-wrap > *:not(.showSvgIcons-hover-layer) {
			pointer-events: none;
		}
		#showSvgIcons-container .showSvgIcons-input-use, #showSvgIcons-container .showSvgIcons-input-code {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			border: 0;
		}
		#showSvgIcons-container .showSvgIcons-body-title {
			width: 100%;
			color: #888;
			text-align: center;
		}
		#showSvgIcons-container button {
			z-index: 1000;
			display: inline-block;
			font-weight: 400;
			color: #212529;
			text-align: center;
			vertical-align: middle;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			background-color: transparent;
			border: 1px solid transparent;
			padding: .375rem .75rem;
			font-size: 12px;
			line-height: 1.5;
			border-radius: .25rem;
			transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
			color: #fff;
			background-color: #007bff;
			border-color: #007bff;
			white-space: nowrap;
		}
		#showSvgIcons-container button + button {
			margin-top: 15px;
		}
		#showSvgIcons-container .showSvgIcons-hover-layer {
			position: absolute;
			opacity: 0;
			visibility: hidden;
			background-color: rgba(163, 169, 185, 0.9);
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			z-index: 10;
		}
		#showSvgIcons-container .showSvgIcons-icon-wrap:hover .showSvgIcons-hover-layer {
			opacity: 1;
			visibility: visible;
		}
		#showSvgIcons-container button:hover {
			color: #fff;
			background-color: #0062cc;
			border-color: #005cbf;
		}
		#showSvgIcons-container button:active {
			background-color: #004fa5;
			border-color: #004fa5;
		}
	</style>
`;


var $iconsSprite = $('.showSvgIcons-element');

if ($iconsSprite.length) {
	
	$iconsSprite.remove();

} else {

	var $spriteEl = searchIcons('body *:not(:visible):not(script):not(style) svg, body *.sr-only svg', 'svg');

	if ($spriteEl == null) {
		$spriteEl = searchIcons('body svg symbol', 'symbol');
	}
	if ($spriteEl != null) {

		var $clone = $spriteEl.clone(true, true);

		$clone.children().each(function(index, el) {
			$(el).wrap('<div class="showSvgIcons-icon-wrap"></div>');
			$(el).after('<div class="showSvgIcons-icon-name">' + $(el).attr('id') + '</div>');

			if ($(el).is('symbol')) {
				var symbolAttrs = "";
				$.each(getElAttributes($(el)), function(index, obj) {
					symbolAttrs += obj.name + '="' + obj.value + '" ';
				});

				$(el).replaceWith(
					'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' + symbolAttrs + '>' + 
						$(el).html() + 
					'</svg>'
				);
			}

			var useValue = htmlencode('<svg class="icon"><use xlink:href=\"#' + $(el).attr('id') + '\"></use></svg>');
			$(el).after('<input type="text" class="showSvgIcons-input-use" value="' + useValue + '">');

			$(el).after('<input type="text" class="showSvgIcons-input-code">');
			$(el).after(`
				<div class="showSvgIcons-hover-layer">
					<button class="showSvgIcons-button-copy-use" data-type="use" type="button">Copy &lt;use&gt;</button>
					<button class="showSvgIcons-button-copy-svg" data-type="svg" type="button">Copy &lt;svg&gt;</button>
				</div>
			`);
		});

		$clone.find('svg').each(function (index, el) {
			$(el).wrap('<div class="showSvgIcons-svg-icon-wrap"></div>');
		});
		insertIconsHtml($clone);
	}
}

// events 4 copy
$(function() { 
	$(document).on('click','.showSvgIcons-hover-layer button',function() {
		copyToClipboard(
			$(this).closest('.showSvgIcons-icon-wrap').find('.showSvgIcons-input-' + $(this).data('type'))
		);
	});
});
