/**
 * @file Define ShowModulesTemplate2018 class and execute script
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new ShowModulesTemplate2018
 * @class
 * @classdesc Display all template modules with borders and name of module.
 */
var ShowModulesTemplate2018 = {

  /**
   * HTML nodes to iterate
   * @type {HTMLElement}
   */
  elements: null,

  /**
   * z-index of each module that is being decremented.
   * @type {number}
   */
  zIndex: 100000,

  /**
   * Indicates if ShowModulesTemplate2018 system is already initialized
   * @type {HTMLElement|null}
   */
  alreadyShowing: null,

  /**
   * Create a showModulesTemplate2018.
   */
  constructor(elements) {
    this.elements = elements;
    this.alreadyShowing = document.querySelectorAll('.showModulesTemplate2018_module');

    if (this.elements && !this.alreadyShowing.length) {
      this._initElements();
    } else if (this.alreadyShowing) {
      this._cleanElements();
    }
  },

  /**
   * Destroy modules markup
   */
  _cleanElements() {
    for (let i = 0; i < this.alreadyShowing.length; i++) {
      const element = this.alreadyShowing[i];
      this._clean(element)
    }
  },

  /**
   * Initialize modules markup
   */
  _initElements() {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      if (this._isValidModule(element)) {
        this._addModuleMarkup(element)
      }
    }
  },

  /**
   * Add HTML structure for display module limits and her name
   * @param {object} element 
   */
  _addModuleMarkup(element) {
    const elementClass = this.generateUidClass();
    const positionClass = this.getModuloPositionClass(element);

    element.classList.add('showModulesTemplate2018_module');
    element.classList.add(elementClass);
    element.classList.add(positionClass);

    const markupElements = this._getMarkupElementsObj(element);

    for (let i = 0; i < markupElements.length; i++) {
      const markupElement = markupElements[i];
      let node = this._createNode('span', markupElement.classList, markupElement.text);
      element.appendChild(node);
    }

    const positions = this._getElementPositions(element);
    this._insertMarkupStyles(elementClass, positions);

    this.zIndex--;
  },

  /**
   * Returns class with a position css value
   * @param {object} element 
   * @returns {string}
   */
  getModuloPositionClass(element) {
    const styles = document.defaultView.getComputedStyle(element);
    return `showModulesTemplate2018_module-${styles.position}`
  },

  /**
   * Append calculated module markup styles
   * @param {string} className 
   * @param {object} positions 
   */
  _insertMarkupStyles(className, positions) {
    let style = `
      <style class="showModulesTemplate2018_module_style">
        .${className} {
          --top: ${positions.top}px;
          --left: ${positions.left}px;
          --right: ${positions.right}px;
          --bottom: ${positions.bottom}px;
          --zIndex: ${this.zIndex};
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', style);
  },

  /**
   * Returns element cardinal margins
   * @param {object} element 
   * @returns {object}
   */
  _getElementPositions(element) {
    let bottom = this._getElementPositionBottom(element),
      top = this._getElementPositionTop(element);

    return {
      top,
      right: 0,
      bottom,
      left: 0,
    }
  },

  /**
   * Return element position bottom
   * @param {object} element 
   * @returns {number}
   */
  _getElementPositionBottom(element) {
    const nextElement = element.nextElementSibling;

    if (nextElement && nextElement.matches('[data-module]')) {
      const styles = document.defaultView.getComputedStyle(nextElement);
      const marginTop = parseFloat(styles['margin-top']);

      if (marginTop < 0) {
        return marginTop * -1;
      }
    }

    return 0;
  },

  /**
   * Return element position top
   * @param {object} element 
   * @returns {number}
   */
  _getElementPositionTop(element) {
    if (element.matches('.block-full-width')) {
      const styles = document.defaultView.getComputedStyle(element);
      const marginTop = parseFloat(styles['margin-top']);

      if (marginTop < 0) {
        return marginTop * -1;
      }
    }

    return 0;
  },


  /**
   * Create an HTML node
   * @param {string} elementType 
   * @param {string[]} classList 
   * @param {string} text 
   * @returns {HTMLElement}
   */
  _createNode(elementType, classList, text) {
    let node = document.createElement(elementType);
    for (let i = 0; i < classList.length; i++) {
      const classEl = classList[i];
      node.classList.add(classEl);
    }
    let textNode = document.createTextNode(text);
    node.appendChild(textNode);
    return node;
  },

  /**
   * Returns if module is valid for display markup
   * @returns {boolean}
   */
  _isValidModule(element) {
    return element.dataset && element.dataset.module ? true : false;
  },

  /**
   * Return all markup module elements
   * @param {object} element 
   * @returns {object[]}
   */
  _getMarkupElementsObj(element) {
    const prefix = 'showModulesTemplate2018_module_';

    return [{
      classList: [prefix + 'line', prefix + 'line-top'],
      text: '',
    }, {
      classList: [prefix + 'line', prefix + 'line-right'],
      text: '',
    }, {
      classList: [prefix + 'line', prefix + 'line-bottom'],
      text: '',
    }, {
      classList: [prefix + 'line', prefix + 'line-left'],
      text: '',
    }, {
      classList: [prefix + 'name', prefix + 'name-top-left'],
      text: element.dataset.module,
    }, {
      classList: [prefix + 'name', prefix + 'name-top-right'],
      text: element.dataset.module,
    }];
  },

  /**
   * Create a unique class
   * @returns {string}
   */
  generateUidClass() {
    return 'showModulesTemplate2018_module_' + Math.floor(Math.random() * 100000000);
  },

  /**
   * Clean all ShowModulesTemplate2018 system of module
   * @param {object} element 
   */
  _clean(element) {
    let elements = element
      .querySelectorAll(
        '.showModulesTemplate2018_module_line, .showModulesTemplate2018_module_name, .showModulesTemplate2018_module_style'
      );

    if (elements) {
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.remove();
      }
    }

    element.className = element.className.replace(/(?:^|\s)showModulesTemplate2018_module(_[0-9]{1,}|\-[a-z]{3,})?/, '');
  },
}

ShowModulesTemplate2018.constructor(document.querySelectorAll('[data-module]'));