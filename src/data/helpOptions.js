export default {
  developerBar: {
    title: 'Developer bar',
    content: `
      <p>Afegeix una barra superior als Logicommerce amb el sistema de publicació de codi Opensaas.</p>
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/developerBar-1.jpg")}">
      <p>
        En l'entorn de PRE es mostra una barra amb els <b>botons de utils d'opensaas i un buscador juntament amb shortcuts a pagines, banners, etiquetes i seccions</b>.
        En aquest entorn el botó de fluish te una funcionalitat que amaga i cofnirma automaticament les finestres de confimació per optimitzar el temps de desenvolupament.
      </p>
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/developerBar-2.jpg")}">
      <p>En l'entorn a real es identic nomes que els utils són els de <b>merge i publicar codi</b>.</p>`,
  },
  sandboxLoginButtons: {
    title: 'Sandbox login buttons',
    content: `
      <a href="${chrome.runtime.getURL("img/help/sandboxButtons.jpg")}" target="_blank">
        <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/sandboxButtons.jpg")}">
      </a>
      <p>En el login d'un client d'un Logicommerce amb el sistema de publicació de codi Opensaas, apareix un selector d'entorn, aquetsa opció ho transforma en <buttons> per accedir-hi mes ràpid.</p>`,
  },
  bigControlInputs: {
    title: 'Big control inputs',
    content: `
      Tots els inputs checkbox, radiobuttons i switches es fan més grans per usabilitat. Útil en tasques repetitives d'emplenament d'informació.
      <br><br><b>Abans</b>:
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/bigControlInputs-1.jpg")}">
      <b>Desprès</b>:
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/bigControlInputs-2.jpg")}">
    `,
  },
  pagesWindowBetter: {
    title: 'Pages window better',
    content: `
      Dins de la millora de la finestra de pàgines de Logicommerce, tenim 3 opcions, totes combinables entre elles o alhora:
      <br><br><b>Grid view</b>, que disposa tots els grups de pàgines en graella:
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/pagesWindowBetter-gridView.jpg")}">
      <br><br><b>Better group headers.</b><br>
      Quan al nom del grup s'afegeix [Lorem] Aquest text es converteix en un badge. Depenent de la paraula, 'home', 'menu', 'header', 'footer', etc. canviarà de color.<br>
      Si en qualsevol lloc del nom del grup de pàgines hi ha el text 'mobile' o 'desktop' canviarà la icona del principi.
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/pagesWindowBetter-bgh.jpg")}">
      <br><br><b>Better tree pages indentation</b><br>
      Augmenta la indentació els diferents nivells de pàgines i afegeix una icona amb el nivell de subpàgines.<br>
      També marca amb una icona diferent les pàgines desactivades.
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/pagesWindowBetter-btpi.jpg")}">
    `,
  },
  beyondTheme: {
    title: '',
    content: ``,
  },
  lcBackground: {
    title: 'Logicommerce background',
    content: `
      Personalització del fons del Logicommerce, es pot triar qualsevol foto buscant en l'enorme llibreria d'Unsplash.<br><br>
      <img class="img-thumbnail" src="${chrome.runtime.getURL("img/help/lcBackground.jpg")}">
    `,
  },
  autoForceView: {
    title: "Pages grid view",
    content: "lorem ipsum",
  },
  flushRedisIgdDomain: {
    title: "lorem",
    content: "lorem ipsum",
  },
  dumpAutoScroll: {
    title: "lorem",
    content: "lorem ipsum",
  },
  getFontWesomeIcons: {
    title: "Pages grid view",
    content: "lorem ipsum",
  },
  coolTicketSubmit: {
    title: "Pages grid view",
    content: "lorem ipsum",
  },
  ticketPriorityHighlightColors: {
    title: "Pages grid view",
    content: "lorem ipsum",
  },
};
