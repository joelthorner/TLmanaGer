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

  observer = null

  select = null

  regexTextButton = null

  regexFindedInData = false

  regexWrapText = false

  constructor(selector, regexTextButton, regexFindedInData, regexWrapText) {
    super(selector);

    this.regexTextButton = regexTextButton;
    this.regexFindedInData = regexFindedInData;
    this.regexWrapText = regexWrapText;

    // this._initObserver();
  }

  // _initObserver() {
  //   this.observer = new MutationObserver(mutations => {
  //     mutations.forEach(mutation => {
  //       if (mutation.addedNodes.length) {
  //         for (let i = 0; i < mutation.addedNodes.length; i++) {
  //           const node = mutation.addedNodes[i];

  //           if (node.matches('.opensaasLoginFields')) {
  //             this.observer.disconnect();
  //             this.select = node.querySelector('select');
  //             this._initSelect();
  //             break;
  //           }
  //         }
  //       }
  //     });
  //   });
  // }

  _match() {
    const select = this.node.querySelector('select#sandbox');
    if (select) {
      this.select = select;
      this._initSelect();
    }
  }

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
        newEl.querySelectorAll('.option').forEach((opt) => {
          opt.classList.remove('active');
        })
        event.target.addClass('active');
        this.select.value = event.target.dataset.optionSelect;
      })
    }
  }

  _createWrap() {
    let buttonsCont = document.createElement('div');
    buttonsCont.className = 'select-html-fluid';
    buttonsCont.id = `select-html-fluid-${this.select.id}`;

    return buttonsCont;
  }

  _createButton(option) {
    if (option.value != 0) {
      let btn = document.createElement('button');
      btn.classList = `btn btn-option option option_${option.index}`;
      btn.setAttribute('type', 'button');
      btn.dataset.optionSelect = option.value;

      if (option.selected) {
        btn.classList += 'active';
      }

      let textData = this._getButtonText(option);
      btn.innerHTML = textData.text;
      btn.dataset.savedRegex = textData.regexData;

      return btn;
    }
    return null;
  }

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