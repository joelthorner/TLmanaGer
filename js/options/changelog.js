const CHANGELOG = [
	{
		version: 'v2.5.2', date: '05 Jan 2021',
		lines: [
			'CHANGED Remove chrome unused permissions',
		]
	}, {
		version: 'v2.5.1', date: '04 Dec 2020',
		lines: [
			'NEW New "get FontWesome icon", vanilla js script, beta from 3.x, with new features and fix #214',
		]
	}, {
		version: 'v2.5.0', date: '09 Nov 2019',
		lines: [
			'CHANGED Update dependencies sweetalert2, popper js and node snackbar',
			'FIXED Hot fix - Zendesk submit button expander prevent input focus #208',
		]
	}, {
		version: 'v2.4.0', date: '12 Oct 2019',
		lines: [
			'CHANGED Update dependencies sweetalert2 and hotkeys-js',
			'FIXED Copy svg code action doesn\'t work #198',
			'FIXED Zendesk submit buttons no "EN" lang fails #199',
			'FIXED Zendesk submit buttons error wrong status in "unique mode" (no agents view) #201',
			'FIXED Zendesk Incident ticket highlight fails in not "EN" langs #202',
			'IMPROVED Get osom font icons, improved unsafe namespaces',
			'IMPROVED Zendesk support in ES, EN and DE langs',
			'FIXED Osom font, get duotone icons fails #200',
			'FIXED Osom font, on change style icon doesn\'t refresh code #203',
			'NEW New LC background zoom preview before choose #195'
		]
	}, {
		version: 'v2.3.16', date: '13 Sep 2019',
		lines: [
			'CHANGED Limitation of new version notify, only major and medium version change #194',
			'FIXED Fix url close match tab ticketConsume #193'
		]
	}, {
		version: 'v2.3.15', date: '10 Sep 2019',
		lines: [
			'FIXED Fix multiple open windows by TicketConsume (Zendesk) #188',
			'IMPROVED Gulp automatic version replace (dev) #189',
			'FIXED Fix "method_lines" issue in js/inject/zendesk/ticket-consume.js #186'
		]
	}, {
		version: 'v2.3.14', date: '04 Sep 2019',
		lines: [
			'FIXED Ticket consume get wrong data #184',
			'IMPROVED Ticket consume better open window minimized instead of sticky tab #184#issuecomment-528098098'
		]
	}, {
		version: 'v2.3.13', date: '02 Sep 2019',
		lines: [
			'CHANGED Update dependencies #182',
			'CHANGED Added npm and gulpjs for dependencies #182#issuecomment-527204236',
			'FIXED Ticket consume feature wrong url (again) #163#issuecomment-527041819',
			'FIXED Ticket consume no use enable/disable option (background) #163#issuecomment-527132379'
		]
	}, {
		version: 'v2.3.12', date: '30 Aug 2019',
		lines: [
			'FIXED Fail background syntax error #177',
			'FIXED Bad ticket consume source url #163#issuecomment-526475838',
			'IMPROVED Fix "method_lines" issue in js/inject/zendesk/ticket-consume.js #179',
			'IMPROVED Fix "method_complexity" issue in js/inject/zendesk/ticket-consume-source-tab.js #180'
		]
	}, {
		version: 'v2.3.11', date: '30 Aug 2019',
		lines: [
			'FIXED Zendesk ticket consumption alert - http iframe into https tab not work #163#issuecomment-525411887',
			'CHANGED Changelog issue code adaptation #175'
		]
	}, {
		version: 'v2.3.10', date: '16 Aug 2019',
		lines: [
			'REMOVED Unused old folders, files and assets #170',
			'REMOVED Holidays LC feature #171',
			'REMOVED Dropped Masonry dependecy #165',
			'FIXED Fix internal error when extension call undefined action',
			'FIXED Fixed wrong help page ids',
			'FIXED Go to fluid dump fix (no remove &lt;head&gt;)',
			'FIXED Fix center align save snackbar',
			'FIXED Fix guide lines on resize #159',
			'IMPROVED Internal Container guides (popup action) code refactoring',
			'IMPROVED Added global functions documentation',
			'IMPROVED Code maintainability (delete duplicated code blocks and optimized complexity functions)',
			'IMPROVED Change injection scripts and css with safe functions/classes/ids namespaces',
			'IMPROVED Options HTML split and ajax loads #165',
			'CHANGED Change default LC background bad data',
			'CHANGED Better way to view help info of option (highlight help item when hasn\'t video)',
			'CHANGED Add privacy policy into options and install pages footer',
			'CHANGED Rename "optOsBranchesBtn" to "optLcOsBranchesBtn" #167',
			'CHANGED Moved js options files to /js/options',
			'CHANGED Changelog visual changes and add more complete info',
			'CHANGED Reorganize data.js #172',
			'NEW Zendesk - Automatic ticket consumption alert (by organization SLA), beta, only for agents #163',
			'NEW New welcome page with pre-configuration extension options #167'
		]
	}, {
		version: 'v2.3.9', date: '26 Jul 2019',
		lines: [
			'REMOVED Unused chrome permissions',
			'FIXED Mobile-Tablet responsive header (options page)',
			'NEW Container guides (action): Added container widths and lateral paddings info, (on resize and px, rem, em, % values support)',
			'FIXED Show SVG icons right click menu position',
			'FIXED Fix branch sandboxes buttons margin-top',
			'NEW New copy &lt;use&gt; and &lt;svg&gt; icons code in "Show svg icons" action',
			'NEW Added privacy policy (ES)',
		]
	}, {
		version: 'v2.3.8', date: '6 May 2019',
		lines: [
			'FIXED Fix "To much blur" #155',
			'FIXED developmenttool=true ("Auto scroll to first dump (cfm dump)" - developing tool @pol-93)'
		]
	}, {
		version: 'v2.3.7', date: '28 Apr 2019',
		lines: [
			'FIXED Syntax error ("Auto scroll to first dump (cfm dump)" - developing tool @pol-93)'
		]
	}, {
		version: 'v2.3.6', date: '20 Apr 2019',
		lines: [
			'CHANGED Update jQuery v3.3.1 -> v3.4.0',
			'CHANGED Update Bootstrap v4.2.1 -> v4.3.1',
			'CHANGED Modified new extension version notify',
			'NEW New feature "Auto scroll to first dump (cfm dump)" - developing tool @pol-93',
			'FIXED Fix zendesk issue "Custom Macros going funny" #145',
			'FIXED Fix zendesk issue  "No se abre el popup de "Side conversation" #148',
			'FIXED Minor big-controls-lc fix (visual issue)',
			'FIXED Zendesk Unfocus comment box #147',
			'NEW New feature "Auto increment version opensass publication" #139',
			'NEW New install landing welcome'
		]
	}, {
		version: 'v2.3.5', date: '14 Apr 2019',
		lines: [
			'FIXED Fix "Coloreado de prioridades no se refresca" #141'
		]
	}, {
		version: 'v2.3.4', date: '13 Apr 2019',
		lines: [
			'CHANGED Dropped "Zendesk Submit Expander 2.0.1.0" - New Zendesk submit menu expander',
			'CHANGED Changelog visual changes',
			'FIXED Centralize all zendesk options with a unique global observer',
			'FIXED Flush cfm utility scoped to "/[0-9]{2,6}\.igd\.production/g"',
			'NEW Custom Zendesk commands #133',
			'NEW Zendesk option "Priority highlights only incidents", Highlight only incident tickets #132',
			'NEW Zendesk option "Disable editor autofocus" #137'
		]
	}, {
		version: 'v2.3.3', date: '19 Mar 2019',
		lines: [
			'NEW New confirm ticket submit with HTML modal',
			'FIXED Add userName into signup testing action #126',
			'FIXED More refactoring options js #126',
			'FIXED Better forceview match',
			'FIXED Changed default ticket colors',
			'FIXED Ultra wrong label, is Urgent! #128'
		]
	}, {
		version: 'v2.3.2', date: '06 Mar 2019',
		lines: [
			'NEW Zendesk priority highlights with color customization! #124',
			'NEW Show svg icons - Copy svg code option (@pol-93)',
			'FIXED Refactoring options js'
		]
	}, {
		version: 'v2.3.1', date: '04 Mar 2019',
		lines: [
			'NEW Popup edit profile shortcut',
			'FIXED Zendesk submit alert compatible with a other chome extension',
			'FIXED Removed jQuery from action js injects (optimization)',
			'FIXED Rename optionsDefaults.js to defaults.js and optionsData.js to data.js',
			'FIXED Minor visual improvements',
			'FIXED Steal FontAwesome minor improvements'
		]
	}, {
		version: 'v2.3.0', date: '17 Feb 2019',
		lines: [
			'FIXED Fix OS sanbox branch buttons error when select not exists #114',
			'NEW New options layout',
			'NEW New changelog layout',
			'NEW New profile layout and new option field username',
			'NEW Added pagination and collections to background image option',
			'NEW Added Zendesk options block',
			'NEW Added Zendesk option. Enable/disable ticket submit confirm popup',
			'FIXED Optimization save and restore options',
			'FIXED Renamed options names for better understanding',
			'NEW Added better help, gifs and shortcuts',
			'NEW Added new avatars: 9s, Asuka, Goku, Pusheen and Link',
			'NEW Added restore default options confirm popup',
			'NEW Added dev credits',
			'FIXED Removed "#" in code urls (Chrome fix)'
		]
	}
	// {
	// 	version: 'v2.2.3', date: '12 Feb 2019',
	// 	lines: [
	// 		'NEW Zendesk confirm submit ticket'
	// 	]
	// }, {
	// 	version: 'v2.2.2', date: '11 Feb 2019',
	// 	lines: [
	// 		'FIXED Fix next holiday event',
	// 		'FIXED Remove changelogs 1.x'
	// 	]
	// }, {
	// 	version: 'v2.2.1', date: '08 Feb 2019',
	// 	lines: [
	// 		'NEW LC os login select branches to buttons',
	// 		'NEW Next holiday event',
	// 		'FIXED Fix #107 (Lc pages grid toggle button in hk)'
	// 	]
	// }, {
	// 	version: 'v2.2.0', date: '18 Jan 2019',
	// 	lines: [
	// 		'FIXED Hot fix - missing optionDefaults.js',
	// 		'FIXED Update scss & css',
	// 		'FIXED Css standards fixes'
	// 	]
	// }, {
	// 	version: 'v2.1.14', date: '18 Jan 2019',
	// 	lines: [
	// 		'FIXED Better Show new templates 2018',
	// 		'FIXED Fix flushredis exlude domain',
	// 		'FIXED Fixes EN language',
	// 		'FIXED Fix #102',
	// 		'FIXED Fix #93',
	// 		'FIXED Refactoring issues'
	// 	]
	// }, {
	// 	version: 'v2.1.13', date: '14 Jan 2019',
	// 	lines: [
	// 		'FIXED Minor fixes dev os lc bar',
	// 		'FIXED Scripts optimization',
	// 		'FIXED Fix setting flushredis on/off',
	// 		'NEW Add feature "show svg icons" (popup -> utils)',
	// 		'FIXED Dev os lc bar duplicate search (Pol)',
	// 		'NEW Add feature "automatic signup" (Pol) (popup -> testing)'
	// 	]
	// }, {
	// 	version: 'v2.1.12', date: '09 Jan 2019',
	// 	lines: [
	// 		'FIXED Fix dev os lc bar extra buttons',
	// 		'FIXED Fix flushredis button wrong domains',
	// 		'NEW Add popup swiper css generator'
	// 	]
	// }, {
	// 	version: 'v2.1.11', date: '13 Dec 2018',
	// 	lines: [
	// 		'FIXED Refactoring and clean code',
	// 		'FIXED Fix #66',
	// 		'FIXED Fix #67',
	// 		'NEW Add flushredis cfm feature (with on/off opt)'
	// 	]
	// }, {
	// 	version: 'v2.1.10', date: '09 Dec 2018',
	// 	lines: [
	// 		'NEW Add lc page deep icon color',
	// 		'NEW Add lc page inactive icon',
	// 		'FIXED Fix toggle grid lc pages custom',
	// 		'FIXED Remove useless space lc pages window',
	// 		'NEW Add toggle button enable/disable grid lc custom pages',
	// 		'FIXED Fix bug first install bg background load fail',
	// 		'FIXED Minor fixes lc big controls'
	// 	]
	// }, {
	// 	version: 'v2.1.9', date: '25 Nov 2018',
	// 	lines: [
	// 		'FIXED Update DEUS ANTICS font',
	// 		'NEW Update dropdown icons'
	// 	]
	// }, {
	// 	version: 'v2.1.8', date: '05 Nov 2018',
	// 	lines: [
	// 		'FIXED Fix Unsplash API download_location'
	// 	]
	// }, {
	// 	version: 'v2.1.7', date: '05 Nov 2018',
	// 	lines: [
	// 		'FIXED Add responsive support options page',
	// 		'FIXED Update DEUS ANTICS font',
	// 		'FIXED Fix Unsplash API requirements',
	// 		'FIXED Fix steal FA',
	// 		'NEW Update next holidays'
	// 	]
	// }, {
	// 	version: 'v2.1.6', date: '1 Nov 2018',
	// 	lines: [
	// 		'FIXED Minor improvements',
	// 		'FIXED Toggle Secret Hack Fix',
	// 		'FIXED Add credit Secret Hack',
	// 		'FIXED Autoforceview support .hk and .cn',
	// 		'FIXED Dev lc bar into all admins and refactor file',
	// 		'FIXED Add Unsplash utm links'
	// 	]
	// }, {
	// 	version: 'v2.1.5', date: '30 Oct 2018',
	// 	lines: [
	// 		'FIXED Fix autosave timeout',
	// 		'FIXED Improvements unsplash photo API'
	// 	]
	// }, {
	// 	version: 'v2.1.4', date: '26 Oct 2018',
	// 	lines: [
	// 		'FIXED Big controls improvements',
	// 		'NEW Add option for holidays',
	// 		'NEW Visual options changes',
	// 		'NEW Add background option with Unsplash API',
	// 		'NEW Added autosave options',
	// 		'FIXED Improvements search lc dev bar',
	// 		'NEW Secret Hack'
	// 	]
	// }, {
	// 	version: 'v2.1.3', date: '23 Oct 2018',
	// 	lines: [
	// 		'NEW Add new avatar',
	// 		'NEW Add FTP button #55',
	// 		'FIXED Fix when close all windows close opensaas bar',
	// 		'FIXED Opensaas bar improvements',
	// 		'NEW Search opensaas bar',
	// 		'FIXED Rename dev opensaas bar to dev lc bar',
	// 		'NEW Add bar to real LC',
	// 		'NEW Holidays events'
	// 	]
	// }, {
	// 	version: 'v2.1.2', date: '25 Sep 2018',
	// 	lines: [
	// 		'FIXED Remove os autologin recursive xD'
	// 	]
	// }, {
	// 	version: 'v2.1.1', date: '23 Sep 2018',
	// 	lines: [
	// 		'FIXED Fix notify'
	// 	]
	// }, {
	// 	version: 'v2.1.0', date: '21 Sep 2018',
	// 	lines: [
	// 		'FIXED Visual improvements',
	// 		'FIXED Scoped css inject by options',
	// 		'FIXED OS bar improvements',
	// 		'NEW OS bar add shortcuts',
	// 		'FIXED Fix bug #48',
	// 		'FIXED Fix bug #50',
	// 		'FIXED Improvements in the forceview',
	// 		'FIXED Big controls fixes',
	// 		'NEW Added Features info into options page',
	// 		'NEW Added bongo cat avatar :3'
	// 	]
	// }, {
	// 	version: 'v2.0.4', date: '2 Sep 2018',
	// 	lines: [
	// 		'FIXED Visual improvements',
	// 		'FIXED Refactor options data'
	// 	]
	// }, {
	// 	version: 'v2.0.3', date: '28 Aug 2018',
	// 	lines: [
	// 		'FIXED Fix wrong urls',
	// 		'FIXED Fix undefined options (v2.x)',
	// 		'FIXED Visual fixes',
	// 		'NEW Add "LC big controls" background option',
	// 		'NEW Add more avatars for the loles'
	// 	]
	// }, {
	// 	version: 'v2.0.2', date: '26 Aug 2018',
	// 	lines: [
	// 		'FIXED _locale language files'
	// 	]
	// }, {
	// 	version: 'v2.0.1', date: '26 Aug 2018',
	// 	lines: [
	// 		'FIXED Add default_locale to manifest'
	// 	]
	// }, {
	// 	version: 'v2.0.0', date: '26 Aug 2018',
	// 	lines: [
	// 		'NEW New design',
	// 		'FIXED Popup actions improvements',
	// 		'FIXED Injection scripts improvements',
	// 		'NEW Add options layout',
	// 		'NEW New option background on/off',
	// 		'NEW Add changelog',
	// 		'NEW Font Awesome moved to default option',
	// 		'NEW Guide lines load in session',
	// 		'NEW New action show Template 2018 modules',
	// 		'NEW Add confirm account testing action',
	// 		'NEW New avatars',
	// 		'NEW Add notify action'
	// 	]
	// }
];