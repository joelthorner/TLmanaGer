<template>
  <div class="nav-tabs-actions">
    <b-tabs fill>
      <b-tab
        v-for="(element, index) in elements"
        :key="element.key"
        :active="index === 0"
      >
        <template #title>
          {{ element.name }}
          <div class="rippleJS"></div>
        </template>

        <div class="grid">
          <button
            v-for="item in element.items"
            :key="item.key"
            @click="executeDirective(item.directive)"
            :disabled="item.disabled"
            :class="`btn btn-action ${item.activedByCookie ? ' actived' : ''}`"
            type="button"
          >
            <span class="icon-wrap" v-html="item.icon"></span>
            <span class="name">{{ item.text }}</span>

            <div class="rippleJS" v-if="!item.disabled"></div>
          </button></div
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
// import { settings as settingsIcon } from "@/data/icons";

export default {
  name: "NavTabsActions",
  props: {
    ecommerceData: {
      required: true,
      validator: (prop) => typeof prop === "object" || prop === null,
    },
  },
  created() {
    this.readTabCookie("containerLinesGuideCookie", "1", "containerLinesGuide");
  },
  computed: {
    elements() {
      return [
        {
          name: "Utils",
          key: "utils",
          items: [
            {
              activedByCookie: this.containerLinesGuide_activedByCookie,
              disabled: false,
              key: "containerLinesGuide",
              directive: [
                "inject/actions/containerLinesGuide/index.js",
                "inject/actions/containerLinesGuide/click.js",
              ],
              text: "Container guides",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vr" viewBox="0 0 16 16">
                      <path d="M3 12V4a1 1 0 0 1 1-1h2.5V2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5v-1H4a1 1 0 0 1-1-1zm6.5 1v1H12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.5v1H12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9.5zM8 16a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-.5.5z"/>
                    </svg>`,
            },
            {
              activedByCookie: null,
              disabled: false,
              key: "GETRefreshImg",
              directive: ["inject/actions/GETRefreshImg/index.js"],
              text: "GET Refresh img",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
                      <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                      <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                    </svg>`,
            },
            {
              activedByCookie: null,
              disabled: false,
              key: "emilioGenerator",
              directive: "https://joelthorner.github.io/emilio-generator/",
              text: "Emilio Generator",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                    </svg>`,
            },
            {
              activedByCookie: null,
              disabled:
                this.existsEcommerceData() &&
                !this.isFluid() &&
                !this.isModular2018(),
              key: "showModulesTemplate2018",
              directive: [
                "inject/actions/showModulesTemplate2018/index.js",
                "inject/actions/showModulesTemplate2018/index.css",
              ],
              text: "Show '18 template modules",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>`,
            },
            {
              activedByCookie: null,
              disabled: false,
              key: "swiperCssGenerator",
              directive: "https://joelthorner.github.io/swiper-css-generator/",
              text: "Swiper css generator",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-1x2" viewBox="0 0 16 16">
                      <path d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-5z"/>
                    </svg>`,
            },
            {
              activedByCookie: null,
              disabled: false,
              key: "showSvgIcons",
              directive: [
                "inject/log.js",
                "inject/actions/showSvgIcons/index.js",
                "inject/actions/showSvgIcons/index.css",
              ],
              text: "Show svg icons",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/>
                    </svg>`,
            },
          ],
        },
        {
          name: "Testing",
          key: "testing",
          items: [
            {
              activedByCookie: null,
              disabled: this.existsEcommerceData() && !this.isFluid(),
              key: "testingFluidNotifies",
              directive: ["inject/actions/testingFluidNotifies/index.js"],
              text: "Fluid notifies",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>`,
            },
            {
              activedByCookie: null,
              key: "fluidAutoSignup",
              disabled: this.existsEcommerceData() && !this.isFluid(),
              directive: ["inject/actions/fluidAutoSignup/index.js"],
              text: "Fluid auto signup",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                      <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                    </svg>`,
            },
          ],
        },
        {
          name: "Hacks",
          key: "hacks",
          items: [
            {
              activedByCookie: null,
              disabled: false,
              key: "showLCFTPSettings",
              directive: ["inject/actions/showLCFTPSettings/index.js"],
              text: "FTP password",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                      <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>`,
            },
          ],
        },
      ];
    },
  },
  methods: {
    isFluid() {
      return this.ecommerceData.type === "fluid";
    },
    isModular2018() {
      return this.ecommerceData.template === "modular-2018";
    },
    existsEcommerceData() {
      return this.ecommerceData ? true : false;
    },
    /**
     * Execute popup action
     * @param {string|string[]} directive
     */
    executeDirective(directive) {
      if (directive.includes("http")) {
        this.createTabDirective(directive);
      } else {
        this.sendMessageDirective(directive);
      }
    },

    sendMessageDirective(directive) {
      if (Array.isArray(directive)) {
        directive = directive.join(",");
      }
      // Send directive to background.js
      chrome.runtime.sendMessage(
        {
          directive: directive,
        },
        function(response) {
          // this.close();
        }
      );
    },

    createTabDirective(directive) {
      chrome.tabs.create({
        url: directive,
      });
    },

    /**
     * Find action item set peoperty "activedByCookie" true
     * @param {string} itemKeyName
     */
    setActivedByCookie(itemKeyName) {
      // console.log(groupKeyName, itemKeyName);
      // for (let i = 0; i < this.elements.length; i++) {
      //   // const element = this.elements[i];
      //   if (this.elements[i].key == groupKeyName) {
      //     for (let j = 0; j < this.elements[i].items.length; j++) {
      //       // const item = this.elements[i].items[j];
      //       if (this.elements[i].items[j].key == itemKeyName) {
      //         this.elements[i].items[j].activedByCookie = true;
      //         console.log(this.elements);
      //       }
      //     }
      //   }
      // }
      this[itemKeyName + "_activedByCookie"] = true;
    },

    /**
     * Read tab cookie from active tab
     * @param {string} cookieName
     * @param {string} cookieValue
     * @param {string} itemKeyName
     */
    readTabCookie(cookieName, cookieValue, itemKeyName) {
      chrome.tabs.query(
        {
          status: "complete",
          windowId: chrome.windows.WINDOW_ID_CURRENT,
          active: true,
        },
        (tab) => {
          if (tab[0] && tab[0].url.includes("http")) {
            chrome.cookies.get(
              {
                url: tab[0].url,
                name: cookieName,
              },
              (cookie) => {
                if (cookie && cookie.value === cookieValue) {
                  this.setActivedByCookie(itemKeyName);
                }
              }
            );
          }
        }
      );
    },
  },
  data() {
    return {
      containerLinesGuide_activedByCookie: false,
    };
  },
};
</script>
