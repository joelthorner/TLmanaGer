log(chrome.i18n.getMessage("showNewTemplate2018_consoleLog"));

$('[data-module]').each(function(index, el) {
	
  let newClass = 'showNewTemplate2018-module_' + Math.floor(Math.random() * 100000000);
	
	$(el)
		.addClass(newClass)
		.append(`
			<span class="showNewTemplate2018-line showNewTemplate2018-line-1"></span>
			<span class="showNewTemplate2018-line showNewTemplate2018-line-2"></span>
			<span class="showNewTemplate2018-line showNewTemplate2018-line-3"></span>
			<span class="showNewTemplate2018-line showNewTemplate2018-line-4"></span>
			
			<span class="showNewTemplate2018-name showNewTemplate2018-name-1">${$(el).data('module')}</span>
			<span class="showNewTemplate2018-name showNewTemplate2018-name-2">${$(el).data('module')}</span>
		`);

	let mt = parseInt($(el).css('margin-top')),
		  ml = parseInt($(el).css('margin-left')),
		  mb = parseInt($(el).css('margin-bottom')),
      mr = parseInt($(el).css('margin-right')),
      
      top = mt < 0 ? mt * -1 : 0,
		  left = ml < 0 ? ml * -1 : 0,
		  bottom = mb < 0 ? mb * -1 : 0,
      right = mr < 0 ? mr * -1 : 0,

      weight = '1px';

	$('body').append(`
		<style>
			.${newClass} {
				position: relative;
			}
			.${newClass} .showNewTemplate2018-line, .${newClass} .showNewTemplate2018-name {
				position: absolute;
				z-index: 100000;
				background-color: rgb(255, 0, 46);
			}
			.${newClass} .showNewTemplate2018-name {
				font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
				font-size: 12px;
				line-height: 1;
				padding: 5px;
				margin: 0;
				color: #FFF;
			}

			/* top */
			.${newClass} .showNewTemplate2018-line-1 {
				top: ${top}px;
				left: ${left}px;
				right: ${right}px;
				height: ${weight};
			}
			/* left */
			.${newClass} .showNewTemplate2018-line-2 {
				left: ${left}px;
				top: ${top}px;
				bottom: ${bottom}px;
				width: ${weight};
			}
			/* bottom */
			.${newClass} .showNewTemplate2018-line-3 {
				bottom: ${bottom}px;
				left: ${left}px;
				right: ${right}px;
				height: ${weight};
			}
			/* right */
			.${newClass} .showNewTemplate2018-line-4 {
				right: ${right}px;
				top: ${top}px;
				bottom: ${bottom}px;
				width: ${weight};
			}

			.${newClass} .showNewTemplate2018-name-1 {
				top: ${top}px;
				left: ${left}px;
			}
			.${newClass} .showNewTemplate2018-name-2 {
				top: ${top}px;
				right: ${right}px;
			}
		</style>

	`);
});