console.log(chrome.i18n.getMessage("showSvgIcons_consoleLog"));


function copyToClipboard(elem) {
	if (elem) {
		elem.select();
		document.execCommand("copy");
	}
}

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

function htmlencode(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var _CSS_ = `
<style>
	#TLmanaGer-icons {
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
	.TLmanaGer-icons-body {
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
	.TLmanaGer-icons-inner {
		display: grid;
		grid-template-columns: repeat(auto-fill, 200px);
		grid-gap: 15px;
		justify-content: center;
	}
	#TLmanaGer-icons .icon-wrap svg {
    width: 80%;
    height: 100px;
    display: block;
    margin: 0 auto 15px;
	}
	#TLmanaGer-icons .icon-wrap {
		width: 100%;
		float: left;
		padding: 15px 5px;
		text-align: center;
		border-radius: 3px;
		background-color: #dfe2ea;
		position: relative;
	}
	#TLmanaGer-icons .icon-wrap > *:not(.tlg-hover-layer) {
		pointer-events: none;
	}
	#TLmanaGer-icons .input-use, #TLmanaGer-icons .input-code {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
	#TLmanaGer-icons .TLmanaGer-icons-body-title {
		width: 100%;
		color: #888;
		text-align: center;
	}
	#TLmanaGer-icons button {
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
	#TLmanaGer-icons button + button {
		margin-top: 15px;
	}
	#TLmanaGer-icons .tlg-hover-layer {
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
	#TLmanaGer-icons .icon-wrap:hover .tlg-hover-layer {
		opacity: 1;
		visibility: visible;
	}
	#TLmanaGer-icons button:hover {
		color: #fff;
		background-color: #0062cc;
		border-color: #005cbf;
	}
	#TLmanaGer-icons button:active {
		background-color: #004fa5;
		border-color: #004fa5;
	}
</style>
`;

function insertIconsHtml($source) {
	$('body').append(`
		<div id="TLmanaGer-icons">
			${_CSS_}
			<div class="TLmanaGer-icons-body">
				<div class="TLmanaGer-icons-inner">
					${$source.html()}
				</div>
			</div>
		</div>
	`);

	$('#TLmanaGer-icons .icon-wrap').each(function(index, el) {
		var svgValue = $(el).find('.svg-icon-wrap').html();
		$(el).find('.input-code').val(svgValue);
	})

	$('#TLmanaGer-icons').on('click', function(event) {
		if (!$(event.target).parents('.TLmanaGer-icons-body').length && !$(event.target).is('.TLmanaGer-icons-body')) {
			$('#TLmanaGer-icons').remove();
		}
	});
}

function getElAttributes($el) {
	var el = $el[0];
	for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++) {
		arr.push({ 
			name: atts[i].nodeName, 
			value: atts[i].nodeValue 
		});
	}
	return arr;
}

var $iconsSprite = $('#TLmanaGer-icons');

if ($iconsSprite.length) {
	$iconsSprite.remove();
} else {

	var $spriteEl = searchIcons('body *:not(:visible):not(script):not(style) svg, body *.sr-only svg', 'svg');

	if ($spriteEl == null) {
		$spriteEl = searchIcons('body svg symbol', 'symbol');
	}
	if ($spriteEl != null) {

		var $iconsSprite = $('#TLmanaGer-icons');
		var $clone = $spriteEl.clone(true, true);

		$clone.children().each(function(index, el) {
			$(el).wrap('<div class="icon-wrap"></div>');
			$(el).after('<div class="icon-name">' + $(el).attr('id') + '</div>');

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
			$(el).after('<input type="text" class="input-use" value="' + useValue + '">');

			$(el).after('<input type="text" class="input-code" value="">');
			$(el).after(`
				<div class="tlg-hover-layer">
					<button class="tlg-button-copy-use" type="button">Copy &lt;use&gt;</button>
					<button class="tlg-button-copy-svg" type="button">Copy &lt;svg&gt;</button>
				</div>
			`);
		});

		$clone.find('svg').each(function (index, el) {
			$(el).wrap('<div class="svg-icon-wrap"></div>');
		});
		insertIconsHtml($clone);
	}
}

$(document).ready(function() { 

	$(document).on('click','.tlg-button-copy-use',function() {
		copyToClipboard($(this).closest('.icon-wrap').find('.input-use'));
	});
	$(document).on('click','.tlg-button-copy-svg',function() {
		copyToClipboard($(this).closest('.icon-wrap').find('.input-code'));
	});

	$(document).on('click', function(event) {
		var autoClose = true;
		if ($(event.target).parents('.btn-copy-svg').length) autoClose = false;
		if ($(event.target).is('.btn-copy-svg')) autoClose = false;
		if (autoClose) $(".btn-copy-svg").remove();
	});
});
