/**
 * @file Run a script that fill signup form fields of Fluid development websites
 * @author joelthorner
 */
'use strict';

/**
 * Inject script with small error notify with Fluid.notify plugin
 */
function showErrorUserDataNotify() {
  var url = chrome.extension.getURL("options/options.html") + "#/user/info",
    link = `<a href="${url}" target="_blank">user settings</a>`;

  var script = document.createElement("script");
  script.innerHTML = `
    Fluid.notify('You need to add a testing email and password. Go to ${link}', {
      title: 'Error!',
      type: 'danger',
      sticky: false,
      deelay: 5000
    });
  `;
  document.head.appendChild(script);
}

/**
 * Form user saved username define first and last names field values.
 * @param {string} _username 
 * @returns {object}
 */
function getFirstAndLastName(_username) {
  var username = _username ? _username : 'Joel Doe',
    userNameArr = username.split(' ');

  if (userNameArr.length > 1) {
    return {
      firstName: userNameArr[0],
      lastName: userNameArr[1],
    };
  }

  return {
    firstName: username,
    lastName: username,
  };
}

/**
 * Fill input with string value
 * @param {string} value 
 * @param {object} node 
 */
function fillInputVal(value, node) {
  var nodes = node.querySelectorAll(':scope > input');
  if (nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.value = value;
    }
  }
}

/**
 * Simulate native event change
 * @param {object} element 
 * @param {string} type - Event type 
 */
function simulateEvent(element, type) {
  var event = new MouseEvent(type, {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  element.dispatchEvent(event);
}

/**
 * Simulate click event over check if checked param and already check state is different
 * @param {object} input 
 * @param {boolean} checked 
 */
function checkCheckbox(input, checked) {
  if (input) {
    if ((checked && input[0].checked == false) || (!checked && input[0].checked == true)) {
      simulateEvent(input[0], 'click');
    }
  }
}

/**
 * Submit the form by button (force)
 */
function formSubmit() {
  var submit = document.getElementById('saveUserButton');
  if (submit) {
    var interval = setInterval(() => {
      simulateEvent(submit, 'click')
    }, 750);

    setTimeout(() => {
      clearInterval(interval);
    }, 4000);
  }
}

/**
 * Fill country block
 * @param {object} divField 
 * @param {string} mutationSelector
 */
function fillCountry(divField, mutationSelector) {
  var countryField = divField.querySelector('#userCountryField');

  if (countryField) {
    var ES = countryField.querySelector('[data-country-initials="ES"]'),
      firstOption = countryField.querySelector('option:nth-child(2)');

    if (ES) {
      ES.selected = true;
    }
    if (firstOption) {
      firstOption.selected = true;
    }

    if (ES || firstOption) {
      simulateEvent(countryField, 'change');
      mutationObserver(divField, mutationSelector);
    }
  }
}

/**
 * Create MutationObserver for fillCountry()
 * @param {object} divField
 * @param {string} mutationSelector
 */
function mutationObserver(divField, mutationSelector) {
  var configCS = {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false,
  };

  var observerCS = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length != 0) {
        var select = mutation.target.querySelector('select');
        if (select) {
          var optionNth2 = select.querySelector('option:nth-child(2)');
          if (optionNth2) {
            optionNth2.selected = true;
          } else {
            select.querySelector('option:nth-child(1)').selected = true;
          }
          simulateEvent(select, 'change');
        }

        var inputs = mutation.target.querySelector('input:not(.subcountrySearchField)');
        if (inputs) {
          inputs.value = 'Wakanda';
        }
      }
    });
  });

  var targetCS = divField.querySelectorAll(mutationSelector);
  for (var i = targetCS.length - 1; i >= 0; i--) {
    if (targetCS[i]) observerCS.observe(targetCS[i], configCS);
  }
}

chrome.storage.sync.get(defaults, (result) => {
  // Check if defined testing user data (email and pasword)
  if (!result.profile.shopTestingEmail.actived || !result.profile.shopTestingPassword.actived) {
    showErrorUserDataNotify();
    return;
  }

  var userName = getFirstAndLastName(result.profile.shopTestingUsername.value),
    divFields = document.querySelectorAll('#userFormFieldsContainer > .userFormFields > div, #signInFormFieldsContainer > .userField');

  for (let i = 0; i < divFields.length; i++) {
    const divField = divFields[i];

    switch (divField.id) {
      case 'userFieldFirstNameContainer':
        fillInputVal(userName.firstName, divField);
        break;

      case 'userFieldLastNameContainer':
        fillInputVal(userName.lastName, divField);
        break;

      case 'userFieldEmailContainer':
        fillInputVal(result.profile.shopTestingEmail.value, divField);
        break;

      case 'userFieldMobileContainer':
        fillInputVal('6' + Math.floor(Math.random() * 100000000), divField);
        break;

      case 'userFieldCountryContainer':
        var betterCountry = divField.matches('.addressUserField');
        if (betterCountry) {
          fillCountry(divField, '.countryModesContent');
        } else {
          fillCountry(divField, '.availableCountries');
        }
        break;

      case 'userFieldAddress1Container':
        fillInputVal('Test address 1', divField);
        break;

      case 'userFieldBirthDateContainer':
        var dateElement = document.querySelector('.date[data-format]');
        if (dateElement) {
          var formattedDate = moment().format(dateElement.dataset.format);
          fillInputVal(formattedDate, divField);
        }
        break;

      case 'userFieldSubscribedContainer':
        var dataValidationEl = divField.querySelector('[data-validation]');
        if (dataValidationEl) {
          dataValidationEl.removeAttribute('data-validation');
        }
        checkCheckbox(divField.querySelectorAll('input'), false);
        break;

      case 'userFieldGenderContainer':
        // TODO
        break;

      case 'userFieldNifContainer':
        fillInputVal('37885984Q', divField);
        break;

      case 'userFieldvatIdContainer':
        fillInputVal('57432844Z', divField);
        break;

      case 'userFieldCompanyContainer':
        fillInputVal('Trilogi', divField);
        break;

      case 'userFieldAddress2Container':
        fillInputVal('Test address 2', divField);
        break;

      case 'userFieldNumberContainer':
        fillInputVal('6' + Math.floor(Math.random() * 100000000), divField);
        break;

      case 'userFieldPhoneContainer':
        fillInputVal('6' + Math.floor(Math.random() * 100000000), divField);
        break;

      case 'userFieldREContainer':
        fillInputVal('Test user RE', divField);
        break;

      case 'userFieldFaxContainer':
        fillInputVal('6' + Math.floor(Math.random() * 100000000), divField);
        break;

      case 'userFieldPasswordContainer':
        var passwd = document.getElementById('userPasswordField');
        if (passwd) {
          passwd.value = result.profile.shopTestingPassword.value;
        }
        break;

      case 'userFieldRetypePasswordContainer':
        var rePasswd = document.getElementById('userRetypePasswordField');
        if (rePasswd) {
          rePasswd.value = result.profile.shopTestingPassword.value;
        }
        break;
    }
  }

  // Legal check
  checkCheckbox(document.querySelectorAll('.userForm .legalTextLinks input'), true);

  // Submit
  formSubmit();
});