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
		position:relative;
	}
	#TLmanaGer-icons .icon-wrap:hover {
		fill: #FFF;
    	color: #FFF;
    	background-color: #a3a9b9;
	}
	#TLmanaGer-icons .input-name, #TLmanaGer-icons .input-code {
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
	#TLmanaGer-icons .btn-copy-svg{
		position:absolute;
		z-index:1000;
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
		font-size: 1rem;
		line-height: 1.5;
		border-radius: .25rem;
		transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	    color: #fff;
	    background-color: #007bff;
	    border-color: #007bff;
	    white-space: nowrap;
	}
	#TLmanaGer-icons .btn-copy-svg:hover{
	    color: #fff;
    	background-color: #0069d9;
    	border-color: #0062cc;
	}
	#TLmanaGer-icons .btn-copy-svg:active{
	    color: #fff;
    	background-color: #0062cc;
    	border-color: #005cbf;
	}

</style>
`;

function insertIconsHtml($source) {
	$('body').append(`
		<div id="TLmanaGer-icons">
			${_CSS_}
			<div class="TLmanaGer-icons-body">
				<div class="TLmanaGer-icons-body-title">
					${chrome.i18n.getMessage("showSvgIcons_click4Copy")}
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
			$(el).after('<input type="text" class="input-code">');
			
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

		$clone.find('svg').each(function(index, el) {
			$(el).wrap('<div class="svg-icon-wrap"></div>')
		});

		insertIconsHtml($clone);
	}
}

$(document).ready(function(){ 
	$('.icon-wrap').each(function(){
	  	$(this)[0].oncontextmenu = function() {return false;};
	 });	
	$('.icon-wrap').mousedown(function(event) {
	    if(event.which == 3){
	    	$(this).find(".input-code").empty();
	    	$(this).find(".input-code").val($(this).find(".svg-icon-wrap").html());
    		var $str = $('<button class="btn-copy-svg" style="top:'+event.offsetY+'px;left:'+event.offsetX+'px">'+chrome.i18n.getMessage("showSvgIcons_clickLeft")+'</button>');
			$(".btn-copy-svg").not($str).remove();
            $(this).append($str);
	    }
	});
	$(document).on('click','.btn-copy-svg',function(){
		copyToClipboard($(this).parent().find(".input-code"));
		$(".btn-copy-svg").remove();
	});
	$(document).on('click', function(event) {
		var autoClose = true;
		if ($(event.target).parents('.btn-copy-svg').length) autoClose = false;
		if ($(event.target).is('.btn-copy-svg')) autoClose = false;
		if (autoClose) $(".btn-copy-svg").remove();
	});
});


