/**
 * @file Run a script that launches FTP steup Logicommerce window and set password visible
 * @author joelthorner
 */
'use strict';

var script = document.createElement("script");

script.innerHTML = `
  openFTPSetup();

  var psswdInput = document.querySelector('[name="ftpPassword"]');
  var si = setInterval(() => {
    psswdInput = document.querySelector('[name="ftpPassword"]');
    if (psswdInput) {
      clearInterval(si);
      psswdInput.setAttribute('type', 'text');
    }
  }, 100);
`;

document.head.appendChild(script);
