PriorityHighlights = {
	timeout: null,
	cssAdded: false,

	init: function (active, colors) {
		clearTimeout(PriorityHighlights.timeout);
		PriorityHighlights.timeout = setTimeout(() => {
			PriorityHighlights.run(active, colors);
		}, 100);
	},

	run: function (active, colors) {
		this.active = active;
		this.colors = colors;

		if (this.active) {
			if (!this.cssAdded) {
				this.cssAdded = this.addCss();
			}
			this.parseTikets();
		}
	},

	addCss: function () {
		var PH = this;
		$('head').append(`
			<style>
				.tlg-highlight-low {
					background-color: ${PH.colors.bg.low};
				}
				.tlg-highlight-low:not(:hover) td {
					border-bottom-color: ${PH.colorLuminance(PH.colors.bg.low, -0.1)}
				}
				.tlg-highlight-low:not(:hover) td, .tlg-highlight-low:not(:hover) td > *, .tlg-highlight-low:not(:hover) td a > * {
					color: ${PH.colors.colors.low} !important;
				}

				.tlg-highlight-normal {
					background-color: ${PH.colors.bg.normal};
				}
				.tlg-highlight-normal:not(:hover) td {
					border-bottom-color: ${PH.colorLuminance(PH.colors.bg.normal, -0.1)}
				}
				.tlg-highlight-normal:not(:hover) td, .tlg-highlight-normal:not(:hover) td > *, .tlg-highlight-normal:not(:hover) td a > * {
					color: ${PH.colors.colors.normal} !important;
				}

				.tlg-highlight-high {
					background-color: ${PH.colors.bg.high};
				}
				.tlg-highlight-high:not(:hover) td {
					border-bottom-color: ${PH.colorLuminance(PH.colors.bg.high, -0.1)}
				}
				.tlg-highlight-high:not(:hover) td, .tlg-highlight-high:not(:hover) td > *, .tlg-highlight-high:not(:hover) td a > * {
					color: ${PH.colors.colors.high} !important;
				}

				.tlg-highlight-urgent {
					background-color: ${PH.colors.bg.urgent};
				}
				.tlg-highlight-urgent:not(:hover) td {
					border-bottom-color: ${PH.colorLuminance(PH.colors.bg.urgent, -0.1)}
				}
				.tlg-highlight-urgent:not(:hover) td, .tlg-highlight-urgent:not(:hover) td > *, .tlg-highlight-urgent:not(:hover) td a > * {
					color: ${PH.colors.colors.urgent} !important;
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
	},

	colorLuminance: function (hex, lum) {
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
	},

	parseTikets: function () {
		$('.ember-view tbody tr').each(function (index, tr) {
			var hasPriority = false, priority = '';

			$(tr).find('td').each(function (index, td) {
				var text = $.trim($(td).text()).toLowerCase();

				if (PriorityHighlights.findPriority(text)) {
					hasPriority = true;
					priority = text;
				}
			});

			if (hasPriority) PriorityHighlights.parseRow(priority, $(tr));
			else PriorityHighlights.clearRow($(tr));
		});
	},

	parseRow: function (text, $row) {
		switch (text) {
			case 'low':
			case 'normal':
			case 'high':
			case 'urgent':
				PriorityHighlights.clearRow($row);
				$row.addClass('tlg-highlight-' + text)
				break;
		}
	},

	findPriority: function (text) {
		switch (text) {
			case 'low':
			case 'normal':
			case 'high':
			case 'urgent':
				return true;
		}
		return false;
	},

	clearRow: function ($row) {
		$row.removeClass(function (index, className) {
			return (className.match(/(^|\s)tlg-highlight-\S+/g) || []).join(' ');
		});
	}
};