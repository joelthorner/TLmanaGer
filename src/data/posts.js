export default [
  {
    id: 8,
    name: 'TLmanaGer 3.0.0 is out!',
    content: `
      Verge santa, ha passat molt temps desde les últimes updates, que nomes eren basicament petits bug fixes.<br><br>
      Molt resumit, nova extensió al 100%.<br>
      S'ha fet tot nou, sense cap plugin, js vanilla. El popup i la página d'opcions esta feta en Bootstrap 5 i vue.js.<br>
      Hi han multitut de features i canvis, i també se n'han eliminat d'altres.<br>
      Per veure una llista mes completa de tots els canvis aconsello mirar el changelog, on ja s'ha intentat resumir al maxim i deixar
      la jerga tècnica.<br> Tambè a partir d'ara totes les noves features s'anunciaràn adicionalment aquí al blog.<br><br>
      Salut!
    `,
    date: '01-30-2021',
    img: chrome.extension.getURL('img/posts/new3x.png'),
    tags: ['releases', 'v3'],
  },
  {
    id: 7,
    name: 'Enllaços a tickets dins de LC',
    content: `
      Durant el sistema de publicació normalment es poden trobar referències a tickets de Zendesk o a issues del Jira.<br>
      Per millorar la tasca d'haver d'anar a mirar el ticket o la issue al lloc corresponent, s'ha desenvolupat un sistema per detectar aquestes referències 
      i convertir-les en enllaços a pestanyes noves.<br><br>
      Això permet anar més ràpid a consultar a què fa referència el commit, el merge o la publicació.<br>
      El sistema busca en tots els llocs on podem veure commits, les branques o les publicacións i els seus històrics.`,
    date: '12-22-2020',
    img: chrome.extension.getURL('img/posts/ticketRefLinks.png'),
    tags: ['features', 'v3'],
  },
  // {
  //   id: 6,
  //   name: 'New LC themes!',
  //   content: `El primer dels temes per al nou Logicommerce ja està disponible. Es pot canviar a la página d\'opcions/Logicommerce`,
  //   date: '08-12-2020',
  //   img: chrome.extension.getURL('img/posts/theme.png'),
  //   tags: ['features', 'v3'],
  // },
  {
    id: 5,
    name: 'Achievements!!',
    content: `
      Una de les grans noves features de la versió 3.0.0 son els "logros".<br>
      No serveixen realment per res a part d'obligar-te a perdre una mica el temps.<br>
      La versió 3.0.0 sortirá amb alguns achievements peró no es descarta en un futur afegir-ne més.<br><br>
      Per no perdre'ls mai al eliminar/reinstalar la extensió, pots sincronitzar el Chrome amb un compte gmail i activar la sincronització per a
      que es guardin per sempre no sols els "logros" sino tambè totes les opcions que haguis modificat.
    `,
    date: '08-12-2020',
    img: chrome.extension.getURL('img/posts/arch.png'),
    tags: ['features', 'v3'],
  },
  {
    id: 4,
    name: 'Auto increment de versió (publicació opensaas) 2.3.6',
    content: `
      Estàs cansat de fer publicacions a producció?<br>
      Cada vegada has de mirar quina es l'última versió per escriure la que toca?<br>
      T'has equivocat i t'has saltat 3 números i despres no cuadra i tens TOC?<br><br>
      Ja tenim solució! Nova feature que, automàticament, al fer una nova publicació buscarà l'ùltima versió i et predirà la que toca!<br>
      Preocupat nomes de donar-li un nom que sigui comprensible pels altres humans!<br><br>
      <h6>Altres features</h6>
      Altres funcions agregades recentment:
      <ul>
        <li>Highlight de tickets per prioritat al Zendesk</li>
        <li>Nova página de welcome al instalar l'extensió amb un mini wizard</li>
        <li>Auto scroll al primer dump de fluid</li>
      </ul>
    `,
    date: '15-04-2019',
    img: chrome.extension.getURL('img/posts/ver.png'),
    tags: ['features', 'releases', 'v2'],
  },
  {
    id: 3,
    name: 'Rediseny de la página de configuració 2.3.0',
    content: `
      Hi han novetats, (això es com un diari de desarrollament).<br>
      S'ha redissenyat tota la pàgina "backend" de l'extensió amb un nou look com el de la foto. Una mica mes ordenat, i per grups.<br><br>
      <h6>Noves features</h6>
      Tambe s'han implementat ultimament algunes funcions noves, algunes a destacar:<br>
      <ul>
        <li>Registre automàtic en fluid (acció del popup)</li>
        <li>Mostrar icones svg de tota la web (acció del popup)</li>
        <li>Popup de confirmació al enviar un missatge desde Zendesk</li>
      </ul>
    `,
    date: '17-02-2019',
    img: chrome.extension.getURL('img/posts/optsred.png'),
    tags: ['features', 'releases', 'v2'],
  },
  {
    id: 2,
    name: 'Sistema de selecció de branques (Opensaas)',
    content: `
      Amb l'arribada de l'opensaas per millorar la usabilitat i la rapidesa alhora d'escollir la branca o entorn al que volem anar, s'ha afegit una millora.<br>
      Aquesta millora es pot activar o desactivar desde la pàgina de configuració d'opcions.<br><br>
      Per cada branca del selector html, es crea un botó, que per defecte té seleccionat el primer entorn, el de PRE. Si es fa doble click a algun dels botóns automàticament
      es farà login al botó clicat.<br><br>
      Això es tot, fin del comunicado.
    `,
    date: '08-02-2019',
    img: chrome.extension.getURL('img/posts/opsas.png'),
    tags: ['features', 'v2'],
  },
  {
    id: 1,
    name: 'Nou TLmanaGer 2.0.0!',
    content: `
      Desde que es va implementar la versió 1 de la extensió, aquesta ha anat creixent en funcions a base de peticions i ha arribat al moment que no era mantenible.<br>
      S'ha fet una versió totalment desde zero amb el framework Bootstrap 4.1 i jQuery 3 i amb una logica mes estructurada i un codi mes net i eficient.<br>
      La primera versió no estava pensada per arribar a creixer tant, la nova versió permetrà que escali molt mes al llarg del temps.<br><br>
      <h6>Pàgina d'opcions</h6>
      S'ha desenvolupat tambè una pàgina amb opcions de tot el que fa l'extensió per poder activar/desactivar i configurar algunes opcions. Una pagina sencera dedicada
      a poder ajustar totes les funcions.<br>
      Al menù de la pàgina d'opcions tambè es pot trobar accès al changelog, una pàgina per editar el perfil i una pàgina d'ajuda on s'expliquen les diferents features de 
      l'extensió.<br><br>
      <h6>Features</h6>
      Hi han algunes funcions noves a destacar, com una acció per mostrar els moduls de una plantilla (new template 2018), l'acció de guies per maquetar ara es guarden en sessió, 
      es pot triar el background de LC i desactivar-lo si es vol, etc.
    `,
    date: '08-26-2018',
    img: chrome.extension.getURL('img/posts/new2x.png'),
    tags: ['releases', 'v2'],
  },
];
