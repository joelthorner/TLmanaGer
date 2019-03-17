function assignCheckboxes(selector, bool) {
	if (bool && selector.prop('checked') == false) {
		$(selector[0]).click();
	}
	if (!bool && selector.prop('checked') == true) {
		$(selector[0]).click();
	}
}

function insertName(name, el) {
	$(el).find('input').val(name);
}

function simulateClickElement(element) {
	var event = new MouseEvent('change', {
		'view': window,
		'bubbles': true,
		'cancelable': true
	});
	element.dispatchEvent(event);
}

function timeouts(time, instruction){
	setTimeout(function() {
		instruction();
	},time);
}

var defaults = {
	optProfileEmail: '',
	optProfilePass: '',
	optProfileUsername: ''
};

chrome.storage.sync.get(defaults, function(result) {
	
	if (!result.optProfileEmail.length || !result.optProfilePass.length) {
		var url = chrome.extension.getURL('src/options/index.html') + '#profile';
		var link = `<a href="${url}" target="_blank">${chrome.i18n.getMessage('options')}</a>`
		var str = `
			<script>
				Fluid.notify('${chrome.i18n.getMessage('testingSignUp_notifyText')} ${link}', {
					title: '${chrome.i18n.getMessage('testingSignUp_notifyTitle')}',
					type: 'danger',
					sticky: false,
					deelay: 5000
				});
			</script>
		`;
		
		$('body').append(str);

	} else {

		var firstName = 'John', lastName = 'Doe';

		if (result.optProfileUsername.length) {
			var userNameArr = result.optProfileUsername.split(' ');
			if (userNameArr[0]) {
				firstName = userNameArr[0];
				
				if (userNameArr[1]) {
					lastName = userNameArr[1];
				} else {
					lastName = userNameArr[0];
				}
			} else {
				firstName = result.optProfileUsername;
				lastName = result.optProfileUsername;
			}
		}

		$('#userFormFieldsContainer > .userFormFields > div, #signInFormFieldsContainer > .userField').each(function() { 
			switch ($(this).attr('Id')) {
				case 'userFieldFirstNameContainer':
					insertName(firstName, this);
					break;
					
				case 'userFieldLastNameContainer':
					insertName(lastName, this);
					break;
					
				case 'userFieldEmailContainer':
					insertName(result.optProfileEmail, this);
					break;
					
				case 'userFieldMobileContainer':
					insertName('6' + Math.floor(Math.random() * 100000000), this);
					break;
					
				case 'userFieldCountryContainer':
					$elem = $(this);
					simulateClickElement($elem[0]); 
					$elem.find('select').last().each(function(index,el) {	
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
								if ($sel.length) {
									$sel.find('option:eq(1)').prop('selected', true);
									simulateClickElement($sel[0]);
								}
								
								var $inputs = $(mutation.target).find('input');
								if ($inputs.length) {
									$inputs.val(
										chrome.i18n.getMessage('testingSignUp_loremCity')
									);
								}
							}
						});	 
					});
					for (var i = targetCS.length - 1; i >= 0; i--) {
						if (targetCS[i]) observerCS.observe(targetCS[i], configCS);
					};
					break;
					
				case 'userFieldAddress1Container':
					insertName(chrome.i18n.getMessage('testingSignUp_loremAddress1'), this);
					break;
					
				case 'userFieldBirthDateContainer':
					insertName(moment().format($('.date[data-format]').data('format')), this);
					break;
					
				case 'userFieldSubscribedContainer':
					$(this).find('input').removeAttr('data-validation');
					assignCheckboxes($(this).find('input'), false);
					break;
					
				case 'userFieldGenderContainer':
					// TODO
					break;
					
				case 'userFieldNifContainer':
					insertName('37885984Q', this);
					break;
					
				case 'userFieldvatIdContainer':
					insertName('57432844Z', this);
					break;
					
				case 'userFieldCompanyContainer':
					insertName(chrome.i18n.getMessage('testingSignUp_loremCompany'), this);
					break;
					
				case 'userFieldAddress2Container':
					insertName(chrome.i18n.getMessage('testingSignUp_loremAddress2'), this);
					break;
					
				case 'userFieldNumberContainer':
					insertName('6' + Math.floor(Math.random() * 100000000), this);
					break;
					
				case 'userFieldPhoneContainer':
					insertName('6' + Math.floor(Math.random() * 100000000), this);
					break;
					
				case 'userFieldREContainer':
					insertName(chrome.i18n.getMessage('testingSignUp_loremRE'), this);
					break;
					
				case 'userFieldFaxContainer':
					insertName('6' + Math.floor(Math.random() * 100000000),	this);
					break;
					
				case 'userFieldPasswordContainer':		
					$('#userPasswordField').val(result.optProfilePass);
					break;
					
				case 'userFieldRetypePasswordContainer':
					$('#userRetypePasswordField').val(result.optProfilePass);
					break;
			}
		});

		assignCheckboxes($('.userForm .legalTextLinks input'), true);
		
		if ($('#saveUserButton').length) {
			var si = setInterval(function() {
				$('#saveUserButton').trigger('click');
			}, 750);
			timeouts(4000, function() {
				clearInterval(si);
			});
		}
	}
});
