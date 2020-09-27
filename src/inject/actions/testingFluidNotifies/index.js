/**
 * @file Run a script that launches static Fluid notifications
 * @author joelthorner
 */
'use strict';

var script = document.createElement("script");

script.innerHTML = `
  Fluid.notify('Lorem ispum dolor sit amet', {
    type: 'danger',
    sticky: true
  });
  Fluid.notify('Lorem ispum dolor sit amet', {
    type: 'success',
    sticky: true
  });
`;

document.head.appendChild(script);
