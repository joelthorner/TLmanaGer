class ThemeColors {

  mainColor = ''

  secondaryColor = ''

  secondaryColorDarker = ''

  mainColorHue = 0

  mainColorSaturate = 0

  mainColorBrightness = 0

  allCss = `
    ::-moz-selection { background: var(--theme-color-main); }
    ::selection { background: var(--theme-color-main); }
    
    div.view1 div:not(.disabled) div:hover>span,
    div.view2 div.nameContent>div:hover,
    div.view2 table.view2Table td:first-child:hover,
    div.view2 div.current,
    div.view2 div.selected,
    div.view3 div:hover>span,
    div.view4Content>div:hover,
    div.groupsContainer>div.group>div:hover,
    div.treeNode.permissionArea:hover,
    div.userTicketFrom:hover,
    div.userTicketFrom2:hover,
    div.orderTicketFrom:hover,
    div.freeTicketFrom:hover,
    div.chatLoginTicketFrom:hover,
    div.chatTicketFrom:hover,
    div.newPollQuestion:hover,
    .card span.default,
    input.new,
    div#logoTrilogi:hover,
    div#shopName:hover,
    div#topBar div.rightMenuLink:hover,
    div#realtimeUsersButton:hover div.label,
    div#realtimeAdminsButton:hover div.label,
    div#supportButton div.number,
    div#BO_Options>div.topMenu>div:hover,
    div.barWidget:hover,
    div.startMenuL1>div.menuEntry:hover,
    div.startMenuL1>div.dropdown:hover,
    div.startMenuL1>div.dropdown.open,
    div.startMenuL2>div.menuEntry:hover,
    div.startMenuL2>div.dropdown:hover,
    div.startMenuL2>div.dropdown.open,
    div.startMenuL3>div.dropdown:hover,
    div.startMenuL2>div.dropdown.open,
    div.bottomBarRightLink>span.number,
    div#fileUploadMonitor span.uploadsNumber,
    div.footerBubble div.message:hover,
    div.taskMenuLink.actived,
    div.taskMenuLink:hover,
    .dragGhost,
    a.add:hover,
    a.greyButton:hover,
    #desktop .shortcuts div.shortcut:hover div,
    #desktop .wpPost:hover .more,
    .editorSearch .filePath,
    div.activedWindow div.windowTitle,
    div.filterBlock div.state>input:checked~label,
    .gitMenu a:hover>span {
      color: var(--theme-color-main)
    }
    
    div.departmentsContainer>div.department:hover,
    div#startMenuUser .text:hover {
      color: var(--theme-color-main) !important;
    }
    
    div.editWindowLayoutHeader>div.headerImage:hover,
    div.viewSupportTicketLeft>.content,
    div.headerIcons.small>div.view1 div.interruptor.checked,
    div.taskMenuLink.actived,
    div.taskMenuLink:hover {
      border: 1px solid var(--theme-color-main);
    }
    
    div.viewSupportTicketLeft div.ticketHistoryHeader,
    div.headerIcons.small>div.view1 div.interruptor.checked>div,
    div.exportButtons2 input[type=button]:hover,
    div#BO_Options,
    div.interruptor>div {
      background-color: var(--theme-color-main);
    }
    
    div.viewSupportTicketLeft div.ticketHistoryHeader:before {
      border-right: 8px solid var(--theme-color-main);
    }
    
    div.viewSupportTicket div.attachmentFilesLeft {
      border-top: 1px solid var(--theme-color-main);
    }
    
    #desktop .search:hover input,
    #desktop .shortcut:hover,
    #desktop .wpPost:hover {
      border-color: var(--theme-color-main);
    }
    
    /* main-hue */
    div.taskMenuLink.actived img.taskMenuIcon,
    div.taskMenuLink:hover img.taskMenuIcon,
    div.activedWindow div.windowTitle img.windowIcon,
    div.bottomBarRightLink.blink,
    div.bottomBarRightLink:hover:not(#BO_Options),
    div#startMenu:hover,
    div#startMenu.open,
    div.startMenuL1>div.menuEntry:hover div.icon,
    div.startMenuL1>div.dropdown.open div.icon,
    div.startMenuL2>div.menuEntry:hover div.icon,
    div.startMenuL2>div.dropdown.open div.icon,
    div.filterBlock div.state>img.closed:hover,
    .orderDetailsTabWrap table.userDetails td.addressDetails div.addressDetailsData>p>img,
    .orderDetailsTabWrap table.userDetails td.addressDetails div.addressDetailsTitle>img:hover,
    img.editIcon:hover,
    div.exportButtons2 img:hover,
    div.viewSelector img.actived,
    div.viewSelector img:hover,
    div#logout>div.icon:hover,
    div.view1 div:hover>div.icon>img,
    div.window div.closeButton:hover,
    div.window div.minimizeButton:hover,
    div.window div.maximizeButton:hover,
    div.window div.helpButton:hover,
    #desktop .shortcuts div.shortcut:hover img,
    #desktop .search img:hover,
    #desktop .search img:hover,
    .gitMenu a:hover,
    img.calcIcon:hover,
    div.tabs img.previewUrlTab:hover,
    div.imageField img:hover {
      filter: hue-rotate(var(--theme-color-main-hue));
      filter: brightness(50%) sepia(1) hue-rotate(var(--theme-color-main-hue)) saturate(var(--theme-color-main-saturate)) brightness(var(--theme-color-main-brightness));
    }
    
    @media screen,
    (-webkit-min-device-pixel-ratio:0),
    (min-resolution:0dppx) {
    
      input[type=radio]:checked,
      input[type=checkbox]:checked {
        filter: hue-rotate(var(--theme-color-main-hue));
        filter: brightness(50%) sepia(1) hue-rotate(var(--theme-color-main-hue)) saturate(var(--theme-color-main-saturate)) brightness(var(--theme-color-main-brightness));
      }
    }
    
    /* other */
    div#startMenuUser .text:hover,
    a.greyButton:hover,
    a.add:hover,
    div.greyButton:hover {
      background-position: 0px 0px;
    }
    
    a.add:hover,
    div.fieldset>div.header a.add:hover {
      background-position: 2px 0;
    }
    
    .gitMenu a:hover {
      text-decoration: none;
    }
    
    div.departmentsContainer>div.department {
      background-position: 14px 0px;
    }
    
    /* reset */
    div.bottomBarRightLink.blink span.number,
    div.bottomBarRightLink:hover span.number,
    .gitMenu a:hover>span {
      filter: hue-rotate(calc(360deg - var(--theme-color-main-hue)));
    }
    
    /* secondary color */
    a {
      color: var(--theme-color-secondary);
    }
    
    input.green,
    input.orange {
      background-color: var(--theme-color-secondary);
    }
    
    .mergeCommentButtonCancel {
      color: var(--theme-color-secondary) !important;
    }
    
    input.green:hover,
    input.orange:hover {
      background-color: var(--theme-color-secondary-dark);
    }`

  constructor(mainColor, secondaryColor) {
    this.mainColor = mainColor;
    this.secondaryColor = secondaryColor;

    this._setMainColorProps();
    
    this.secondaryColorDarker = this.darkerColor(`rgba(${this.hexToRgb(secondaryColor).join(',')}, 1)`, .1);

    this._appendStyleVars();
    this._appendAllCss();
  }

  _appendStyleVars() {
    let style = document.createElement('style');
    let css = `:root {
      --theme-color-main: ${this.mainColor};
      --theme-color-main-hue: ${this.mainColorHue}deg;
      --theme-color-main-saturate: ${this.mainColorSaturate}%;
      --theme-color-main-brightness: ${this.mainColorBrightness}%;

      --theme-color-secondary: ${this.secondaryColor};
      --theme-color-secondary-dark: ${this.secondaryColorDarker};
    }`;

    document.head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }

  _appendAllCss() {
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.appendChild(document.createTextNode(this.allCss));
  }

  _setMainColorProps() {
    let RGB_new = this.hexToRgb(this.mainColor);
    let RGB_old = this.hexToRgb('#746751');
    let HSL_new = this.rgbToHsl(RGB_new[0], RGB_new[1], RGB_new[2]);
    let HSL_old = this.rgbToHsl(RGB_old[0], RGB_old[1], RGB_old[2]);

    this.mainColorHue = HSL_new[0] - HSL_old[0];
    this.mainColorSaturate = 100 + (HSL_new[1] - HSL_old[1]);
    this.mainColorBrightness = 100 + (HSL_new[2] - HSL_old[2]);

    console.log(HSL_new, HSL_old)
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  darkerColor(color, ratio) {
    return this._changeColor(color, ratio, true);
  }

  _changeColor(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
      /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
      '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
      // Determine if input is RGB(A)
      rgb = color.match(new RegExp('^rgba?\\(\\s*' +
        '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
        '\\s*,\\s*' +
        '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
        '\\s*,\\s*' +
        '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
        '(?:\\s*,\\s*' +
        '(0|1|0?\\.\\d+))?' +
        '\\s*\\)$'
        , 'i')),
      alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

      // Convert hex to decimal
      decimal = !!rgb ? [rgb[1], rgb[2], rgb[3]] : color.replace(
        /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
        function () {
          return parseInt(arguments[1], 16) + ',' +
            parseInt(arguments[2], 16) + ',' +
            parseInt(arguments[3], 16);
        }
      ).split(/,/),
      returnValue;

    // Return RGB(A)
    return !!rgb ?
      'rgb' + (alpha !== null ? 'a' : '') + '(' +
      Math[darker ? 'max' : 'min'](
        parseInt(decimal[0], 10) + difference, darker ? 0 : 255
      ) + ', ' +
      Math[darker ? 'max' : 'min'](
        parseInt(decimal[1], 10) + difference, darker ? 0 : 255
      ) + ', ' +
      Math[darker ? 'max' : 'min'](
        parseInt(decimal[2], 10) + difference, darker ? 0 : 255
      ) +
      (alpha !== null ? ', ' + alpha : '') +
      ')' :
      // Return hex
      [
        '#',
        this._pad(Math[darker ? 'max' : 'min'](
          parseInt(decimal[0], 10) + difference, darker ? 0 : 255
        ).toString(16), 2),
        this._pad(Math[darker ? 'max' : 'min'](
          parseInt(decimal[1], 10) + difference, darker ? 0 : 255
        ).toString(16), 2),
        this._pad(Math[darker ? 'max' : 'min'](
          parseInt(decimal[2], 10) + difference, darker ? 0 : 255
        ).toString(16), 2)
      ].join('');
  }

  _pad(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
      num = pad + num;
    }
    return num;
  }

  rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.logicommerce.themeColors.actived) {
    let colors = result.logicommerce.themeColors.colors;
    new ThemeColors(colors.main, colors.secondary);
  }
});
