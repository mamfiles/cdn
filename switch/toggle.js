"use strict";const ELEMENT_NAME="theme-switch",THEME_KEY="theme",THEME_VALUES=["auto","dark","light"],THEME_ATTRIBUTE="data-theme",COLOR_SCHEME_DARK="(prefers-color-scheme: dark)",CUSTOM_EVENT_NAME="themeToggle",FALLBACK_THEME="light";class ThemeSwitch extends HTMLElement{constructor(){super(),this.identifier=ThemeSwitch.counter++,this.attachShadow({mode:"open"}),this.renderButton(),this.button=this.shadowRoot.querySelector("#theme-switch"),this.button.addEventListener("click",(()=>this.onClick())),document.addEventListener("themeToggle",(e=>e.detail.originId!==this.identifier&&this.updateButtonIcon())),window.addEventListener("storage",(e=>e.key===THEME_KEY&&(this.updateButtonIcon(),updateTheme()))),this.updateButtonIcon()}renderButton(){this.shadowRoot.innerHTML='\n                <style>\n    :host {\n        display: flex;\n        width: 21px;\n        aspect-ratio: 1/1;\n        cursor: pointer\n    }\n\n    :host([hidden]) {\n        display: none\n    }\n\n    button {\n        padding: 0;\n        border: none;\n        background: none;\n        cursor: pointer;\n    }\n\n    button path {\n        fill: var(--title-color);\n        transition: fill 0.3s ease;\n    }\n\n    button:hover path {\n        fill: var(--first-color-alt);\n    }\n\n    button svg {\n        width: 100%;\n        height: 100%;\n    }\n\n    #icon-auto,\n    #icon-light,\n    #icon-dark {\n        display: none;\n    }\n\n    #icon-light:hover {\n        stroke: var(--first-color-alt);\n    }\n\n    #icon-auto[style*="display: block"],\n    #icon-light[style*="display: block"],\n    #icon-dark[style*="display: block"] {\n        display: block;\n    }\n</style>\n<button id="theme-switch">\n    <svg id="icon-auto" viewBox="0 0 24 24">\n        <path\n            d="M12 0C11.4477 0 11 0.447715 11 1V3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3V1C13 0.447715 12.5523 0 12 0Z"\n            fill="#0F0F0F" />\n        <path fill-rule="evenodd" clip-rule="evenodd"\n            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM9.21518 14.7848C8.50248 14.0721 8.06167 13.0875 8.06167 12C8.06167 9.82492 9.82492 8.06167 12 8.06167C13.0875 8.06167 14.0721 8.50248 14.7848 9.21518L9.21518 14.7848Z"\n            fill="#0F0F0F" />\n        <path\n            d="M19.0711 3.51472C19.4616 3.12419 20.0947 3.12419 20.4853 3.51472C20.8758 3.90524 20.8758 4.53841 20.4853 4.92893L19.0711 6.34315C18.6805 6.73367 18.0474 6.73367 17.6568 6.34315C17.2663 5.95262 17.2663 5.31946 17.6568 4.92893L19.0711 3.51472Z"\n            fill="#0F0F0F" />\n        <path\n            d="M0 12C0 12.5523 0.447715 13 1 13H3C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11H1C0.447715 11 0 11.4477 0 12Z"\n            fill="#0F0F0F" />\n        <path\n            d="M3.51472 4.92893C3.1242 4.53841 3.1242 3.90524 3.51472 3.51472C3.90525 3.12419 4.53841 3.12419 4.92894 3.51472L6.34315 4.92893C6.73368 5.31946 6.73368 5.95262 6.34315 6.34314C5.95263 6.73367 5.31946 6.73367 4.92894 6.34314L3.51472 4.92893Z"\n            fill="#0F0F0F" />\n        <path\n            d="M12 20C11.4477 20 11 20.4477 11 21V23C11 23.5523 11.4477 24 12 24C12.5523 24 13 23.5523 13 23V21C13 20.4477 12.5523 20 12 20Z"\n            fill="#0F0F0F" />\n        <path\n            d="M4.92894 17.6569C5.31946 17.2663 5.95263 17.2663 6.34315 17.6569C6.73368 18.0474 6.73368 18.6805 6.34315 19.0711L4.92894 20.4853C4.53842 20.8758 3.90525 20.8758 3.51473 20.4853C3.1242 20.0948 3.1242 19.4616 3.51473 19.0711L4.92894 17.6569Z"\n            fill="#0F0F0F" />\n        <path\n            d="M20 12C20 12.5523 20.4477 13 21 13H23C23.5523 13 24 12.5523 24 12C24 11.4477 23.5523 11 23 11H21C20.4477 11 20 11.4477 20 12Z"\n            fill="#0F0F0F" />\n        <path\n            d="M17.6568 19.0711C17.2663 18.6805 17.2663 18.0474 17.6568 17.6569C18.0474 17.2663 18.6805 17.2663 19.0711 17.6569L20.4853 19.0711C20.8758 19.4616 20.8758 20.0948 20.4853 20.4853C20.0947 20.8758 19.4616 20.8758 19.0711 20.4853L17.6568 19.0711Z"\n            fill="#0F0F0F" />\n    </svg>\n\n    <svg id="icon-light" viewBox="0 0 24 24" fill="none" stroke="var(--title-color)" stroke-width="2"\n        stroke-linecap="round" stroke-linejoin="round" style="display:none;">\n        <circle cx="12" cy="12" r="5">\n        </circle>\n        <line x1="12" y1="1" x2="12" y2="3">\n        </line>\n        <line x1="12" y1="21" x2="12" y2="23">\n        </line>\n        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64">\n        </line>\n        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78">\n        </line>\n        <line x1="1" y1="12" x2="3" y2="12">\n        </line>\n        <line x1="21" y1="12" x2="23" y2="12">\n        </line>\n        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36">\n        </line>\n        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22">\n        </line>\n    </svg>\n    <svg id="icon-dark" viewBox="0 0 24 24" style="display:none;">\n        <path\n            d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z">\n        </path>\n    </svg>\n</button>\n'}onClick(){const e=getUserThemeSelection();this.toggleTheme(e);const t=getUserThemeSelection();this.dispatchEvent(new CustomEvent("themeToggle",{detail:{originId:this.identifier,oldState:e,newState:t},bubbles:!0,composed:!0,cancelable:!1}))}toggleTheme(e){const t="auto"===e?"light":"light"===e?"dark":"auto";localStorage.setItem(THEME_KEY,t),updateTheme(),this.updateButtonIcon()}updateButtonIcon(){const e=getUserThemeSelection();this.shadowRoot.querySelector("#icon-auto").style.display="auto"===e?"block":"none",this.shadowRoot.querySelector("#icon-light").style.display="light"===e?"block":"none",this.shadowRoot.querySelector("#icon-dark").style.display="dark"===e?"block":"none"}}function updateTheme(){let e=getUserThemeSelection();"auto"===e&&(e=getSystemTheme()),document.documentElement.setAttribute("data-theme",e),updateThemeColor(e)}function updateThemeColor(e){let t=document.getElementById("theme-color-meta")||document.createElement("meta");t.setAttribute("name","theme-color"),t.setAttribute("id","theme-color-meta"),t.setAttribute("content","dark"===e?"#181b21":"#e6ebf4"),document.getElementById("theme-color-meta")||document.head.appendChild(t)}function getUserThemeSelection(){return THEME_VALUES.includes(localStorage.getItem(THEME_KEY))?localStorage.getItem(THEME_KEY):"auto"}function getSystemTheme(){return window.matchMedia&&window.matchMedia(COLOR_SCHEME_DARK).matches?"dark":window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":FALLBACK_THEME}ThemeSwitch.counter=0,updateTheme(),window.customElements.define(ELEMENT_NAME,ThemeSwitch),window.matchMedia&&window.matchMedia(COLOR_SCHEME_DARK).addEventListener("change",updateTheme);
