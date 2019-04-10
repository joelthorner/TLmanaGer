var priorityHighlightsCssAdded = false;

function colorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = '#', c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ('00' + c).substr(c.length);
	}

	return rgb;
}

function priorityHighlights_addCss(bg, colors) {
	$('head').append(`
		<style>
			.tlg-highlight-low {
				background-color: ${bg.low};
			}
			.tlg-highlight-low:not(:hover) td {
				border-bottom-color: ${colorLuminance(bg.low, -0.1)}
			}
			.tlg-highlight-low:not(:hover) td, .tlg-highlight-low:not(:hover) td > *, .tlg-highlight-low:not(:hover) td a > * {
				color: ${colors.low} !important;
			}

			.tlg-highlight-normal {
				background-color: ${bg.normal};
			}
			.tlg-highlight-normal:not(:hover) td {
				border-bottom-color: ${colorLuminance(bg.normal, -0.1)}
			}
			.tlg-highlight-normal:not(:hover) td, .tlg-highlight-normal:not(:hover) td > *, .tlg-highlight-normal:not(:hover) td a > * {
				color: ${colors.normal} !important;
			}

			.tlg-highlight-high {
				background-color: ${bg.high};
			}
			.tlg-highlight-high:not(:hover) td {
				border-bottom-color: ${colorLuminance(bg.high, -0.1)}
			}
			.tlg-highlight-high:not(:hover) td, .tlg-highlight-high:not(:hover) td > *, .tlg-highlight-high:not(:hover) td a > * {
				color: ${colors.high} !important;
			}

			.tlg-highlight-urgent {
				background-color: ${bg.urgent};
			}
			.tlg-highlight-urgent:not(:hover) td {
				border-bottom-color: ${colorLuminance(bg.urgent, -0.1)}
			}
			.tlg-highlight-urgent:not(:hover) td, .tlg-highlight-urgent:not(:hover) td > *, .tlg-highlight-urgent:not(:hover) td a > * {
				color: ${colors.urgent} !important;
			}

			.ember-view tbody tr td[style*="padding: 0px 0px 0px 3px;"] {
				padding: 0px 1px 0px 2px !important;
			}
			.ember-view tbody tr td .pop > * {
				margin-right: 1px;
				box-shadow: 1px 1px 0px 0px #FFF, -1px -1px 0px 0px #FFF, -1px 1px 0px 0px #FFF, 1px -1px 0px 0px #FFF;
			}
		</style>
	`);

	return true;
}

function priorityHighlights_parseRow(text, $row) {

	switch (text) {
		case 'low':
			priorityHighlights_clearRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
		case 'normal':
			priorityHighlights_clearRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
		case 'high':
			priorityHighlights_clearRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
		case 'urgent':
			priorityHighlights_clearRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
	}
}

function priorityHighlights_findPriority(text) {
	switch (text) {
		case 'low':
		case 'normal':
		case 'high':
		case 'urgent':
			return true;
	}
	return false;
}

function priorityHighlights_clearRow($row) {
	$row.removeClass(function(index, className) {
		return (className.match (/(^|\s)tlg-highlight-\S+/g) || []).join(' ');
	});
}

function priorityHighlights_parseTikets() {
	$('.ember-view tbody tr').each(function(index, tr) {
		var hasPriority = false, priority = '';

		$(tr).find('td').each(function(index, td) {
			var text = $.trim($(td).text()).toLowerCase();
			
			if(priorityHighlights_findPriority(text)) {
				hasPriority = true;
				priority = text;
			}
		});

		if (hasPriority) priorityHighlights_parseRow(priority, $(tr));
		else priorityHighlights_clearRow($(tr));
	});
}

function priorityHighlights_init(active, colors) {
	if (active) {
		if (!priorityHighlightsCssAdded) {	
			priorityHighlightsCssAdded = priorityHighlights_addCss(colors.bg, colors.colors);
		}
		priorityHighlights_parseTikets();
	}
}