console.log('TLmanaGer Action: "show-new-templates-2018";');

$('[data-module]').each(function(index, el) {
	
	var newClass = 'module_' + Math.floor(Math.random() * 100000000);
	
	$(el)
		.addClass(newClass)
		.append(`
			<span class="snt-line snt-line-1"></span>
			<span class="snt-line snt-line-2"></span>
			<span class="snt-line snt-line-3"></span>
			<span class="snt-line snt-line-4"></span>
			
			<span class="snt-name snt-name-1">${$(el).data('module')}</span>
			<span class="snt-name snt-name-2">${$(el).data('module')}</span>
		`);

	var mt = parseInt($(el).css('margin-top')),
		 ml = parseInt($(el).css('margin-left')),
		 mb = parseInt($(el).css('margin-bottom')),
		 mr = parseInt($(el).css('margin-right'));

	var top = mt < 0 ? mt * -1 : 0,
		 left = ml < 0 ? ml * -1 : 0,
		 bottom = mb < 0 ? mb * -1 : 0,
		 right = mr < 0 ? mr * -1 : 0;

	var weight = '1px';

	$('body').append(`
		<style>
			.${newClass} {
				position: relative;
			}
			.${newClass} .snt-line, .${newClass} .snt-name {
				position: absolute;
				z-index: 100000;
				background-color: rgb(255, 0, 46);
			}
			.${newClass} .snt-name {
				font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
				font-size: 12px;
				line-height: 1;
				padding: 5px;
				margin: 0;
				color: #FFF;
			}

			/* top */
			.${newClass} .snt-line-1 {
				top: ${top}px;
				left: ${left}px;
				right: ${right}px;
				height: ${weight};
			}
			/* left */
			.${newClass} .snt-line-2 {
				left: ${left}px;
				top: ${top}px;
				bottom: ${bottom}px;
				width: ${weight};
			}
			/* bottom */
			.${newClass} .snt-line-3 {
				bottom: ${bottom}px;
				left: ${left}px;
				right: ${right}px;
				height: ${weight};
			}
			/* right */
			.${newClass} .snt-line-4 {
				right: ${right}px;
				top: ${top}px;
				bottom: ${bottom}px;
				width: ${weight};
			}

			.${newClass} .snt-name-1 {
				top: ${top}px;
				left: ${left}px;
			}
			.${newClass} .snt-name-2 {
				top: ${top}px;
				right: ${right}px;
			}
			/*
			.${newClass} .snt-name-3 {
				bottom: ${bottom}px;
				left: ${left}px;
			}
			.${newClass} .snt-name-4 {
				bottom: ${bottom}px;
				right: ${right}px;
			}
			*/
		</style>

	`);
});