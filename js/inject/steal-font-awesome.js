function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function parseOutputSvg(code) {
	code = code.replace(new RegExp('data-prefix="[a-z]{3}"\\s', "g"), '');
	code = code.replace(new RegExp('data-icon="[a-zA-Z\\-0-9]{1,}"', "g"), '');
	code = code.replace(new RegExp('class="[a-zA-Z\\-\\s\\-0-9]{0,}"', "g"), '');
	code = code.replace(new RegExp('fill="[a-zA-Z0-9\\#]{1,}"', "g"), '');
	code = code.replace(new RegExp('\\s>', "g"), '>'); // clear
	code = code.replace(new RegExp('\\s{2,}', "g"), ' '); // clear
	return code;
}
function parseOutputSymbol(code) {
	code = code.replace(new RegExp('aria-hidden="true"', "g"), 'id="icon-' + name + '"');
	code = code.replace(new RegExp('<svg', "g"), '<symbol');
	code = code.replace(new RegExp('/svg>', "g"), '/symbol>');
	code = code.replace(new RegExp('role="img"', "g"), '');
	code = code.replace(new RegExp('xmlns="http://www.w3.org/2000/svg"', "g"), '');
	code = code.replace(new RegExp('\\s>', "g"), '>'); // clear
	code = code.replace(new RegExp('\\s{2,}', "g"), ' '); // clear
	return code;
}
function parseOutputBg(code) {
	code = replaceAll(code, "%", "%25"); 
	code = replaceAll(code, "> <", "><"); // normalise spaces elements
	code = replaceAll(code, "; }", ";}"); // normalise spaces css
	code = replaceAll(code, "<", "%3c");
	code = replaceAll(code, ">", "%3e");
	code = replaceAll(code, "\"", "'");
	code = replaceAll(code, "#", "%23"); // needed for ie and firefox
	code = replaceAll(code, "{", "%7b");
	code = replaceAll(code, "}", "%7d");     
	code = replaceAll(code, "|", "%7c");
	code = replaceAll(code, "^", "%5e");
	code = replaceAll(code, "`", "%60"); 
	code = replaceAll(code, "@", "%40"); 
	return code;
}

var _STYLE_ = `
	#robatori {
		position:fixed;
		z-index: 999999;
		left: 0;
		right: 0;
		bottom: 0;
		min-height: 150px;
		background-color: #FFF;
		border-top: 1px solid #ddd;
		padding: 15px;
	}
	#robatori ._row {
		margin-left: -15px;
		margin-right: -15px;
	}
	#robatori ._row ._col {
		float: left;
		min-height: 1px;
		padding-left: 15px;
		padding-right: 15px;
		width: 25%;
	}
	#robatori ._row ._col label {
		margin-bottom: 10px;
		font-size: 12px;
		display: block;
	}
	#robatori ._row ._col textarea {
		font-size: 12px;
		font-family: monospace;
	}
	#robatori #__closert {
		padding: 15px;
		cursor: pointer;
		position: absolute;
		right: 0;
		top: 0;
	}
	#robatori #__closert svg {
		height: 16px;
		width: 16px;
	}
`;

var _SKELETON_ = `
	<div id="__closert">
		<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"></path></svg>
	</div>
	<div class="_row">
		<div class="_col">
			<label for="__svg">SVG</label>
			<textarea name="__svg" id="__svg" cols="30" rows="8" class="input-reset input-focus all-animate w-100 bg-white db shadow-inset-2 ba br2 pa3 lh-solid gray8 f4 sans-serif b--gray3"></textarea>
		</div>
		<div class="_col">
			<label for="__sym">SYMBOL</label>
			<textarea name="__sym" id="__sym" cols="30" rows="8" class="input-reset input-focus all-animate w-100 bg-white db shadow-inset-2 ba br2 pa3 lh-solid gray8 f4 sans-serif b--gray3"></textarea>
		</div>
		<div class="_col">
			<label for="__use">SYMBOL</label>
			<textarea name="__use" id="__use" cols="30" rows="8" class="input-reset input-focus all-animate w-100 bg-white db shadow-inset-2 ba br2 pa3 lh-solid gray8 f4 sans-serif b--gray3"></textarea>
		</div>
		<div class="_col">
			<label for="__backgrund">BACKGROUND IMAGE <small>(no base 64) :D (editable per css)</small></label>
			<textarea name="__backgrund" id="__backgrund" cols="30" rows="8" class="input-reset input-focus all-animate w-100 bg-white db shadow-inset-2 ba br2 pa3 lh-solid gray8 f4 sans-serif b--gray3"></textarea>
		</div>
	</div>
`;

chrome.storage.sync.get({ optDevStealFa: true }, function(result) {

	if (result.optDevStealFa) {

		$(document).ready(function() {

			var ready = $('[data-balloon*="size"]');

			var si = setInterval(function() {
				ready = $('[data-balloon*="size"]');

				if (ready.length) {
					clearInterval(si);
					$('body').append(`
						<div id="font-awesome-steal-layout">
							<style>${_STYLE_}</style>
							<div id="robatori">${_SKELETON_}</div>
						</div>
					`);

					var $svgP = $('[data-balloon="size: 2x"] > svg[data-icon]').parent();
					var name = $.trim($('h1 [data-balloon]').text());

					var out_svg = $svgP.html();
					out_svg = parseOutputSvg(out_svg);

					var out_sym = out_svg;
					out_sym = parseOutputSymbol(out_svg);

					var out_use = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-' + name + '"></use></svg>';

					var out_bg_svg = out_svg;
					var encoded = out_svg.replace(/\s+/g, " ")
					encoded = parseOutputBg(encoded);
					out_bg_svg = 'url("data:image/svg+xml;charset=UTF-8,' + encoded + '")'
					var out_bg = `background-image: ${out_bg_svg}`;

					$('#__svg').val(out_svg);
					$('#__sym').val(out_sym);
					$('#__use').val(out_use);
					$('#__backgrund').val(out_bg);

					$('#__closert').click(function(event) {
						$('#font-awesome-steal-layout').remove();
					});

					$('#__svg, #__sym, #__use, #__backgrund').on('focus', function(event) {
						$(this).select();
					});
				}
			}, 100);
		});
	}
});