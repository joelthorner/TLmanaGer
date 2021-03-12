export default {
  replyTicketConfirmPopup: {
    priority: 301,
    category: 'zendesk',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
  ticketPriorityHighlightColors: {
    priority: 302,
    category: 'zendesk',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
  beyondTheme: {
    priority: 107,
    category: 'logicommerce',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
  background: {
    priority: 100,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/background.jpg'),
    title: "Logicommerce background",
    description: "Personalització del fons del Logicommerce amb la llibreria de fotos d'Unsplash.",
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Aug 26, 2018',
    },
  },
  developerBar: {
    priority: 101,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/developerBar.jpg'),
    title: "Developer bar",
    description: "Afegeix una barra superior als Logicommerce amb el sistema de publicació de codi Opensaas i altres utils.",
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Oct 22, 2018',
    },
  },
  sandboxLoginButtons: {
    priority: 102,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/sandboxLoginButtons.jpg'),
    title: "Sandbox login buttons",
    description: "En el login d'un client d'un Logicommerce amb el sistema de publicació de codi Opensaas, apareix un selector d'entorn, aquetsa opció ho transforma en <buttons> per accedir-hi mes ràpid.",
    infoBlock: {
      Environments: `*://8x-os.logicommerce.net/login/*, *://8x.logicommerce.net/login/*`,
      Since: 'Feb 1, 2019',
    },
  },
  pagesWindowBetter: {
    priority: 103,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/pagesWindowBetter.jpg'),
    title: "Pages window better",
    description: "Millores de la finestra de págines, com vista en grid, headers colors tags i icones, i nivells més clars.",
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Aug 26, 2018',
    },
  },
  bigControlInputs: {
    priority: 105,
    category: 'logicommerce',
    image: chrome.extension.getURL('img/optionsData/bigControlInputs.jpg'),
    title: "Big control inputs",
    description: "Tots els inputs checkbox, radiobuttons i switches es fan més grans per no haver de fer mouse snipper",
    infoBlock: {
      Environments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*, *://adm.igd.production/*, *://adm.igd.pre.production/*`,
      Since: 'Aug 28, 2018',
    },
  },
  themeColors: {
    priority: 104,
    category: 'logicommerce',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
  autoForceView: {
    priority: 200,
    category: 'fluidWebTools',
    image: chrome.extension.getURL('img/optionsData/autoForceView.jpg'),
    title: "Automatic force view",
    description: "Al entrar sempre al entorn de producció d'una botiga sense domini es recarrega amb el ?forceview=1 automàticament.",
    infoBlock: {
      Environments: `*://*.logicommerce.net/*, *://*.logicommerce.hk/*, *://*.logicommerce.cn/*, *://*.igd.production/*, *://*.igd.pre.production/*`,
      ExcludeEnvironments: `*://8x-hk.logicommerce.net/*, *://8x-os.logicommerce.net/*, *://8x.logicommerce.net/*, *://8x.logicommerce.cn/*`,
      Since: 'Aug 28, 2018',
    },
  },
  flushRedisIgdDomain: {
    priority: 201,
    category: 'fluidWebTools',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
  dumpAutoScroll: {
    priority: 202,
    category: 'fluidWebTools',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
  getFontWesomeIcons: {
    priority: 400,
    category: 'others',
    image: "",
    title: "",
    description: "",
    help: {

    },
  },
};
