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
		.nwgrip, .negrip, .swgrip, .segrip, .ngrip, .egrip, .sgrip, .wgrip {
			width: 10px;
			height: 10px;
			background-color: #ffffff;
			border: 1px solid #000000;
			position: absolute;
		}

		.negrip {
			top:-6px; right:-6px;
		}
		.segrip {
			bottom:-6px; right:-6px;
		}
		.nwgrip {
			top:-6px; left:-6px;
		}
		.swgrip {
			bottom:-6px; left:-6px;
		}
		.ngrip {
			top:-6px; 
			left:50%; margin-left:-6px;
		}
		.egrip {
			right:-6px; 
			top:50%; margin-top:-6px;
		}
		.sgrip {
			bottom:-6px; 
			left:50%; margin-left:-6px;
		}
		.wgrip {
			left:-6px; 
			top:50%; margin-top:-6px;
		}
		.tlg-block .mover{
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 4;
			position: absolute;
		}
	</style>
`;

var thisId = "ID_" + new Date().getUTCMilliseconds(),
	 thisTop = $(document).scrollTop() + (window.innerHeight / 2),
	 thisLeft = window.innerWidth / 2;

// make block ---------------------------------
var _BLOCK = `
	<div class="tlg-block-cont">
		<!-- BLOCK COLOR -->
		<div id="${thisId}" class="tlg-block" style="left: ${thisLeft}px;top:${thisTop}px">
			<div class="ui-resizable-handle ui-resizable-nw nwgrip" id="${thisId}_nwgrip"></div>
			<div class="ui-resizable-handle ui-resizable-ne negrip" id="${thisId}_negrip"></div>
			<div class="ui-resizable-handle ui-resizable-sw swgrip" id="${thisId}_swgrip"></div>
			<div class="ui-resizable-handle ui-resizable-se segrip" id="${thisId}_segrip"></div>
			<div class="ui-resizable-handle ui-resizable-n ngrip" id="${thisId}_ngrip"></div>
			<div class="ui-resizable-handle ui-resizable-e egrip" id="${thisId}_egrip"></div>
			<div class="ui-resizable-handle ui-resizable-s sgrip" id="${thisId}_sgrip"></div>
			<div class="ui-resizable-handle ui-resizable-w wgrip" id="${thisId}_wgrip"></div>
			<div class="mover"></div>
		</div>
	</div>
`;

// make block --------------------------------------


console.log(_BLOCK);


// APENDS
/*if (!$('#CSS_TLG_CSS').length)*/ $('body').append(_CSS);
$('body').append(_BLOCK);


// EVENTS ------------------------------------------
$('.tlg-block-cont').each(function(index, el) {
	
	if ($(this).data('tlg-init') == undefined) {
		var tlgBlockId = '#' + $(this).find('.tlg-block').attr('id');
		
		// move drag
		// $(tlgBlockId).draggabilly({
		// 	containment: 'body',
		// 	handle: '.mover'
		// });
		$(function(){
			$(tlgBlockId).draggable({
				handle: '.mover'
			});
		});

		// resizers
		$(tlgBlockId).resizable({
			handles: {
				'ne': tlgBlockId + '_negrip',
				'se': tlgBlockId + '_segrip',
				'sw': tlgBlockId + '_swgrip',
				'nw': tlgBlockId + '_nwgrip',
				'n' : tlgBlockId + '_ngrip',
				'e' : tlgBlockId + '_egrip',
				's' : tlgBlockId + '_sgrip',
				'w' : tlgBlockId + '_wgrip'
			 }
		});

		$(this).data('tlg-init', true);
	}
});


// $(".tlg-block").each(function(index, el) {
// 	$( "#" + $(el).attr('id') ).resizable({ 
// 		moverSelector: "#" + $(el).attr('id') + " .resizer"
// 	});
// });