function highlightAddCss(bg, colors) {
	$('head').append(`
		<style>
			.tlg-highlight-low {
				background-color: ${bg.low};
			}
			.tlg-highlight-low:not(:hover) td, .tlg-highlight-low:not(:hover) td > *, .tlg-highlight-low:not(:hover) td a > * {
				color: ${colors.low} !important;
			}

			.tlg-highlight-normal {
				background-color: ${bg.normal};
			}
			.tlg-highlight-normal:not(:hover) td, .tlg-highlight-normal:not(:hover) td > *, .tlg-highlight-normal:not(:hover) td a > * {
				color: ${colors.normal} !important;
			}

			.tlg-highlight-high {
				background-color: ${bg.high};
			}
			.tlg-highlight-high:not(:hover) td, .tlg-highlight-high:not(:hover) td > *, .tlg-highlight-high:not(:hover) td a > * {
				color: ${colors.high} !important;
			}

			.tlg-highlight-urgent {
				background-color: ${bg.urgent};
			}
			.tlg-highlight-urgent:not(:hover) td, .tlg-highlight-urgent:not(:hover) td > *, .tlg-highlight-urgent:not(:hover) td a > * {
				color: ${colors.urgent} !important;
			}

			.ember-view tbody tr.LRcq td[style*="padding: 0px 0px 0px 3px;"] {
				padding: 0px 1px 0px 2px !important;
			}
			.ember-view tbody tr.LRcq td .pop .LRdj {
				margin-right: 1px;
				box-shadow: 1px 1px 0px 0px #FFF, -1px -1px 0px 0px #FFF, -1px 1px 0px 0px #FFF, 1px -1px 0px 0px #FFF;
			}
		</style>
	`);
}
function highlightRow(text, $row) {
	function removeClassRow($row) {
		$row.removeClass(function(index, className) {
			return (className.match (/(^|\s)tlg-highlight-\S+/g) || []).join(' ');
		});
	}

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

function parseTikets() {
	$('.ember-view tbody tr.LRcq td').each(function(index, el) {
		var text = $.trim($(el).text()).toLowerCase();
		var $tr = $(this).closest('tr');
		highlightRow(text, $tr);
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
		}, 250);

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {

				var $trs = $(mutation.addedNodes).filter(function(index) {
					return $(this).is('tr.LRcq');
				});
				var $tds = $(mutation.target).filter(function(index) {
					return $(this).is('td');
				});
				var $nodes = $trs.add($tds);

				if ($nodes.length) {
					clearTimeout(sto_changing);
					sto_changing = setTimeout(function() {
						parseTikets();
					}, 500);
				}

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
	}
});