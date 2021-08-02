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
class ShowModulesTemplate2018 {

  /**
   * HTML nodes to iterate
   * @type {HTMLElement}
   */
  elements = null;

  /**
   * z-index of each module that is being decremented.
   * @type {number}
   */
  zIndex = 100000;

  /**
   * Create a showModulesTemplate2018.
   */
  constructor(elements) {
    this.elements = elements;

    if (this.elements) {
      for (let i = 0; i < this.elements.length; i++) {
        const element = this.elements[i];
        if (this._isValidModule(element)) {
          this._addModuleMarkup(element)
        }
      }
    }
  }

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
  }

  /**
   * Returns class with a position css value
   * @param {object} element 
   * @returns {string}
   */
  getModuloPositionClass(element) {
    const styles = document.defaultView.getComputedStyle(element);
    return `showModulesTemplate2018_module-${styles.position}`
  }

  /**
   * Append calculated module markup styles
   * @param {string} className 
   * @param {object} positions 
   */
  _insertMarkupStyles(className, positions) {
    let style = `
      <style>
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
  }

  /**
   * Returns element cardinal margins
   * @param {object} element 
   * @returns {object}
   */
  _getElementPositions(element) {
    const nextElement = element.nextElementSibling;

    let bottom = 0, top = 0;

    if (nextElement && nextElement.matches('[data-module]')) {
      const styles = document.defaultView.getComputedStyle(nextElement);
      const marginTop = parseFloat(styles['margin-top']);
      if (marginTop < 0) {
        bottom = marginTop * -1;
      }
    }

    if (element.matches('.block-full-width')) {
      const styles = document.defaultView.getComputedStyle(element);
      const marginTop = parseFloat(styles['margin-top']);

      if (marginTop < 0) {
        top = marginTop * -1;
      }
    }

    return {
      top,
      right: 0,
      bottom,
      left: 0,
    }
  }

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
  }

  /**
   * Returns if module is valid for display markup
   * @returns {boolean}
   */
  _isValidModule(element) {
    return element.dataset && element.dataset.module ? true : false;
  }

  /**
   * Return all markup module elements
   * @param {object} element 
   * @returns {object[]}
   */
  _getMarkupElementsObj(element) {
    const prefix = 'showModulesTemplate2018_module_';

    return [
      {
        classList: [prefix + 'line', prefix + 'line-top'],
        text: '',
      },
      {
        classList: [prefix + 'line', prefix + 'line-right'],
        text: '',
      },
      {
        classList: [prefix + 'line', prefix + 'line-bottom'],
        text: '',
      },
      {
        classList: [prefix + 'line', prefix + 'line-left'],
        text: '',
      },
      {
        classList: [prefix + 'name', prefix + 'name-top-left'],
        text: element.dataset.module,
      },
      {
        classList: [prefix + 'name', prefix + 'name-top-right'],
        text: element.dataset.module,
      },
    ];
  }

  /**
   * Create a unique class
   * @returns {string}
   */
  generateUidClass() {
    return 'showModulesTemplate2018_module_' + Math.floor(Math.random() * 100000000);
  }
}

let showModulesTemplate2018 = new ShowModulesTemplate2018(document.querySelectorAll('[data-module]'));