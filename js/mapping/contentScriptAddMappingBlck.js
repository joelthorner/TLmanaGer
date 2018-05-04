var _CSS = `
	<style id="CSS_TLG_CSS">
		.tlg-block{
			background-color: rgba(255, 0, 0, 0.15);
			width: 200px;
			height: 200px;
			z-index: 50000;
			position: absolute;
			border: 4px solid red;
			border-radius: 4px;
		}
		.tlg-block:hover .ui-resizable-handle,
		.ui-resizable-resizing .ui-resizable-handle{
			opacity: 1;
		}
		.ui-resizable-handle{
			width: 10px;
			height: 10px;
			background-color: #ffffff;
			border: 1px solid #000000;
			position: absolute;
			opacity: 0;
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
		.tlg-block-text{
			background-color: rgba(255, 0, 0, 0.15);
			width: 100px;
			height: 50px;
			z-index: 51000;
			position: absolute;
			border: 4px solid red;
			border-radius: 4px;
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
		<div id="${thisId}_TEXT" class="tlg-block-text" style="left: ${thisLeft + 250}px;top:${thisTop}px">
			Lorem ipsum
		</div>
	</div>
`;

// make block --------------------------------------


console.log(_BLOCK);


// APENDS
if (!$('#CSS_TLG_CSS').length) $('body').append(_CSS);
$('body').append(_BLOCK);

// FUNCTIONS --------------------------------------
function getTextBlockRelPos($block, $text){
	var topBlock = parseInt($block.css('top')),
		 leftBlock = parseInt($block.css('left')),
		 topText = parseInt($text.css('top')),
		 leftText = parseInt($text.css('left')),
		 heightBlock = $block.outerHeight(true),
		 widthBlock = $block.outerWidth(true);

	var leftSpaceText = leftText - (leftBlock + widthBlock),
		 topSpaceText = topText - (topBlock + heightBlock);

	return {
		leftSpaceText : leftSpaceText,
		topSpaceText : topSpaceText
	}
}

// EVENTS ------------------------------------------
$('.tlg-block-cont').each(function(index, el) {
	
	if ($(this).data('tlg-init') == undefined) {
		var tlgBlockId = '#' + $(this).find('.tlg-block').attr('id');
		
		// move drag
		$(tlgBlockId)
			.draggable({
				handle: '.mover',
				drag: function( event, ui ) {
					// console.log(ui);
					var $text = $(tlgBlockId + '_TEXT');
					var $block = $(tlgBlockId),

					topBlock = parseInt($block.css('top')),
					leftBlock = parseInt($block.css('left')),
					heightBlock = $block.outerHeight(true),
					widthBlock = $block.outerWidth(true);

					$text.css({
						left: leftBlock + widthBlock + $text.data('x-rel').leftSpaceText,
						top: topBlock + heightBlock + $text.data('x-rel').topSpaceText
					});
				}
			});

		$(tlgBlockId + '_TEXT')
			.draggable({
				drag: function( event, ui ) {

				}
			});

		// guardar rel
		var $text = $(tlgBlockId + '_TEXT');
		var $block = $(tlgBlockId);
		var data = getTextBlockRelPos($block, $text);

		$text.data('x-rel', {
			leftSpaceText: data.leftSpaceText,
			topSpaceText: data.topSpaceText
		});

		// drag mantenir distance

		// console.log(leftBlock,widthBlock,leftSpaceText);
		// console.log($(tlgBlockId + '_TEXT').data('rel-distance'));

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