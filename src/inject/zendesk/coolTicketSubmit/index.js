/**
 * @file Define the CoolTicketSubmit class, initialize it and register it in the observerZendesk
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new CoolTicketSubmit
 * @class
 */
class CoolTicketSubmit extends Modifier {

  types = {
    new: '#ffb648',
    open: '#e34f32',
    pending: '#3091ec',
    on_hold: '#2f3941',
    hold: '#2f3941', // same hold, duplicated performance
    solved: '#87929d'
  }

  replyTicketConfirmPopup = false

  lang = 'en'

  /**
   * Create a CoolTicketSubmit.
   * @param {string} selector
   * @param {boolean} replyTicketConfirmPopup
   */
  constructor(selector, replyTicketConfirmPopup) {
    super(selector);
    this.replyTicketConfirmPopup = replyTicketConfirmPopup;
    this.lang = document.documentElement.getAttribute('lang');
  }

  /**
   * On finded changed nodes, up to tbody and update all tbody <tr> rows
   */
  _match() {
    document.body.classList.add('coolTicketSubmit');

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.initElements();
    }, 100);
  }

  initElements() {
    let buttonGroups = document.querySelectorAll('[data-test-id="ticket-footer"] div[data-garden-id="buttons.button_group_view"]');
    if (buttonGroups) {
      for (let i = 0; i < buttonGroups.length; i++) {
        const buttonGroup = buttonGroups[i];
        this.initElement(buttonGroup);
      }
    }
  }

  /**
   * 
   * @param {object} buttonGroup 
   */
  initElement(buttonGroup) {
    let workspace = buttonGroup.closest('.ember-view.workspace');

    if (workspace) {
      if (this.isDestroyable(buttonGroup)) {
        if (this.isHidden(workspace)) {
          this.destroy(workspace);
        }
      }

      if (!this.isHidden(workspace)) {
        let expanderButton = buttonGroup.querySelector('[data-garden-id="buttons.icon_button"]');
        let uniqueButton = buttonGroup.querySelector('[data-garden-id="buttons.button"]');

        if (this.isValidCreateMenuExpanderFull(expanderButton, buttonGroup)) {
          this.createMenuExpanderFull(buttonGroup);
          console.log('full');
        } else if (this.isValidCreateMenuExpanderUnique(uniqueButton, buttonGroup)) {
          this.createMenuExpanderUnique(buttonGroup);
          console.log('unique');
        }
      } else {
        // Destroy inactive workspaces
        this.destroy(workspace);
      }
    }
  }

  /**
   * 
   * @param {object} buttonGroup 
   */
  createMenuExpanderFull(buttonGroup) {
    let newExpander = this.createMenuExpanderCont(),
      expanderButton = buttonGroup.querySelector('[data-garden-id="buttons.icon_button"]');

    // if already open
    if (expanderButton.getAttribute('aria-expanded') === 'false') {
      expanderButton.click();

      setTimeout(() => {
        let workspace = buttonGroup.closest('.workspace'),
          dropdownLiList = this.getDropdownLis(workspace);

        for (let i = 0; i < dropdownLiList.length; i++) {
          const li = dropdownLiList[i];
          const newExpanderItem = this.getNewExpanderItem(li, buttonGroup);
          newExpander.appendChild(newExpanderItem);
        }

        buttonGroup.appendChild(newExpander);
        buttonGroup.classList.add('tlg-submit-expander');
        buttonGroup.dataset.tlgSubmitExpander = true;

        // Close
        if (expanderButton.getAttribute('aria-expanded') === 'true') {
          expanderButton.click();
        }
      }, 50);
    }
  }

  /**
   * 
   * @param {object} workspace
   * @returns 
   */
  getDropdownLis(workspace) {
    if (workspace) {
      let dropdown = workspace.querySelector('[data-garden-id="buttons.button_group_view"] [data-garden-id="dropdowns.menu"]');
      if (dropdown) {
        let liList = dropdown.querySelectorAll('li');
        return liList;
      }
    }
    return null;
  }

  /**
   * 
   * @param {object} li
   * @param {object} buttonGroup
   * @returns {object}
   */
  getNewExpanderItem(li, buttonGroup) {
    let dropdown = buttonGroup.querySelector('[data-garden-id="dropdowns.menu"]'),
      selectedItemText = '',
      classes = '',
      liHtmlNode = this.createElementFromHTML(li.innerHTML),
      spans = liHtmlNode.querySelectorAll('span'),
      label = li.innerText;

    let tooltipTextNode = this.createElementFromHTML(
      `<span class="tooltip-text">${label}</span>`
    );

    if (dropdown)
      selectedItemText = dropdown.innerText.trim().toLowerCase();

    this.addClassPrevAllElements(spans);

    liHtmlNode.appendChild(tooltipTextNode);

    if (liHtmlNode.innerText.trim().toLowerCase() === selectedItemText)
      classes = 'active';

    this.replaceTextElements(spans);
    return this.createMenuExpanderButton(li, classes, liHtmlNode);
  }

  /**
   * 
   * @param {object} elements
   */
  replaceTextElements(elements) {
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (this.lang === 'es') {
          element.innerHTML = element.innerHTML.replace('Enviar como', '');
        }
        element.innerHTML = element.innerHTML.replace('Submit as', '');
      }
    }
  }

  /**
   * 
   * @param {object} elements
   */
  addClassPrevAllElements(elements) {
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        const span = elements[i];
        let prevElements = this.prevAll(span, 'div');

        for (let i = 0; i < prevElements.length; i++) {
          const prevElement = prevElements[i];
          prevElement.classList.add('color-item');
        }
      }
    }
  }

  /**
   * 
   * @param {object} buttonGroup
   */
  createMenuExpanderUnique(buttonGroup) {
    let workspace = buttonGroup.closest('.ember-view.workspace');
    if (workspace && !this.isHidden(workspace)) {
      let label = workspace.querySelector('.ticket_status_label');

      if (label) {
        let newExpander = this.createMenuExpanderCont(),
          text = label.innerText.trim().toLowerCase().replace('-', ' '),
          type = label.className.split(' ')[0],
          liHtml = this.createUniqueLiNode(text, type),
          liHtmlNode = this.createElementFromHTML(liHtml);

        const newExpanderItem = this.getNewExpanderItem(liHtmlNode, buttonGroup);
        newExpander.appendChild(newExpanderItem);

        buttonGroup.appendChild(newExpander);
        buttonGroup.classList.add('tlg-submit-expander');
        buttonGroup.dataset.tlgSubmitExpander = true;
      }
    }
  }

  /**
   * 
   * @param {string} text 
   * @param {string} type 
   * @returns {string}
   */
  createUniqueLiNode(text, type) {
    return `
      <li>
        <div>
          <div tabindex="0" style="width: 100%;">
            <div class="flex">
              <div style="background-color: ${this.types[type]}"></div>
              <span class="space"> </span>
              <span><strong>${text}</strong></span>
            </div>
          </div>
        </div>
      </li>`;
  }

  /**
   * 
   * @param {object} element
   * @param {string} selector 
   * @returns {object[]}
   */
  prevAll(element, selector) {
    const prevElements = []
    let prevElement = element.parentNode.firstElementChild

    while (prevElement !== element && prevElement.matches(selector)) {
      prevElements.push(prevElement)
      prevElement = prevElement.nextElementSibling
    }

    return prevElements
  }

  /**
   * 
   * @param {string} htmlString 
   * @returns {object}
   */
  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  /**
   * 
   * @param {object} li 
   * @param {string[]} classes 
   * @param {object} insideNode 
   * @returns {object}
   */
  createMenuExpanderButton(li, classes, insideNode) {
    let element = document.createElement('button');
    if (classes.length) element.classList.add(classes);
    element.setAttribute('type', 'button');
    element.appendChild(insideNode);
    element.dataset.target = '#' + li.getAttribute('id');

    element.addEventListener('click', async (event) => {
      event.preventDefault();
      this.executeSubmit(event.target, this.replyTicketConfirmPopup);
    });
    return element;
  }

  createMenuExpanderCont() {
    let element = document.createElement('div');
    element.classList.add('tlg-new-button-expander');
    return element;
  }

  /**
   * 
   * @param {object} uniqueButton
   * @param {object} buttonGroup
   * @returns {boolean}
   */
  isValidCreateMenuExpanderUnique(uniqueButton, buttonGroup) {
    let uniqueButtonString = uniqueButton.innerText.trim().toLowerCase();
    if (uniqueButtonString.length) {
      if (buttonGroup.dataset.tlgSubmitExpander === undefined) {
        return true;
      }
    }
    return false;
  }

  /**
   * 
   * @param {object} expanderButton
   * @param {object} buttonGroup
   * @returns {boolean}
   */
  isValidCreateMenuExpanderFull(expanderButton, buttonGroup) {
    return expanderButton && !expanderButton.disabled && buttonGroup.dataset.tlgSubmitExpander === undefined;
  }

  /**
   * 
   * @param {object} buttonGroup
   * @returns {boolean}
   */
  isDestroyable(buttonGroup) {
    let newButton = buttonGroup.querySelector('.tlg-new-button-expander button');
    if (newButton) {
      let workspace = buttonGroup.closest('.ember-view.workspace');
      if (workspace && this.isHidden(workspace)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Return if html node is visible
   * @param {object} el
   * @returns {boolean}
   */
  isHidden(el) {
    return (el.offsetParent === null)
  }

  /**
   * 
   * @param {object} workspace
   */
  destroy(workspace) {
    let buttonExpander = workspace.querySelector('.tlg-new-button-expander');
    if (buttonExpander) buttonExpander.remove();

    let buttonGroup = workspace.querySelector('[data-test-id="ticket-footer"] div[data-garden-id="buttons.button_group_view"]');
    if (buttonGroup) {
      buttonGroup.classList.remove('tlg-submit-expander');
      delete buttonGroup.dataset.tlgSubmitExpander;
    }
  }

  /**
   * 
   * @param {object} target
   * @param {boolean} replyTicketConfirmPopup 
   */
  async executeSubmit(target, replyTicketConfirmPopup) {
    let findClickTarget = (target) => {
      let element = null;
      let dropdownMenus = document.querySelectorAll('[data-garden-id="dropdowns.menu"]');

      if (dropdownMenus) {
        for (let i = 0; i < dropdownMenus.length; i++) {
          const dropdownMenu = dropdownMenus[i];
          if (target.dataset.target) {
            element = dropdownMenu.querySelector(target.dataset.target);
          }
        }
      }

      if (!element) {
        let tlgSubmitExpander = target.closest('.tlg-submit-expander');
        if (tlgSubmitExpander) {
          element = tlgSubmitExpander.querySelector('[data-garden-id="buttons.button"]');
        }
      }

      return element;
    };
    let executeSubmitClick = (target) => {
      let tlgSubmitExpander = target.closest('.tlg-submit-expander');
      if (tlgSubmitExpander) {
        let expanderButton = tlgSubmitExpander.querySelector('[data-garden-id="buttons.icon_button"]');
        if (expanderButton) {
          expanderButton.click();

          setTimeout(() => {
            let workspace = target.closest('.ember-view.workspace');
            if (workspace) {
              let clickTarget = findClickTarget(target);

              if (clickTarget) {
                clickTarget.click();
              }
            }
          }, 100);
        }
      }
    };

    if (replyTicketConfirmPopup) {
      const dialog = new ConfirmDialog({
        trueButtonText: "Yes!",
        falseButtonText: "Noo",
        questionText: "Are you sure you want to continue? The answer you entered will be sent to the customer and can not be changed."
      });

      const shouldSubmit = await dialog.confirm();
      if (shouldSubmit) {
        executeSubmitClick(target);
      }
    } else {
      executeSubmitClick(target);
    }
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.coolTicketSubmit.actived) {
    const coolTicketSubmit = new CoolTicketSubmit('*', result.options.coolTicketSubmit.replyTicketConfirmPopup);
    observerZendesk.register(coolTicketSubmit);
  }
});