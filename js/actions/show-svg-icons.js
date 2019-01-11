console.log('TLmanaGer Action: "show-svg-icons";');

function copyToClipboard(elem) {
	// create hidden text element, if it doesn't already exist
	var targetId = "_hiddenCopyText_";
	var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
	var origSelectionStart, origSelectionEnd;
	if (isInput) {
		// can just use the original source element for the selection and copy
		target = elem;
		origSelectionStart = elem.selectionStart;
		origSelectionEnd = elem.selectionEnd;
	} else {
		// must use a temporary form element for the selection and copy
		target = document.getElementById(targetId);
		if (!target) {
			var target = document.createElement("textarea");
			target.style.position = "absolute";
			target.style.left = "-9999px";
			target.style.top = "0";
			target.id = targetId;
			document.body.appendChild(target);
		}
		target.textContent = elem.textContent;
	}
	// select the content
	var currentFocus = document.activeElement;
	target.focus();
	target.setSelectionRange(0, target.value.length);
	
	// copy the selection
	var succeed;
	try {
		succeed = document.execCommand("copy");
	} catch(e) {
		succeed = false;
	}
	// restore original focus
	if (currentFocus && typeof currentFocus.focus === "function") {
		currentFocus.focus();
	}
	
	if (isInput) {
		// restore prior selection
		elem.setSelectionRange(origSelectionStart, origSelectionEnd);
	} else {
		// clear temporary content
		target.textContent = "";
	}
	return succeed;
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

function insertIconsHtml($source) {
	$('body').append(`
		<div id="TLmanaGer-icons">
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
					width: 70%;
					height: 50%;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					background-color: #FFF;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: center;
					padding: 10px;
					border-radius: 7px;
					box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.70);
					overflow: auto;
				}
				#TLmanaGer-icons .icon-wrap svg {
					width: 50px;
					height: 50px;
					display: block;
					margin: 0 auto 10px;
				}
				#TLmanaGer-icons .icon-wrap {
					width: 120px;
					float: left;
					padding: 15px 5px;
					text-align: center;
					cursor: pointer;
					border-radius: 3px;
					background-color: #dfe2ea;
					margin: 10px;
				}
				#TLmanaGer-icons .icon-wrap:hover {
					fill: #FFF;
					color: #FFF;
					background-color: #0288d1;
				}
				#TLmanaGer-icons .input-name {
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
			</style>
			<div class="TLmanaGer-icons-body">
				<div class="TLmanaGer-icons-body-title">
					Click icon for copy #id
				</div>
				${$source.html()}
			</div>
		</div>
	`);

	$('.icon-wrap').on('click', function(event) {
		event.preventDefault();
		copyToClipboard($(this).find('.input-name')[0]);
	});
	$('#TLmanaGer-icons').on('click', function(event) {
		if (!$(event.target).parents('.TLmanaGer-icons-body').length && !$(event.target).is('.TLmanaGer-icons-body')) {
			$('#TLmanaGer-icons').remove();
		}
	});
}

function getElAttributes($el) {
	var el = $el[0];
	for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
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
			$(el).after('<input type="text" class="input-name" value="' + $(el).attr('id') + '">');
			
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

		});
		insertIconsHtml($clone);
	}
}