(function($) {
	$.fn.magic_select = function( options ) {

		var settings = $.extend({
			regexTextButton: null,
			regexFindedInData: false,
			regexWrapText: false
		}, options );

		var _this = $(this);
		var newEl = $('<div class="select-html-fluid" id="select-html-fluid-'+_this.attr('id')+'"></div>');
	   
		// HTML
		_this.find('option').each(function(index, el) {
			// special fluid sistem options default = false
			if ($(el).val() != 0) {
				var active = "";
				if ($(el).is(':selected') || this.selected || $(el).prop("selected"))
					active = "active"; // class
				
				var textValue = $(el).text(),
					regexFindedInData = "",
					regexWrapText = "";
					
				if (settings.regexTextButton != null) {
					var search = textValue.match(settings.regexTextButton);
					if(search != null) $.each(search, function(index, val) {
						textValue = textValue.replace(val, '');
						if(settings.regexFindedInData) regexFindedInData = regexFindedInData + val;
					});
					if(settings.regexWrapText) regexWrapText = '<div class="regexWrapText regexWrapText'+index+'">' + regexFindedInData + '</div>';
				}

				newEl.append( 
					'<button type="button" class="btn btn-option option option_'+index+' '+active+'" data-option-select-f="'+$(el).val()+'" data-saved-regex="'+regexFindedInData+'">'+textValue+regexWrapText+'</button>' 
				);
			}
		});
		_this.after(newEl);

		// events
		newEl.find('.option').on('click', function(event) {
			
			var __this = $(this);
			var select_hidd = __this.parent('.select-html-fluid').prev('select');

			newEl.find('.option').removeClass('active');
			__this.addClass('active');

			var option =  select_hidd.find('option[value="' + __this.data('option-select-f') + '"]');
			option.prop('selected', true).change();
		});

		return newEl;
	}
})(jQuery);