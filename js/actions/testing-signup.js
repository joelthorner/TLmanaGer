function assigncheckboxes(selector, bool) {
	if (bool && selector.prop('checked') == false) {
		$(selector[0]).click();
	}
	if (!bool && selector.prop('checked') == true) {
		$(selector[0]).click();
	}
}

function insertname(name, el) {
	$(el).find("input").val(name);
}

function simulateClickElement(element) {
	var event = new MouseEvent('change', {
		'view': window,
		'bubbles': true,
		'cancelable': true
	});
	var cb = element; 
	cb.dispatchEvent(event);
}

function timeouts(time, instruction){
	setTimeout(function() {
		instruction();
	},time);
}

var defaults = {
	optProfileEmail: '',
	optProfilePass: ''
};

chrome.storage.sync.get(defaults, function(result) {
	
	if (result.optProfileEmail.length == 0 || result.optProfilePass.length == 0) {
		var str = `
			<div id="signup-config-message" class="alert alert-danger signup-config-message"
				style="top: 40px;position: fixed;z-index: 9999;padding: 18px;font-size: 18px;
				left: 50%;width: 350px; margin-left: -175px; text-align: center;"
			>Cal Configurar les opcions </div>
		`;
		
		$("body").append(str); 
		
		timeouts(5000, function() { 
			$("#signup-config-message").fadeOut(400, function() {
				$(this).remove();
			}); 
		});	
	} else {
		$("#userFormFieldsContainer > .userFormFields > div, #signInFormFieldsContainer > .userField").each(function() { 
			switch ($(this).attr("Id")) {
				case 'userFieldFirstNameContainer':
					insertname("John", this);
					break;
					
				case 'userFieldLastNameContainer':
					insertname("Doe", this);
					break;
					
				case 'userFieldEmailContainer':
					insertname(result.optProfileEmail, this);
					break;
					
				case 'userFieldMobileContainer':
					insertname("6" + Math.floor(Math.random() * 100000000), this);
						break;
					
				case 'userFieldCountryContainer':
					$elem = $(this);
					simulateClickElement($elem[0]); 
					$elem.find("select").last().each(function(index,el) {	
						$(el).find('option:eq(1)').prop('selected', true);
						simulateClickElement(el);
					});
					var configCS = { 
						attributes: false, 
						childList: true, 
						characterData: false,
						subtree : true,
						attributeOldValue : false,
						characterDataOldValue : false
					};
					var targetCS = document.querySelectorAll('.availableCountries');
					var observerCS = new MutationObserver(function(mutations) {
						mutations.forEach(function(mutation) {
							if(mutation.addedNodes.length != 0){
								var $sel = $(mutation.target).find('select');
								var $inputs = $(mutation.target).find('input');
								if ($sel.length) {
									$sel.find('option:eq(1)').prop('selected', true);
									simulateClickElement($sel[0]);
								}
								if ($inputs.length) {
									$inputs.val("testcity");
								}
							}
						});	 
					});
					for (var i = targetCS.length - 1; i >= 0; i--) {
						if (targetCS[i]) observerCS.observe(targetCS[i], configCS);
					};
					// setTimeout(function() {
					// 	observerCS.disconnect();
					// }, 500);
					break;
					
				case 'userFieldAddress1Container':
					insertname("testAdress", this);
						break;
					
				case 'userFieldBirthDateContainer':
					insertname(moment().format($('.date[data-format]').data('format')), this);
						break;
					
				case 'userFieldSubscribedContainer':
					$(this).find("input").removeAttr("data-validation");
					assigncheckboxes($(this).find("input"), false);
					break;
					
				case 'userFieldGenderContainer':
					break;
					
				case 'userFieldNifContainer':
					insertname("37885984Q", this);
					break;
					
				case 'userFieldvatIdContainer':
					insertname("57432844Z", this);
					break;
					
				case 'userFieldCompanyContainer':
					insertname("Test Company", this);
					break;
					
				case 'userFieldAddress2Container':
					insertname("Test address 2", this);
					break;
					
				case 'userFieldNumberContainer':
					insertname("6" + Math.floor(Math.random() * 100000000), this);
					break;
					
				case 'userFieldPhoneContainer':
					insertname("6" + Math.floor(Math.random() * 100000000), this);
					break;
					
				case 'userFieldREContainer':
					insertname("Test user RE Container", this);
					break;
					
				case 'userFieldFaxContainer':
					insertname("6" + Math.floor(Math.random() * 100000000),	this);
					break;
					
				case 'userFieldPasswordContainer':		
					$("#userPasswordField").val(result.optProfilePass);
					break;
					
				case 'userFieldRetypePasswordContainer':
					$("#userRetypePasswordField").val(result.optProfilePass);
					break;
			}
		});

		assigncheckboxes($(".legalTextLinks").find("input"), true);
		
		var si = setInterval(function() {
			$("#saveUserButton").trigger('click');
		}, 750);
		
		timeouts(4000, function() {
			clearInterval(si);
		});

	}
});
