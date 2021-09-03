/**
 * @file Define the ReplyTicketConfirmPopup class, initialize it and register it in the observerZendesk
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new ReplyTicketConfirmPopup
 * @class
 */
class ReplyTicketConfirmPopup extends Modifier {

  types = {
		new: '#ffb648',
		open: '#e34f32',
		pending: '#3091ec',
		on_hold: '#2f3941',
		hold: '#2f3941', // same hold, duplicated performance
		solved: '#87929d'
	}

  /**
   * Create a ReplyTicketConfirmPopup.
   * @param {string} selector
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * On finded changed nodes, up to tbody and update all tbody <tr> rows
   */
  _match() {
    document.body.classList.add('replyTicketConfirmPopup');

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

  initElement(buttonGroup) {
    let workspace = buttonGroup.closest('.ember-view.workspace');

    if (this.isDestroyable(buttonGroup)) {
      if (workspace && this.isHidden(workspace)) {
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
      }
    } else {
      // Destroy inactive workspaces
      this.destroy(workspace);
    }
  }

  createMenuExpanderFull(buttonGroup) {
    let newExpander = this.createMenuExpanderCont(),
      expanderButton = buttonGroup.querySelector('[data-garden-id="buttons.icon_button"]');

    // if already open
    if (expanderButton.getAttribute('aria-expanded') === 'false') {
      expanderButton.click();

      setTimeout(() => {
        let workspace = buttonGroup.closest('.workspace'),
          dropdownLiList = this.getDropdownLis(workspace);
          // console.log(workspace.querySelector('[data-garden-id="buttons.button_group_view"] [data-garden-id="dropdowns.menu"]'));

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

  getNewExpanderItem(li, buttonGroup) {
    let dropdown = buttonGroup.querySelector('[data-garden-id="dropdowns.menu"]'),
      selectedItemText = '',
      classes = '',
      liHtmlNode = this.createElementFromHTML(li.innerHTML),
      spans = liHtmlNode.querySelectorAll('span'),
      label = li.innerText,
      tooltipTextNode = this.createElementFromHTML(
        `<span class="tooltip-text">Submit as ${label}</span>`
      );;

    if (dropdown)
      selectedItemText = dropdown.innerText.trim().toLowerCase();

    this.addClassPrevAllElements(spans);

    liHtmlNode.appendChild(tooltipTextNode);

    if (liHtmlNode.innerText.trim().toLowerCase() === selectedItemText)
      classes = 'active';

    this.replaceTextElements(spans);
    return this.createMenuExpanderButton(li, classes, liHtmlNode);
  }

  replaceTextElements(elements) {
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.innerHTML = element.innerHTML.replace('Submit as', '');
      }
    }
  }

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

  createMenuExpanderUnique(buttonGroup) {
    // TODO

  }

  prevAll(element, selector) {
    const prevElements = []
    let prevElement = element.parentNode.firstElementChild

    while (prevElement !== element && prevElement.matches(selector)) {
      prevElements.push(prevElement)
      prevElement = prevElement.nextElementSibling
    }

    return prevElements
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  createMenuExpanderButton(li, classes, insideNode) {
    let element = document.createElement('button');
    if (classes.length) element.classList.add(classes);
    element.setAttribute('type', 'button');
    element.appendChild(insideNode);
    element.dataset.target = '#' + li.getAttribute('id');
    return element;
  }

  createMenuExpanderCont() {
    let element = document.createElement('div');
    element.classList.add('tlg-new-button-expander');
    return element;
  }

  isValidCreateMenuExpanderUnique(uniqueButton, buttonGroup) {
    let uniqueButtonString = uniqueButton.innerText.trim().toLowerCase();
    if (uniqueButtonString.length && uniqueButtonString !== 'submit as') {
      if (buttonGroup.dataset.tlgSubmitExpander === undefined) {
        return true;
      }
    }
    return false;
  }

  isValidCreateMenuExpanderFull(expanderButton, buttonGroup) {
    return expanderButton && !expanderButton.disabled && buttonGroup.dataset.tlgSubmitExpander === undefined;
  }

  isDestroyable(buttonGroup) {
    let newButton = buttonGroup.querySelector('.tlg-new-button-expander button');
    if (newButton && newButton.innerText.replace('Submit as', '').trim().length === 0) {
      let workspace = buttonGroup.closest('.ember-view.workspace');
      if (workspace && this.isHidden(workspace)) {
        return true;
      }
    }
    return false;
  }

  isHidden(el) {
    return (el.offsetParent === null)
  }

  destroy(workspace) {
    let buttonExpander = workspace.querySelector('.tlg-new-button-expander');
    if (buttonExpander) buttonExpander.remove();

    let buttonGroup = workspace.querySelector('[data-test-id="ticket-footer"] div[data-garden-id="buttons.button_group_view"]');
    if (buttonGroup) {
      buttonGroup.classList.remove('tlg-submit-expander');
      delete buttonGroup.dataset.tlgSubmitExpander;
    }
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.replyTicketConfirmPopup.actived) {
    const replyTicketConfirmPopup = new ReplyTicketConfirmPopup('*');
    observerZendesk.register(replyTicketConfirmPopup);
  }
});