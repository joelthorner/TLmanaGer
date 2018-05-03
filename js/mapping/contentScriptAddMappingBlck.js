var timestamp = new Date().getUTCMilliseconds();

var _CSS = `
	<style id="CSS_TLG_CSS">
		.tlg-block{
			background-color: rgba(255, 0, 0, 0.15);
			width: 200px;
			height: 200px;
			z-index: 2147483647;
			position: absolute;
			border: 4px solid red;
			border-radius: 4px;
		}
		.tlg-block .win-size-grip{
		  	position: absolute;
		   width: 16px;
		   height: 16px;
		   padding: 4px;
		   bottom: 0;
		   right: 0;
		   z-index: 5;
		   cursor: nwse-resize;
		   background: url(https://raw.githubusercontent.com/RickStrahl/jquery-resizable/master/assets/wingrip.png) no-repeat;
		}
		.tlg-block .handle{
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
		   z-index: 4;
		   position: absolute;
		}
	</style>
`;

var _BLOCK = $('<div/>', {
	class : 'tlg-block',
	id : "ID_" + timestamp,
})
.css({
	top: $(document).scrollTop() + (window.innerHeight / 2),
	left: window.innerWidth / 2
})
.append('<div class="win-size-grip"></div>')
.append('<div class="handle"></div>');


if (!$('#CSS_TLG_CSS').length) $('body').append(_CSS);

$('body').append(_BLOCK);

var $tlgBlock = $('.tlg-block').draggabilly({
	containment: 'body',
	handle: '.handle'
	// grid: [ 15, 15 ]
});

$(".tlg-block").each(function(index, el) {
	$( "#" + $(el).attr('id') ).resizable({ 
		handleSelector: "#" + $(el).attr('id') + " .win-size-grip"
	});
});