var AVATARS = [
	{ img: "img/logo.svg",                  title: "Pastilla" }, 
	{ img: "img/avatar/2b.jpg",             title: "2b - NieR Automata" }, 
	{ img: "img/avatar/9s.jpg",             title: "9s - NieR Automata" }, 
	{ img: "img/avatar/bananas.jpg",        title: "El unico fruto del amor" }, 
	{ img: "img/avatar/bookerDeWitt.jpg",   title: "Booker DeWitt - Bioshock Infinite" }, 
	{ img: "img/avatar/deadpool.jpg",       title: "Deadpool" }, 
	{ img: "img/avatar/eleven.jpg",         title: "11 - Stranger Things" }, 
	{ img: "img/avatar/elizabeth.jpg",      title: "Elizabeth - Bioshock Infinite" }, 
	{ img: "img/avatar/homerSimpson.jpg",   title: "Homer Simpson" }, 
	{ img: "img/avatar/isaac.jpg",          title: "Isaac" }, 
	{ img: "img/avatar/kero.jpg",           title: "Kero - Sakura card captor" }, 
	{ img: "img/avatar/miaWallace.jpg",     title: "Mia Wallace - Pulp fiction" }, 
	{ img: "img/avatar/momo.jpg",           title: "Momo - The legend of Aang" }, 
	{ img: "img/avatar/nedFlanders.jpg",    title: "Ned Flanders" }, 
	{ img: "img/avatar/ori.jpg",            title: "Ori" }, 
	{ img: "img/avatar/phasma.jpg",         title: "Phasma - Star Wars" }, 
	{ img: "img/avatar/rey.jpg",            title: "Rey - Star Wars" }, 
	{ img: "img/avatar/tothless.jpg",       title: "Tothless - Como entrenar a tu dragon" }, 
	{ img: "img/avatar/vulpex.jpg",         title: "Vulpex - Star Wars" }, 
	{ img: "img/avatar/chloe.jpg",          title: "Chloe - Life is Strange" }, 
	{ img: "img/avatar/minecraft.jpg",      title: "Minecraft" }, 
	{ img: "img/avatar/grumpy.jpg",         title: "Grumpy meme" }, 
	{ img: "img/avatar/fsSociety.jpg",      title: "fsSociety - Mr Robot" }, 
	{ img: "img/avatar/songoku.jpg",        title: "Songoku - Bola de drac" }, 
	{ img: "img/avatar/chuchu.jpg",         title: "Chuchu - Utena" }, 
	{ img: "img/avatar/sailorMoon.jpg",     title: "Sailormoon" }, 
	{ img: "img/avatar/picachu.jpg",        title: "Picachu" }, 
	{ img: "img/avatar/ranma.jpg",          title: "Ranma" }, 
	{ img: "img/avatar/cawboyBeBop.jpg",    title: "Cawboy BeBop" }, 
	{ img: "img/avatar/doge.jpg",           title: "Doge meme" }, 
	{ img: "img/avatar/bongoCat.jpg",       title: "Bongo cat" }, 
	{ img: "img/avatar/shadowTR.jpg",       title: "Lara Croft - Shadow of the Tomb Raider" },
	{ img: "img/avatar/asuka.jpg",          title: "Asuka - Evangelion" },
	{ img: "img/avatar/goku.jpg",           title: "Goku - Bola de drac" },
	{ img: "img/avatar/pusheen.jpg",        title: "Pusheen" },
	{ img: "img/avatar/link.jpg",           title: "Link - The legend of Zelda" }
];

var CHANGELOG = [
	{
		version: "2.3.4", date: "07 Apr 2019",
		lines: [
			"CHANGE Dropped 'Zendesk Submit Expander 2.0.1.0' dependency (and fix bugs) 🐛",
			"CHANGE Minor visual improvements changelog",
			"NEW Zendesk command: Ctrl+Shift+Alt+A - Focus to assignee field (Zendesk ticket view)",
			"NEW Zendesk command: Ctrl+Shift+Alt+T - Focus to type field (Zendesk ticket view)",
			"NEW Zendesk command: Ctrl+Shift+Alt+P - Focus to priority field (Zendesk ticket view)",
			"NEW Zendesk command: Ctrl+Shift+Alt+C - Toggle 'Comment with CC Team' check (Zendesk ticket view)",
			"NEW Zendesk command: Ctrl+Shift+Alt+D - Toggle 'Doubts' check (Zendesk ticket view)"
		]
	}, {
		version: "2.3.3", date: "19 Mar 2019",
		lines: [
			"NEW New confirm ticket submit with HTML modal 🙋",
			"FIX Add userName into signup testing action <a href=\"https://github.com/joelthorner/TLmanaGer/issues/126\" target=\"_blank\">#126</a>",
			"FIX More refactoring options js 😥",
			"FIX Better forceview match",
			"FIX Changed default ticket colors ✨",
			"FIX Ultra wrong label, is Urgent! <a href=\"https://github.com/joelthorner/TLmanaGer/issues/128\" target=\"_blank\">#128</a>"
		]
	}, {
		version: "2.3.2", date: "06 Mar 2019",
		lines: [
			"NEW Zendesk priority highlights with color customization! 🎉",
			"NEW Show svg icons - Copy svg code option (Pol)",
			"FIX Refactoring options js"
		]
	}, {
		version: "2.3.1", date: "04 Mar 2019",
		lines: [
			"NEW Popup edit profile shortcut",
			"FIX Zendesk submit alert compatible with a other chome extension",
			"FIX Removed jQuery from action js injects (optimization)",
			"FIX Rename optionsDefaults.js to defaults.js and optionsData.js to data.js",
			"FIX Minor visual improvements",
			"FIX Steal FontAwesome minor improvements"
		]
	}, {
		version: "2.3.0", date: "17 Feb 2019",
		lines: [
			"FIX Fix OS sanbox branch buttons error when select not exists <a href=\"https://github.com/joelthorner/TLmanaGer/issues/114\" target=\"_blank\">#114</a>",
			"NEW New options layout",
			"NEW New changelog layout",
			"NEW New profile layout and new option field username",
			"NEW Added pagination and collections to background image option",
			"NEW Added Zendesk options block",
			"NEW Added Zendesk option. Enable/disable ticket submit confirm popup",
			"FIX Optimization save and restore options",
			"FIX Renamed options names for better understanding",
			"NEW Added better help, gifs and shortcuts",
			"NEW Added new avatars: 9s, Asuka, Goku, Pusheen and Link",
			"NEW Added restore default options confirm popup",
			"NEW Added dev credits",
			"FIX Removed '#' in code urls (Chrome fix)"
		]
	}, {
		version: "2.2.3", date: "12 Feb 2019",
		lines: [
			"NEW Zendesk confirm submit ticket"
		]
	}, {
		version: "2.2.2", date: "11 Feb 2019",
		lines: [
			"FIX Fix next holiday event",
			"FIX Remove changelogs 1.x"
		]
	}, {
		version: "2.2.1", date: "08 Feb 2019",
		lines: [
			"NEW LC os login select branches to buttons",
			"NEW Next holiday event",
			"FIX Fix <a href=\"https://github.com/joelthorner/TLmanaGer/issues/107\" target=\"_blank\">#107</a> (Lc pages grid toggle button in hk)"
		]
	}, {
		version: "2.2.0", date: "18 Jan 2019",
		lines: [
			"FIX Hot fix - missing optionDefaults.js",
			"FIX Update scss & css",
			"FIX Css standards fixes"
		]
	}, {
		version: "2.1.14", date: "18 Jan 2019",
		lines: [
			"FIX Better Show new templates 2018",
			"FIX Fix flushredis exlude domain",
			"FIX Fixes EN language",
			"FIX Fix <a href=\"https://github.com/joelthorner/TLmanaGer/issues/102\" target=\"_blank\">#102</a>",
			"FIX Fix <a href=\"https://github.com/joelthorner/TLmanaGer/issues/102\" target=\"_blank\">#93</a>",
			"FIX Refactoring issues"
		]
	}, {
		version: "2.1.13", date: "14 Jan 2019",
		lines: [
			"FIX Minor fixes dev os lc bar",
			"FIX Scripts optimization",
			"FIX Fix setting flushredis on/off",
			"NEW Add feature 'show svg icons' (popup -> utils)",
			"FIX Dev os lc bar duplicate search (Pol)",
			"NEW Add feature 'automatic signup' (Pol) (popup -> testing)"
		]
	}, {
		version: "2.1.12", date: "09 Jan 2019",
		lines: [
			"FIX Fix dev os lc bar extra buttons",
			"FIX Fix flushredis button wrong domains",
			"NEW Add popup swiper css generator"
		]
	}, {
		version: "2.1.11", date: "13 Dec 2018",
		lines: [
			"FIX Refactoring and clean code",
			"FIX Fix <a href=\"https://github.com/joelthorner/TLmanaGer/issues/66\" target=\"_blank\">#66</a>",
			"FIX Fix <a href=\"https://github.com/joelthorner/TLmanaGer/issues/67\" target=\"_blank\">#67</a>",
			"NEW Add flushredis cfm feature (with on/off opt)"
		]
	}, {
		version: "2.1.10", date: "09 Dec 2018",
		lines: [
			"NEW Add lc page deep icon color",
			"NEW Add lc page inactive icon",
			"FIX Fix toggle grid lc pages custom",
			"FIX Remove useless space lc pages window",
			"NEW Add toggle button enable/disable grid lc custom pages",
			"FIX Fix bug first install bg background load fail",
			"FIX Minor fixes lc big controls"
		]
	}, {
		version: "2.1.9", date: "25 Nov 2018",
		lines: [
			"FIX Update DEUS ANTICS font",
			"NEW Update dropdown icons"
		]
	}, {
		version: "2.1.8", date: "05 Nov 2018",
		lines: [
			"FIX Fix Unsplash API download_location"
		]
	}, {
		version: "2.1.7", date: "05 Nov 2018",
		lines: [
			"FIX Add responsive support options page",
			"FIX Update DEUS ANTICS font",
			"FIX Fix Unsplash API requirements",
			"FIX Fix steal FA",
			"NEW Update next holidays"
		]
	}, {
		version: "2.1.6", date: "1 Nov 2018",
		lines: [
			"FIX Minor improvements",
			"FIX Toggle Secret Hack Fix",
			"FIX Add credit Secret Hack",
			"FIX Autoforceview support .hk and .cn",
			"FIX Dev lc bar into all admins and refactor file",
			"FIX Add Unsplash utm links"
		]
	}, {
		version: "2.1.5", date: "30 Oct 2018",
		lines: [
			"FIX Fix autosave timeout",
			"FIX Improvements unsplash photo API"
		]
	}, {
		version: "2.1.4", date: "26 Oct 2018",
		lines: [
			"FIX Big controls improvements",
			"NEW Add option for holidays",
			"NEW Visual options changes",
			"NEW Add background option with Unsplash API",
			"NEW Added autosave options",
			"FIX Improvements search lc dev bar",
			"NEW Secret Hack"
		]
	}, {
		version: "2.1.3", date: "23 Oct 2018",
		lines: [
			"NEW Add new avatar",
			"NEW Add FTP button <a href=\"https://github.com/joelthorner/TLmanaGer/issues/55\" target=\"_blank\">#55</a>",
			"FIX Fix when close all windows close opensaas bar",
			"FIX Opensaas bar improvements",
			"NEW Search opensaas bar",
			"FIX Rename dev opensaas bar to dev lc bar",
			"NEW Add bar to real LC",
			"NEW Holidays events"
		]
	}, {
		version: "2.1.2", date: "25 Sep 2018",
		lines: [
			"FIX Remove os autologin recursive xD"
		]
	}, {
		version: "2.1.1", date: "23 Sep 2018",
		lines: [
			"FIX Fix notify"
		]
	}, {
		version: "2.1.0", date: "21 Sep 2018",
		lines: [
			"FIX Visual improvements",
			"FIX Scoped css inject by options",
			"FIX OS bar improvements",
			"NEW OS bar add shortcuts",
			"FIX Fix bug <a href=\"https://github.com/joelthorner/TLmanaGer/issues/48\" target=\"_blank\">#48</a>",
			"FIX Fix bug <a href=\"https://github.com/joelthorner/TLmanaGer/issues/50\" target=\"_blank\">#50</a>",
			"FIX Improvements in the forceview",
			"FIX Big controls fixes",
			"NEW Added Features info into options page",
			"NEW Added bongo cat avatar :3"
		]
	}, {
		version: "2.0.4", date: "2 Sep 2018",
		lines: [
			"FIX Visual improvements",
			"FIX Refactor options data"
		]
	}, {
		version: "2.0.3", date: "28 Aug 2018",
		lines: [
			"FIX Fix wrong urls",
			"FIX Fix undefined options (v2.x)",
			"FIX Visual fixes",
			"NEW Add \"LC big controls\" background option",
			"NEW Add more avatars for the loles"
		]
	}, {
		version: "2.0.2", date: "26 Aug 2018",
		lines: [
			"FIX _locale language files"
		]
	}, {
		version: "2.0.1", date: "26 Aug 2018",
		lines: [
			"FIX Add default_locale to manifest"
		]
	}, {
		version: "2.0.0", date: "26 Aug 2018",
		lines: [
			"NEW New design",
			"FIX Popup actions improvements",
			"FIX Injection scripts improvements",
			"NEW Add options layout",
			"NEW New option background on/off",
			"NEW Add changelog",
			"NEW Font Awesome moved to default option",
			"NEW Guide lines load in session",
			"NEW New action show Template 2018 modules",
			"NEW Add confirm account testing action",
			"NEW New avatars",
			"NEW Add notify action"
		]
	}
];