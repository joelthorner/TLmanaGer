export default [
  {
    id: 5,
    name: 'TLmanaGer 3 is out!',
    content: `Nova versió en Vue.js feta de zero i redissenyada totalment. Tota la part del backend i popup estan fets en Vue i la resta de scripting en vanilla js pur. Nova estructura de dades que tot i trencar amb la versió 2x i 1x permet escalar de cara al futur.`,
    date: '01-30-2021',
    img: chrome.extension.getURL('img/posts/new3x.png'),
    tags: ['releases', 'v3'],
  },
  {
    id: 4,
    name: 'Enllaços a tickets dins de LC',
    content: `Durant el sistema de publicació normalment es poden trobar referències a tickets o a issues del Jira. S'ha desenvolupat un sistema per detectar aquestes referències i convertir-les en enllaços a pestanyes noves. Això permet anar més ràpid a consultar a què fa referència el commit/merge/publicació. El sistema busca en tot el procés de publicació i entorns de LC.`,
    date: '12-22-2020',
    img: chrome.extension.getURL('img/posts/ticketRefLinks.png'),
    tags: ['features', 'v3'],
  },
  {
    id: 3,
    name: 'New LC themes!',
    content: `El primer dels temes per al nou Logicommerce ja està disponible. Es pot canviar a la página d\'opcions/Logicommerce`,
    date: '08-12-2020',
    img: chrome.extension.getURL('img/posts/theme.png'),
    tags: ['features', 'v3'],
  },
  {
    id: 2,
    name: 'Achievements!!',
    content: `Arriben els "logros" totalment inútils però programar-los es divertit (i si tens toc, completar-los tambè). Per no perdre'ls mai al eliminar/reinstalar la extensió, a Chrome cal afegir un compte de Google i activar la sincronització.`,
    date: '08-12-2020',
    img: chrome.extension.getURL('img/posts/arch.png'),
    tags: ['features', 'v3'],
  },
  {
    id: 1,
    name: 'New TLmanaGer 2!',
    content: `TLmanaGer reprogramat amb Bootstrap 4.1 i jQuery. La cosa va començar petita pero es va fotre tan gros que no era mantenible ni escalable xD`,
    date: '08-26-2018',
    img: chrome.extension.getURL('img/posts/new2x.png'),
    tags: ['releases', 'v2'],
  },
];
