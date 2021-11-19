/**
 * @file 
 * @author joelthorner
 */
'use strict';

class DevTrackers extends Modifier {

  constructor(selector) {
    super(selector);
  }

  _match() {
    let textarea = this.node.querySelector('textarea[name="trackingCode"]');
    if (textarea) {
      let divId = `editor-devTracker_${new Date().getTime()}`;
      let div = document.createElement("div");
      div.id = divId;

      let textareaId = `textarea-devTracker_${new Date().getTime()}`;
      textarea.id = textareaId;

      this.insertAfter(div, textarea);

      let script = document.createElement("script");
      script.innerHTML = `
        if (ace) {
          var textarea = document.getElementById('${textareaId}');
          if (textarea) {
            textarea.classList.add('textarea-devTracker')

            var editor = ace.edit('${divId}');
            editor.session.setMode("ace/mode/html");
            editor.getSession().setValue(textarea.value);
            editor.getSession().on('change', () => {
              textarea.value = editor.getSession().getValue();
            });
          }
        }
      `;
      document.head.appendChild(script);

      let newEditor = this.node.querySelector('.ace_editor');
      if (newEditor) {
        newEditor.style.height = '160px';
      }
    }
  }

  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}

var devTrackers = new DevTrackers('.wizardContent');
observerLC.register(devTrackers);