export default {
  replyTicketConfirmPopup: {
    show: false,
    priority: 301,
    category: 'zendesk',
    image: "",
    title: "",
    description: "",
    customCardContent: null,
    infoBlock: {

    },
  },
  ticketPriorityHighlightColors: {
    show: true,
    priority: 302,
    category: 'zendesk',
    image: chrome.extension.getURL('img/optionsData/ticketPriorityHighlightColors.jpg'),
    title: 'Zendesk tickets highlighting',
    description: 'Ressalta els tickets del zendesk per prioritats low, normal, high & urgent. Es poden triar els colors i que només es ressaltin els tickets de tipus "incident".',
    customCardContent: 'ContentTicketPriorityHighlightColors',
    infoBlock: {
      Environments: `ZENDESK_DOMAIN_BASE_URL`,
      Since: 'Mar 6, 2019',
    },
  },
  beyondTheme: {
    show: false,
    priority: 107,
    category: 'logicommerce',
    image: "",
    title: "",
    description: "",
    customCardContent: null,
    help: {

    },
  },
  background: {
    show: true,
    priority: 100,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/background.jpg'),
    title: "Logicommerce background",
    description: "Personalització del fons del Logicommerce amb la llibreria de fotos d'Unsplash.",
    customCardContent: 'ContentBackground',
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Aug 26, 2018',
    },
  },
  developerBar: {
    show: true,
    priority: 101,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/developerBar.jpg'),
    title: "Developer bar",
    description: "Afegeix una barra superior als Logicommerce amb el sistema de publicació de codi Opensaas i altres utils.",
    customCardContent: null,
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Oct 22, 2018',
    },
  },
  sandboxLoginButtons: {
    show: true,
    priority: 102,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/sandboxLoginButtons.jpg'),
    title: "Sandbox login buttons",
    description: "En el login d'un client d'un Logicommerce amb el sistema de publicació de codi Opensaas, apareix un selector d'entorn, aquetsa opció ho transforma en <buttons> per accedir-hi mes ràpid.",
    customCardContent: null,
    infoBlock: {
      Environments: `*://8x-os.logicommerce.net/login/*, *://8x.logicommerce.net/login/*`,
      Since: 'Feb 1, 2019',
    },
  },
  pagesWindowBetter: {
    show: true,
    priority: 103,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/pagesWindowBetter.jpg'),
    title: "Pages window better",
    description: "Millores de la finestra de págines, com vista en grid, headers colors tags i icones, i nivells més clars.",
    customCardContent: 'ContentPagesWindowBetter',
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Aug 26, 2018',
    },
  },
  bigControlInputs: {
    show: true,
    priority: 105,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/bigControlInputs.jpg'),
    title: "Big control inputs",
    description: "Tots els inputs checkbox, radiobuttons i switches es fan més grans per no haver de fer mouse snipper",
    customCardContent: null,
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Aug 28, 2018',
    },
  },
  themeColors: {
    show: false,
    priority: 104,
    category: 'logicommerce',
    image: "",
    title: "",
    description: "",
    customCardContent: null,
    help: {

    },
  },
  autoForceView: {
    show: true,
    priority: 200,
    category: 'fluidWebTools',
    image: chrome.extension.getURL('img/optionsData/autoForceView.jpg'),
    title: "Automatic force view",
    description: "Al entrar sempre al entorn de producció d'una botiga sense domini es recarrega amb el ?forceview=1 automàticament.",
    customCardContent: null,
    infoBlock: {
      Environments: `*://*.logicommerce.net/*, *://*.logicommerce.hk/*, *://*.logicommerce.cn/*, *://*.igd.production/*, *://*.igd.pre.production/*`,
      ExcludeEnvironments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*`,
      Since: 'Aug 26, 2018',
    },
  },
  flushRedisIgdDomain: {
    show: true,
    priority: 201,
    category: 'fluidWebTools',
    image: chrome.extension.getURL('img/optionsData/flushRedisIgdDomain.jpg'),
    title: "Flush redis button (.igd.production)",
    description: "Als entorns locals .igd.production, s'afegeix un shortcut per poder netejar la cache de redis.",
    customCardContent: null,
    infoBlock: {
      Environments: `*://*.igd.production/*`,
      ExcludeEnvironments: `*://adm.igd.production/*, *://fluiddoc.igd.production/*, *://management.igd.production/*, *://tlgcommerce-hk.igd.production/*`,
      Since: 'Dec 12, 2018',
    },
  },
  dumpAutoScroll: {
    show: true,
    priority: 202,
    category: 'fluidWebTools',
    image: chrome.extension.getURL('img/optionsData/dumpAutoScroll.jpg'),
    title: "Auto scroll to dumps",
    description: "Automàticament la web fa scroll al dump i el deixa clarament visible, en entorns de development.",
    customCardContent: null,
    infoBlock: {
      Environments: `*://*.sandbox.logicommerce.net/*, *://*.igd.production/*`,
      Since: 'Apr 18, 2019',
    },
  },
  getFontWesomeIcons: {
    show: true,
    priority: 400,
    category: 'others',
    image: chrome.extension.getURL('img/optionsData/getFontWesomeIcons.jpg'),
    title: "Download FontWesome icons",
    description: "Descarrega cualsevol icona de FontWesome, tant els normals com els PRO, en format svg, use i svg en css. També et permet guardar en un fitxer.",
    customCardContent: null,
    infoBlock: {
      Environments: `*://fontawesome.com/*`,
      Since: 'Aug 26, 2018',
    },
  },
};
