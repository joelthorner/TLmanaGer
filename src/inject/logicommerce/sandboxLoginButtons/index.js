/**
 * @file Define the SandboxLoginButtons class and initialize it
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new SandboxLoginButtons
 * @class
 */
class SandboxLoginButtons extends LCModifier {

  /**
   * Select input
   * @type {HTMLSelectElement|null}
   */
  select = null

  /**
   * Regexp to match into select option text
   * @type {RegExp}
   */
  regexTextButton = null

  /**
   * Add dataset with match value from regexTextButton property to button
   * @type {Boolean}
   */
  regexFindedInData = false

  /**
   * Add finded regexp match string from regexTextButton property
   * inside button with <span> wrap
   * @type {Boolean}
   */
  regexWrapText = false

  /**
   * Create a SandboxLoginButtons.
   * @param {String} selector
   * @param {RegExp} regexTextButton
   * @param {Boolean} regexFindedInData 
   * @param {Boolean} regexWrapText 
   */
  constructor(selector, regexTextButton, regexFindedInData, regexWrapText) {
    super(selector);

    this.regexTextButton = regexTextButton;
    this.regexFindedInData = regexFindedInData;
    this.regexWrapText = regexWrapText;
  }

  /**
   * If node contains select#sandbox init plugin and hide select
   */
  _match() {
    const select = this.node.querySelector('select#sandbox');
    if (select) {
      this.select = select;
      this._initSelect();
      this.select.classList.add('select-html-tlmanager-hidden');
    }
  }

  /**
   * For each select option create a button and add events to control original html select
   */
  _initSelect() {
    let wrap = this._createWrap();

    for (let i = 0; i < this.select.options.length; i++) {
      const option = this.select.options[i];
      let btn = this._createButton(option);

      if (btn) {
        wrap.append(btn);
      }
    }

    this.insertAfter(wrap, this.select);

    for (let i = 0; i < wrap.querySelectorAll('.option').length; i++) {
      const btn = wrap.querySelectorAll('.option')[i];

      btn.addEventListener('click', (event) => {
        wrap.querySelectorAll('.option').forEach((opt) => {
          opt.classList.remove('active');
        })

        event.target.classList.add('active');
        this.select.value = event.target.dataset.optionSelect;
      });

      btn.addEventListener('dblclick', (event) => {
        let submit = document.getElementById('loginButton');
        if (submit) submit.click();
      });
    }
  }

  /**
   * Create an element that will contain the buttons
   */
  _createWrap() {
    let buttonsCont = document.createElement('div');
    buttonsCont.className = 'select-html-tlmanager';
    buttonsCont.id = `select-html-tlmanager-${this.select.id}`;

    return buttonsCont;
  }

  /**
   * From an option of a selector create a button
   * @param {HTMLOptionElement} option 
   */
  _createButton(option) {
    if (option.value != 0) {
      let btn = document.createElement('button');
      btn.classList = `btn btn-option option option_${option.index}`;
      btn.setAttribute('type', 'button');
      btn.dataset.optionSelect = option.value;

      if (option.selected) {
        btn.classList += ' active';
      }

      let textData = this._getButtonText(option);
      btn.innerHTML = textData.text;
      btn.dataset.savedRegex = textData.regexData;

      return btn;
    }
    return null;
  }

  /**
   * From a select option it returns the text that will go inside the new button
   * @param {HTMLOptionElement} option
   */
  _getButtonText(option) {
    let btnText = option.text,
      btnTextFromRegexMatch = '',
      result = btnText;

    if (this.regexTextButton) {
      var search = btnText.match(this.regexTextButton);

      if (search) {
        for (let i = 0; i < search.length; i++) {
          const element = search[i];
          result = result.replace(element, '');

          if (this.regexFindedInData) {
            btnTextFromRegexMatch = btnTextFromRegexMatch + element;
          }
        }
      }

      if (this.regexWrapText) {
        result = `${result}<div class="regexWrapText" tabindex="-1">${btnTextFromRegexMatch}</div>`;
      }
    }

    return {
      text: result,
      regexData: btnTextFromRegexMatch,
    };
  }

  /**
   * Insert an element right after another element, siblings.
   * @param {HTMLElement} newNode 
   * @param {HTMLElement} referenceNode 
   */
  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.sandboxLoginButtons.actived) {
    var sandboxLoginButtons = new SandboxLoginButtons('.opensaasLoginFields', /\(.*\)/g, true, true);
    observerLC.register(sandboxLoginButtons);
  }
});