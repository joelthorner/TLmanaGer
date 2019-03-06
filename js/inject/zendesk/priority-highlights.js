function ColorLuminance(hex, lum) {

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

function highlightAddCss(bg, colors) {
	$('head').append(`
		<style>
			.tlg-highlight-low {
				background-color: ${bg.low};
			}
			.tlg-highlight-low:not(:hover) td {
				border-bottom-color: ${ColorLuminance(bg.low, -0.1)}
			}
			.tlg-highlight-low:not(:hover) td, .tlg-highlight-low:not(:hover) td > *, .tlg-highlight-low:not(:hover) td a > * {
				color: ${colors.low} !important;
			}

			.tlg-highlight-normal {
				background-color: ${bg.normal};
			}
			.tlg-highlight-normal:not(:hover) td {
				border-bottom-color: ${ColorLuminance(bg.normal, -0.1)}
			}
			.tlg-highlight-normal:not(:hover) td, .tlg-highlight-normal:not(:hover) td > *, .tlg-highlight-normal:not(:hover) td a > * {
				color: ${colors.normal} !important;
			}

			.tlg-highlight-high {
				background-color: ${bg.high};
			}
			.tlg-highlight-high:not(:hover) td {
				border-bottom-color: ${ColorLuminance(bg.high, -0.1)}
			}
			.tlg-highlight-high:not(:hover) td, .tlg-highlight-high:not(:hover) td > *, .tlg-highlight-high:not(:hover) td a > * {
				color: ${colors.high} !important;
			}

			.tlg-highlight-urgent {
				background-color: ${bg.urgent};
			}
			.tlg-highlight-urgent:not(:hover) td {
				border-bottom-color: ${ColorLuminance(bg.urgent, -0.1)}
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
}
function highlightRow(text, $row) {

	switch (text) {
		case 'low':
			removeClassRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
		case 'normal':
			removeClassRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
		case 'high':
			removeClassRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
		case 'urgent':
			removeClassRow($row);
			$row.addClass('tlg-highlight-' + text)
			break;
	}
}

function findPriority(text) {
	switch (text) {
		case 'low':
		case 'normal':
		case 'high':
		case 'urgent':
			return true;
	}
	return false;
}

function removeClassRow($row) {
	$row.removeClass(function(index, className) {
		return (className.match (/(^|\s)tlg-highlight-\S+/g) || []).join(' ');
	});
}

function parseTikets() {
	$('.ember-view tbody tr').each(function(index, tr) {
		var hasPriority = false, priority = '';

		$(tr).find('td').each(function(index, td) {
			var text = $.trim($(td).text()).toLowerCase();
			
			if(findPriority(text)) {
				hasPriority = true;
				priority = text;
			}
		});

		if (hasPriority) highlightRow(priority, $(tr));
		else removeClassRow($(tr));
	});
}

chrome.storage.sync.get({
	optZenPriorHighs: defaults.optZenPriorHighs,
	optZenPriorHighsColors: defaults.optZenPriorHighsColors
}, function(result) {

	if (result.optZenPriorHighs) {
		highlightAddCss(result.optZenPriorHighsColors.bg, result.optZenPriorHighsColors.colors);

		var sto_changing = setTimeout(function() {
			parseTikets();
		}, 300);

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				clearTimeout(sto_changing);
				sto_changing = setTimeout(function() {
					parseTikets();
				}, 300);
			});    
		});
		
		var config = { 
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true 
		};
		
		$('.ember-view').each(function(index, el) {
			observer.observe(el, config);
		});

		$(document).on('click', function(event) {
			clearTimeout(sto_changing);
			sto_changing = setTimeout(function() {
				parseTikets();
			}, 300);
		});
	}
});